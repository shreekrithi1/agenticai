import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const LIKES_FILE = path.join(process.cwd(), "data", "likes.json");

// Ensure data directory and file exist
if (!fs.existsSync(path.join(process.cwd(), "data"))) {
  fs.mkdirSync(path.join(process.cwd(), "data"));
}
if (!fs.existsSync(LIKES_FILE)) {
  fs.writeFileSync(LIKES_FILE, JSON.stringify({}));
}

export async function GET() {
  const data = fs.readFileSync(LIKES_FILE, "utf-8");
  return NextResponse.json(JSON.parse(data));
}

export async function POST(req: Request) {
  const { cardId } = await req.json();
  const data = JSON.parse(fs.readFileSync(LIKES_FILE, "utf-8"));
  
  data[cardId] = (data[cardId] || 0) + 1;
  
  fs.writeFileSync(LIKES_FILE, JSON.stringify(data, null, 2));
  return NextResponse.json({ success: true, likes: data[cardId] });
}
