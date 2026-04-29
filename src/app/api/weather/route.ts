import { NextResponse } from "next/server";
import { fetchLiveWeather } from "@/lib/agents/weatherAgent";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  if (!lat || !lng) {
    // Default to a central Indian agricultural hub if no coordinates provided
    return NextResponse.json(await fetchLiveWeather("18.5204", "73.8567")); 
  }

  try {
    const weatherData = await fetchLiveWeather(lat, lng);
    return NextResponse.json(weatherData);
  } catch (error) {
    return NextResponse.json({ 
      city: "Agricultural Hub", 
      temp: "28°C", 
      status: "Analyzing...", 
      error: "Live link interrupted" 
    });
  }
}
