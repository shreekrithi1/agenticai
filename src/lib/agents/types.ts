export interface TripContext {
  destination?: string;
  startDate?: string;
  endDate?: string;
  duration?: number;
  budget?: number;
  preferences?: {
    hotelStars?: number;
    flightClass?: string;
    carType?: string;
  };
}

export interface AgentResponse {
  message: string;
  thought?: string;
  data?: any;
  status: 'searching' | 'confirming' | 'booked' | 'failed';
}

export interface ToolResult {
  success: boolean;
  data?: any;
  error?: string;
}
