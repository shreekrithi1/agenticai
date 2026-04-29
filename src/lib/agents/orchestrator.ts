import { TripContext, AgentResponse } from "./types";
import { CalendarTool } from "./tools/calendar";
import { TravelTool } from "./tools/travel";
import { WeatherTool } from "./tools/weather";
import { BudgetTool } from "./tools/budget";
import { DiscoveryTool } from "./tools/discovery";

export class Orchestrator {
  private calendar = new CalendarTool();
  private travel = new TravelTool();
  private weather = new WeatherTool();
  private budget = new BudgetTool();
  private discovery = new DiscoveryTool();

  async processQuery(query: string): Promise<AgentResponse[]> {
    const steps: AgentResponse[] = [];
    
    // 1. Parse Intent (Mocked)
    const context: TripContext = {
      destination: "Paris",
      startDate: "2026-05-05",
      endDate: "2026-05-08",
      duration: 3,
      budget: 5000,
      preferences: { hotelStars: 4 }
    };

    steps.push({
      status: 'searching',
      message: `I've parsed your request for a ${context.duration}-day trip to ${context.destination} next week. Budget: $${context.budget}.`,
      thought: "Parsing user query to extract destination, dates, and budget constraints."
    });

    // 2. Check Calendar
    const calResult = await this.calendar.checkAvailability(context.startDate!, context.endDate!);
    steps.push({
      status: 'searching',
      message: calResult.data.suggestion,
      thought: "Checking user's calendar for potential conflicts during the requested dates."
    });

    // 3. Search Travel Options
    const flightResult = await this.travel.searchFlights(context.destination!, context.startDate!);
    const hotelResult = await this.travel.searchHotels(context.destination!, context.preferences?.hotelStars || 4);
    
    steps.push({
      status: 'searching',
      message: `Found ${flightResult.data.length} flight options and ${hotelResult.data.length} hotel options matching your criteria.`,
      thought: "Parallelizing flight and hotel searches to optimize planning time."
    });

    // 4. Discovery: Dining & Events
    const diningResult = await this.discovery.searchDining(context.destination!);
    const eventResult = await this.discovery.searchEvents(context.destination!, context.startDate!);
    
    steps.push({
      status: 'searching',
      message: `I've also curated a list of local events and dining options, including a reservation suggestion at ${diningResult.data[0].name}.`,
      thought: "Discovering top-rated local experiences to enrich the itinerary beyond logistics."
    });

    // 5. Check Weather
    const weatherResult = await this.weather.getForecast(context.destination!, context.startDate!);
    steps.push({
      status: 'searching',
      message: `Weather forecast for ${context.destination}: ${weatherResult.data.condition}, ${weatherResult.data.temp}°C. ${weatherResult.data.recommendation}`,
      thought: "Fetching weather data to provide packing and activity recommendations."
    });

    // 6. Budget Validation
    const selectedCosts = {
      flights: flightResult.data[0].price,
      hotels: hotelResult.data[1].pricePerNight, 
      cars: 85
    };
    
    const budgetVal = this.budget.validate(context, selectedCosts);
    
    if (budgetVal.success) {
      steps.push({
        status: 'confirming',
        message: `Great news! I can book this entire trip for approximately $${budgetVal.data.total}, which is well within your $${context.budget} budget.`,
        thought: "Finalizing itinerary and ensuring all costs align with the user's financial parameters.",
        data: {
          itinerary: {
            flight: flightResult.data[0],
            hotel: hotelResult.data[1],
            dining: diningResult.data,
            events: eventResult.data,
            costs: budgetVal.data
          }
        }
      });
    } else {
      steps.push({
        status: 'failed',
        message: budgetVal.error || "Budget validation failed.",
        thought: "Budget exceeded. Need to look for cheaper alternatives or alert the user."
      });
    }

    return steps;
  }
}
