import { NextResponse } from "next/server";
import { getTopPicks, getFortune20, getAllStocks } from "@/lib/agents/stockAgent";
import { getNifty100 } from "@/lib/agents/indiaStockAgent";

// Version: 1.0.4 - India Market Integration
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");

  try {
    let data;
    if (type === "fortune20") {
      data = await getFortune20();
    } else if (type === "india") {
      data = await getNifty100();
    } else if (type === "all") {
      data = await getAllStocks();
    } else {
      data = await getTopPicks();
    }
    
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch stock telemetry" }, { status: 500 });
  }
}
