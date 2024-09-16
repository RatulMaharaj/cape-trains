import type { Metadata } from "next";
import localFont from "next/font/local";
import Header from "@/components/header";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Cape Trains",
  description: "Unofficial Cape Town Metrorail Schedule",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="nord">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-base-100 text-base-content`}
      >
        <Header />
        <main className="w-full flex flex-col h-screen md:max-w-md mx-auto items-center">
          {children}
        </main>
      </body>
    </html>
  );
}
