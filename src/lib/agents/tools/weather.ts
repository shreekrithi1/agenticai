import { ToolResult } from "../types";

export class WeatherTool {
  async getForecast(destination: string, date: string): Promise<ToolResult> {
    await new Promise(resolve => setTimeout(resolve, 600));
    return {
      success: true,
      data: {
        temp: 18,
        condition: "Partly Cloudy",
        high: 21,
        low: 12,
        recommendation: "Perfect walking weather. Pack a light jacket for the evenings."
      }
    };
  }
}
