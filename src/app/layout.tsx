import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TripMind AI | Agentic Travel Orchestrator",
  description: "Plan your perfect trip with autonomous AI agents that handle calendar, bookings, weather, and budget.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="animated-bg" />
        {children}
      </body>
    </html>
  );
}
