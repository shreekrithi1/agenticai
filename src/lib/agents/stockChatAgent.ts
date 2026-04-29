import { ETHICAL_GUIDELINES } from "@/lib/agents/genericAgent";

export async function askStockChat(query: string, stocks: any[], language: string = "English") {
  const OLLAMA_HOST = process.env.OLLAMA_HOST || "http://72.62.97.202:11434";
  const OLLAMA_MODEL = process.env.OLLAMA_MODEL || "gemma3:4b";

  try {
    const prompt = `
      SYSTEM: You are AgriMind Market Intelligence Bot.
      ${ETHICAL_GUIDELINES}
      
      CONTEXT: You have access to the current market data for ${stocks.length} stocks.
      STOCKS_SUMMARY: ${JSON.stringify(stocks.slice(0, 10).map(s => ({ symbol: s.symbol, price: s.price, signal: s.signal, industry: s.industry })))}
      
      TASK: Answer the user's question about these stocks or the market in general.
      
      RULES:
      1. If they ask for a recommendation, provide it based on the SIGNAL field.
      2. If they ask for a buy price, use the ENTRY_PRICE field.
      3. Be professional, concise, and institutional.
      
      USER_QUERY: ${query}
      LANGUAGE: ${language}
    `;

    const response = await fetch(`${OLLAMA_HOST}/api/generate`, {
      method: "POST",
      body: JSON.stringify({
        model: OLLAMA_MODEL,
        prompt,
        stream: false
      })
    });

    const data = await response.json();
    return data.response;
  } catch (error) {
    return "Market Intel Node is currently optimizing. Please retry in a moment.";
  }
}
