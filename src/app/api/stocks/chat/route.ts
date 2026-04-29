import { NextResponse } from "next/server";
import { askStockChat } from "@/lib/agents/stockChatAgent";

export async function POST(req: Request) {
  try {
    const { query, stocks, language = "English" } = await req.json();
    const response = await askStockChat(query, stocks, language);
    return NextResponse.json({ response });
  } catch (error) {
    return NextResponse.json({ error: "Failed to process market query" }, { status: 500 });
  }
}
