import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider"

import type React from "react"
import { Inter } from "next/font/google"
const inter = Inter({ subsets: ["latin"] })


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "isAlive - Blockchain-powered Uptime Monitoring",
  description: "Monitor your critical infrastructure with blockchain-verified uptime tracking.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      
      <ClerkProvider>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
         <ThemeProvider
            attribute="class"
            defaultTheme="darl"
            forcedTheme="dark"
          >
        <Navbar />
        <br />
        <br />
        {children}
        </ThemeProvider>
      </body>
      </ClerkProvider>
    </html>
  );
}
