import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Aryavrat Studio | Elite Digital Production",
  description: "High-end digital agency specializing in thumbnail design, video editing, and creative research.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} font-sans antialiased bg-background text-foreground shadow-2xl selection:bg-primary/30`}
      >
        {children}
      </body>
    </html>
  );
}
