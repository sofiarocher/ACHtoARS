import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Limelight } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const limelight = Limelight({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-limelight',
});

export const metadata: Metadata = {
  title: "ACH to ARS | Calculadora",
  description: "Decidir la mejor manera de transferir tus dólares a pesos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${limelight.variable} antialiased`}
      >
        <Analytics />
        {children}
      </body>
    </html>
  );
}
