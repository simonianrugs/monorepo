import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Simonian Rug Cleaners — Command Center",
  description: "Central dashboard for all business tools and data sources",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 antialiased">{children}</body>
    </html>
  );
}
