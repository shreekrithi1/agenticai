import { ToolResult } from "../types";

export class DiscoveryTool {
  async searchDining(destination: string): Promise<ToolResult> {
    await new Promise(resolve => setTimeout(resolve, 900));
    return {
      success: true,
      data: [
        { name: "Le Jules Verne", type: "Fine Dining", rating: 4.8, price: "$$$$", highlight: "Located inside the Eiffel Tower" },
        { name: "L'As du Fallafel", type: "Casual", rating: 4.6, price: "$", highlight: "Best falafel in the Marais" }
      ]
    };
  }

  async searchEvents(destination: string, date: string): Promise<ToolResult> {
    await new Promise(resolve => setTimeout(resolve, 1100));
    return {
      success: true,
      data: [
        { name: "Louvre Late Night", type: "Museum", time: "6:00 PM", highlight: "Avoid the daytime crowds" },
        { name: "Seine River Cruise", type: "Tour", time: "8:30 PM", highlight: "Champagne included at sunset" }
      ]
    };
  }
}
