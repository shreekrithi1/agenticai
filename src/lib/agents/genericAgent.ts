/**
 * AGENT: Generic Intelligence Node
 * ROLE: Handles general-purpose queries with a focus on responsible AI practices.
 */

export const ETHICAL_GUIDELINES = `
RESPONSIBLE AI & ETHICAL GUIDELINES:
1. TRANSPARENCY: Always identify yourself as an AI assistant.
2. SAFETY: Never provide instructions for illegal acts, violence, or self-harm.
3. BIAS MITIGATION: Maintain a neutral, objective tone. Avoid cultural, social, or political bias.
4. PRIVACY: Do not ask for, process, or store Personally Identifiable Information (PII).
5. FACTUAL INTEGRITY: If unsure, state that the information is an estimate. Encourage verification for critical decisions.
6. HARM REDUCTION: In agricultural contexts, prioritize environmental sustainability and local safety.
`;

export async function askGenericAgent(query: string, language: string = "English") {
  const OLLAMA_HOST = process.env.OLLAMA_HOST || "http://72.62.97.202:11434";
  const OLLAMA_MODEL = process.env.OLLAMA_MODEL || "gemma3:4b";

  try {
    const response = await fetch(`${OLLAMA_HOST}/api/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: OLLAMA_MODEL,
        prompt: `
          SYSTEM: You are a Generic Intelligence Agent within the AgriMind ecosystem.
          
          ${ETHICAL_GUIDELINES}
          
          USER QUERY: ${query}
          LANGUAGE: ${language}
          
          TASK: Provide a helpful, concise, and ethically grounded response. 
          If the query is outside of your knowledge or potentially harmful, politely decline or provide a safe alternative.
          
          RESPONSE:
        `,
        stream: false
      })
    });

    if (!response.ok) throw new Error("Intelligence Node Unreachable");
    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error("Generic Agent Error:", error);
    return "I apologize, but my internal reasoning node is currently undergoing maintenance. Please try again shortly.";
  }
}
