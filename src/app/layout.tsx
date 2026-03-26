import type { Metadata } from "next";
import { Bangers, Kalam } from "next/font/google";
import "./globals.css";

const bangers = Bangers({
  weight: "400",
  variable: "--font-bangers",
  subsets: ["latin"],
});

const kalam = Kalam({
  weight: ["300", "400", "700"],
  variable: "--font-kalam",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vihaan 9.0 | Event Schedule",
  description: "Schedule for Vihaan 9.0 Hackathon",
  icons: [],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${bangers.variable} ${kalam.variable} antialiased min-h-screen flex flex-col`}>
        {children}
      </body>
    </html>
  );
}
