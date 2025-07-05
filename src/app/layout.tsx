import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Whispley - AI-Driven Communication Platform",
  description:
    "Whispley is an AI-driven communication platform that automates email, SMS, and WhatsApp campaigns—so you can engage customers faster, smarter, and at scale.",
  keywords: [
    "email",
    "sms",
    "whatsapp",
    "automation",
    "ai",
    "communication",
    "marketing",
  ],
  authors: [{ name: "Philip Nwabuwa" }],
  openGraph: {
    title: "Whispley - AI-Driven Communication Platform",
    description: "Automate your email, SMS, and WhatsApp campaigns with AI",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
