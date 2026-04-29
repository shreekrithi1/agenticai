import { Skill, Tool } from "openclaw/plugin-sdk";
import { z } from "zod";

export const TravelSkill: Skill = {
  name: "travel_orchestrator",
  description: "Advanced travel planning and orchestration skill.",
  tools: [
    {
      name: "search_travel",
      description: "Search for real-time flights, hotels, and local events.",
      parameters: z.object({
        destination: z.string(),
        query: z.string(),
      }),
      execute: async ({ destination, query }) => {
        // Here we would call the You.com API or similar
        // For the OpenClaw version, we'll use a fetch to our search provider
        const response = await fetch(`https://api.ydc-index.io/search?query=${encodeURIComponent(query + " in " + destination)}`, {
          headers: { "X-API-Key": process.env.YOU_API_KEY || "" }
        });
        const data = await response.json();
        return data.hits || [];
      }
    }
  ]
};
