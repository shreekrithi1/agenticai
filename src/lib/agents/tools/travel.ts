import { ToolResult, TripContext } from "../types";

export class TravelTool {
  async searchFlights(destination: string, date: string): Promise<ToolResult> {
    await new Promise(resolve => setTimeout(resolve, 1500));
    return {
      success: true,
      data: [
        { id: "FL-101", carrier: "Air France", price: 850, departure: "10:00 AM", duration: "7h 30m" },
        { id: "FL-202", carrier: "Delta", price: 1200, departure: "2:00 PM", duration: "7h 15m" }
      ]
    };
  }

  async searchHotels(destination: string, stars: number): Promise<ToolResult> {
    await new Promise(resolve => setTimeout(resolve, 1200));
    return {
      success: true,
      data: [
        { id: "HT-301", name: "Hotel Plaza Athénée", pricePerNight: 950, rating: 5, address: "25 Avenue Montaigne" },
        { id: "HT-402", name: "Pullman Paris Tour Eiffel", pricePerNight: 450, rating: 4, address: "18 Avenue de Suffren" }
      ]
    };
  }

  async searchCars(destination: string): Promise<ToolResult> {
    await new Promise(resolve => setTimeout(resolve, 800));
    return {
      success: true,
      data: [
        { id: "CR-501", type: "Electric Sedan", pricePerDay: 85, provider: "Hertz" },
        { id: "CR-602", type: "Luxury SUV", pricePerDay: 150, provider: "Sixt" }
      ]
    };
  }
}
