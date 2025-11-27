import type { Metadata } from "next";
import "./globals.css";
import { QueryProvider } from "../providers/query-provider";

export const metadata: Metadata = {
  title: "MTG Card Inspector",
  description:
    "Search and inspect Magic: The Gathering cards using Scryfall API",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
