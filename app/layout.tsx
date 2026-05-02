import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { FloatingHelp } from "@/components/ui/FloatingHelp";
import { Navbar } from "@/components/ui/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VoteGuide AI — Your Election Journey Starts Here",
  description:
    "An interactive, AI-powered election assistant that helps you understand eligibility, registration, timelines, documents, and polling centers in your language.",
  keywords: ["voting", "election", "voter guide", "registration", "polling"],
};

import { TranslationProvider } from "@/components/TranslationProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <div className="bg-mesh" aria-hidden="true" />
        <div className="aura" aria-hidden="true" />
        <div className="clouds opacity-10" aria-hidden="true" />
        <Providers>
          <TranslationProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <FloatingHelp />
          </TranslationProvider>
        </Providers>
      </body>
    </html>
  );
}
