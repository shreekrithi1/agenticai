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
    const { query, type, location } = await req.json(); 

    const OLLAMA_HOST = process.env.OLLAMA_HOST || "http://72.62.97.202:11434";
    const OLLAMA_MODEL = process.env.OLLAMA_MODEL || "gemma3:4b";

    if (type === "cultivation") {
      const planResponse = await fetch(`${OLLAMA_HOST}/api/generate`, {
        method: "POST",
        body: JSON.stringify({
          model: OLLAMA_MODEL,
          prompt: `
            You are AgriMind AI. Generate a 4-phase cultivation roadmap for ${query} in ${location}.
            Phases should include: 1. Sowing, 2. Growth/Nutrients, 3. Pest Management, 4. Harvest.
            
            RESPONSE FORMAT: JSON ONLY.
            {
              "plan": {
                "phases": [
                  { "name": "Sowing", "task": "..." },
                  { "name": "Growth", "task": "..." },
                  { "name": "Protection", "task": "..." },
                  { "name": "Harvest", "task": "..." }
                ]
              }
            }
          `,
          stream: false,
          format: "json"
        })
      });
      const planData = await planResponse.json();
      
      // Robust JSON Cleansing
      let cleanJson = planData.response.trim();
      if (cleanJson.includes("```")) {
        cleanJson = cleanJson.replace(/```json|```/g, "").trim();
      }
      
      return NextResponse.json(JSON.parse(cleanJson));
    }

    // Default Prediction Logic...
    let groundingData = "";
    try {
      const searchResponse = await fetch(`https://api.ydc-index.io/search?query=current+weather+and+soil+type+in+${encodeURIComponent(query)}+India`, {
        headers: { "X-API-Key": process.env.YOU_API_KEY || "" }
      });
      if (searchResponse.ok) {
        const data = await searchResponse.json();
        groundingData = data.hits?.map((h: any) => h.snippets?.join(" ")).join("\n") || "";
      }
    } catch (e) {
      console.error("Grounding failed:", e);
    }

    // 2. Identify Region for Soil Lookup (Heuristic)
    const normalizedQuery = query.toLowerCase();
    let regionalSoil = SOIL_DATABASE.default;
    for (const region in SOIL_DATABASE) {
      if (normalizedQuery.includes(region)) {
        regionalSoil = SOIL_DATABASE[region];
        break;
      }
    }

    // 3. Inference: Agri-Intelligence with Gemma 3
    const ollamaResponse = await fetch(`${OLLAMA_HOST}/api/generate`, {
      method: "POST",
      body: JSON.stringify({
        model: OLLAMA_MODEL,
        prompt: `
          You are AgriMind AI, a precision agriculture expert for India.
          
          TASK: Predict the BEST CROP for the location provided.
          LOCATION: ${query}
          REGIONAL SOIL DATA: ${JSON.stringify(regionalSoil)}
          REAL-TIME WEATHER GROUNDING: ${groundingData}
          
          ANALYSIS REQUIREMENTS:
          - Compare current weather (Temp, Humidity, Rainfall) with soil N-P-K needs.
          - Predict the top crop and provide a "Success Probability".
          - Provide soil health metrics (Estimated pH, Nutrients).
          - Suggest irrigation strategy.
          
          RESPONSE FORMAT: JSON ONLY.
          {
            "steps": [
              { "status": "analyzing", "message": "Cross-referencing soil pH with moisture levels...", "thought": "Analyzing the synergy between the current monsoon status and regional black soil." }
            ],
            "prediction": {
              "bestCrop": "Cotton",
              "probability": "88%",
              "reasoning": "High humidity and rich black soil profile in ${query} are ideal for this sowing season.",
              "soil": {
                "type": "${regionalSoil.type}",
                "pH": "6.8",
                "nutrients": "${regionalSoil.nutrients}"
              },
              "weather": {
                "status": "Monsoon/Humid",
                "temp": "28°C"
              },
              "irrigation": "Low - Natural rainfall sufficient for the next 15 days."
            }
          }
        `,
        stream: false,
        format: "json"
      })
    });

    if (!ollamaResponse.ok) throw new Error("Ollama connection failed.");
    const data = await ollamaResponse.json();
    
    // Robust JSON Cleansing
    let cleanPred = data.response.trim();
    if (cleanPred.includes("```")) {
      cleanPred = cleanPred.replace(/```json|```/g, "").trim();
    }
    
    const result = JSON.parse(cleanPred);
    return NextResponse.json(result);

  } catch (error: any) {
    console.error("AgriMind Error:", error);
    return NextResponse.json({ error: "Intelligence Engine Offline. Check Hostinger VPS status." }, { status: 500 });
  }
}
