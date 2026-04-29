import { ToolResult, TripContext } from "../types";

export class BudgetTool {
  validate(context: TripContext, costs: { flights: number, hotels: number, cars: number }): ToolResult {
    const total = costs.flights + (costs.hotels * (context.duration || 1)) + (costs.cars * (context.duration || 1));
    const budget = context.budget || 0;

    if (total <= budget) {
      return {
        success: true,
        data: {
          total,
          remaining: budget - total,
          status: "Under Budget"
        }
      };
    } else {
      return {
        success: false,
        error: `Total estimated cost ($${total}) exceeds your budget ($${budget}) by $${total - budget}.`,
        data: { total, deficit: total - budget }
      };
    }
  }
}
