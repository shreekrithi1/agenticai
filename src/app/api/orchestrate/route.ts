import { NextResponse } from "next/server";

// Regional Soil Database (India)
const SOIL_DATABASE: Record<string, any> = {
  "maharashtra": { type: "Black Soil", nutrients: "Rich in Iron, Magnesium, Lime", suitable: ["Cotton", "Sugarcane", "Soybean"] },
  "punjab": { type: "Alluvial Soil", nutrients: "Rich in Potash, Humus", suitable: ["Wheat", "Rice", "Barley"] },
  "karnataka": { type: "Red Soil", nutrients: "Rich in Iron, Poor in Nitrogen", suitable: ["Ragi", "Tobacco", "Groundnut"] },
  "rajasthan": { type: "Arid/Sandy Soil", nutrients: "High Salt, Low Humus", suitable: ["Bajra", "Pulses", "Guar"] },
  "kerala": { type: "Laterite Soil", nutrients: "Acidic, Poor in Organic matter", suitable: ["Rubber", "Coffee", "Tea", "Cashew"] },
  "default": { type: "Mixed Alluvial", nutrients: "Balanced", suitable: ["Vegetables", "Mustard"] }
};

export async function POST(req: Request) {
  try {
    const { query, type, location, language = "English" } = await req.json(); 

    const OLLAMA_HOST = process.env.OLLAMA_HOST || "http://72.62.97.202:11434";
    const OLLAMA_MODEL = process.env.OLLAMA_MODEL || "gemma3:4b";

    if (type === "cultivation") {
      console.log(`--- Generating Cultivation Plan for ${query} in ${language} ---`);
      const planResponse = await fetch(`${OLLAMA_HOST}/api/generate`, {
        method: "POST",
        body: JSON.stringify({
          model: OLLAMA_MODEL,
          prompt: `
            You are AgriMind AI. Generate a 4-phase cultivation roadmap for ${query} in ${location}.
            Phases: 1. Sowing, 2. Growth, 3. Protection, 4. Harvest.
            
            LANGUAGE: ${language.toUpperCase()}
            
            CRITICAL INSTRUCTIONS:
            1. ALL JSON KEYS MUST BE IN ENGLISH.
            2. ALL TEXT VALUES MUST BE IN ${language.toUpperCase()}.
            3. RESPONSE MUST BE VALID JSON.
            
            RESPONSE FORMAT:
            {
              "plan": {
                "phases": [
                  { "name": "...", "task": "..." },
                  { "name": "...", "task": "..." },
                  { "name": "...", "task": "..." },
                  { "name": "...", "task": "..." }
                ]
              }
            }
          `,
          stream: false,
          format: "json"
        })
      });
      const planData = await planResponse.json();
      console.log("Raw Plan Response:", planData.response);
      
      // Robust JSON Cleansing
      let cleanJson = planData.response.trim();
      if (cleanJson.includes("```")) {
        cleanJson = cleanJson.replace(/```json|```/g, "").trim();
      }
      
      return NextResponse.json(JSON.parse(cleanJson));
    }

    // 1. Extract Location (Heuristic)
    let searchLocation = query;
    const locationMatch = query.match(/(?:in|for|at|near|around)\s+([a-zA-Z\s,]+)/i);
    if (locationMatch) {
      searchLocation = locationMatch[1].trim();
    }

    let groundingData = "";
    // FORCE SOVEREIGN MODE: Disabling external search to resolve 401 issue
    const isKeyValid = false;
    
    if (isKeyValid) {
      try {
        const searchResponse = await fetch(`https://api.ydc-index.io/search?query=current+weather+and+soil+type+in+${encodeURIComponent(searchLocation)}+India`, {
          headers: { "X-API-Key": process.env.YOU_API_KEY || "" }
        });
        
        if (searchResponse.status === 401 || searchResponse.status === 403) {
          console.warn("AgriMind WARNING: Invalid Search API Key. Switching to Sovereign Mode.");
          groundingData = "FALLBACK: Use regional soil database logic.";
        } else if (searchResponse.ok) {
          const data = await searchResponse.json();
          groundingData = data.hits?.map((h: any) => h.snippets?.join(" ")).join("\n") || "";
        }
      } catch (e) {
        console.error("Grounding failed:", e);
      }
    } else {
      console.log("AgriMind: Running in Sovereign Mode (No Search API Key).");
      groundingData = "SOVEREIGN_MODE: Rely on regional soil database and seasonal patterns.";
    }

    // 2. Identify Region for Soil Lookup (Heuristic)
    const normalizedQuery = searchLocation.toLowerCase();
    let regionalSoil = SOIL_DATABASE.default;
    for (const region in SOIL_DATABASE) {
      if (normalizedQuery.includes(region)) {
        regionalSoil = SOIL_DATABASE[region];
        break;
      }
    }

    // 3. Inference: Agri-Intelligence with Gemma 3
    console.log(`--- Requesting Prediction for ${searchLocation} [Original: ${query}] in ${language} ---`);
    
    const ollamaResponse = await fetch(`${OLLAMA_HOST}/api/generate`, {
      method: "POST",
      body: JSON.stringify({
        model: OLLAMA_MODEL,
        prompt: `
          You are AgriMind AI.
          
          TASK: Analyze location and predict best crop.
          LOCATION: ${searchLocation}
          SOIL: ${JSON.stringify(regionalSoil)}
          WEATHER: ${groundingData}
          
          REQUIRED OUTPUT: A JSON object in ${language}.
          
          JSON STRUCTURE:
          {
            "steps": [{ "status": "analyzing", "message": "...", "thought": "..." }],
            "prediction": {
              "bestCrop": "Crop Name",
              "probability": "Score",
              "reasoning": "Detailed justification",
              "soil": { "type": "Soil Type", "pH": "Value", "nutrients": "Profile" },
              "weather": { "status": "Status", "temp": "Temp" },
              "irrigation": "Advice"
            }
          }
          
          RESPONSE:
        `,
        stream: false
      })
    });

    if (!ollamaResponse.ok) throw new Error("Ollama connection failed.");
    const data = await ollamaResponse.json();
    console.log("Raw Ollama Output:", data.response);
    
    // Robust JSON Extraction
    let cleanPred = data.response.trim();
    const jsonMatch = cleanPred.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      cleanPred = jsonMatch[0];
    }
    
    // Fallback if empty
    if (cleanPred === "{}" || !cleanPred) {
       return NextResponse.json({ 
         error: "AI Engine returned empty result. Please try again with a specific location." 
       });
    }

    const result = JSON.parse(cleanPred);
    return NextResponse.json(result);

  } catch (error: any) {
    console.error("AgriMind Error:", error);
    return NextResponse.json({ error: "Intelligence Engine Offline. Check Hostinger VPS status." }, { status: 500 });
  }
}
