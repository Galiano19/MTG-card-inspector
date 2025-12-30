import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import "mana-font/css/mana.css";
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
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <QueryProvider>{children}</QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
