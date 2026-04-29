import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { action } = body;

  console.log(`--- WhatsApp Request: ${action} ---`);

  // In a production environment, this would call Twilio or Meta WhatsApp Business API
  // and update a database record for the user's phone number.
  
  // Simulate network latency
  await new Promise(r => setTimeout(r, 1000));

  if (action === "subscribe") {
    return NextResponse.json({ 
      success: true, 
      message: "Subscribed to daily updates." 
    });
  } else {
    return NextResponse.json({ 
      success: true, 
      message: "Unsubscribed successfully." 
    });
  }
}
