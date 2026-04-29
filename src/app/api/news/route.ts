import { NextResponse } from "next/server";
import { getLatestNews } from "@/lib/agents/newsAgent";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const lang = searchParams.get("lang") || "English";
    const cat = searchParams.get("cat") || "Top Stories";
    
    const news = await getLatestNews(lang, cat);
    return NextResponse.json(news);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch news" }, { status: 500 });
  }
}
