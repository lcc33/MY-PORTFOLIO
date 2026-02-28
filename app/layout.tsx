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
  title: {
    default: "Muhammad Is'haq | Frontend Developer & UI Architect",
    template: "%s | Muhammad Is'haq",
  },
  description: 
    "Frontend Developer specializing in high-performance React/Next.js interfaces. Leading tech at Very Unreal and building AI-powered platforms like ZenoAI.",
  keywords: [
    "Frontend Developer",
    "React Developer",
    "Next.js Specialist",
    "UI/UX Design",
    "TypeScript",
    "JavaScript Portfolio",
    "Muhammad Is'haq",
    "Very Unreal Tech Director",
  ],
  authors: [{ name: "Muhammad Is'haq" }],
  creator: "Muhammad Is'haq",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://muhammade.vercel.app", // Update this with your actual URL
    title: "Muhammad Is'haq | Frontend Developer",
    description: "Building the next generation of high-performance web interfaces.",
    siteName: "Muhammad Is'haq Portfolio",
    images: [
      {
        url: "/og-image.jpg", // Create a screenshot of your hero section and name it this
        width: 1200,
        height: 630,
        alt: "Muhammad Is'haq Portfolio Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Is'haq | Frontend Developer",
    description: "Frontend Developer & UI Architect. Building ZenoAI and TraceVault.",
    creator: "@aizenwritescode",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico", // Ensure you have a favicon in your /public folder
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
      >
        {children}
      </body>
    </html>
  );
}