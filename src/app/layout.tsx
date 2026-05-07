import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BharatAgri | Digital Agronomy",
  description: "Empowering institutions with orchestration intelligence. We bridge the gap between traditional farming and high-technology precision.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-background text-on-background font-body-md overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
