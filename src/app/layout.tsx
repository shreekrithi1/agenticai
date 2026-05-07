import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BharatAgri | Digital Agronomy",
  description: "Orchestrate your agricultural assets with autonomous AI intelligence. The future of farming, simplified.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-black text-white">
        {children}
      </body>
    </html>
  );
}
