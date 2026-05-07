import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Project α | Agentic Compute",
  description: "The Next Era of Agentic Compute. Orchestrate autonomous AI nodes with unprecedented scale and security.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#050505]">
        {children}
      </body>
    </html>
  );
}
