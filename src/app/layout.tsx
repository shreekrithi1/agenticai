import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Project α | Agentic Settlement Rails",
  description: "Synchronizing global agricultural nodes with millisecond precision and autonomous settlement.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#0c0c28]">
        {children}
      </body>
    </html>
  );
}
