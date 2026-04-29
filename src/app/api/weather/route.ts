import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  if (!lat || !lng) {
    return NextResponse.json({ error: "Missing coordinates" }, { status: 400 });
  }

  try {
    let weatherData = {
      city: "Kharadi, Pune",
      temp: "31°C",
      status: "Clear Skies"
    };

    return NextResponse.json(weatherData);
  } catch (error) {
    return NextResponse.json({ city: "Pune", temp: "30°C", status: "Clear" });
  }
}
