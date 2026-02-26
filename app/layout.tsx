import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
// import { ReactLenis } from "lenis/react"; // We'll assume lenis/react is available or use a custom wrapper if needed.
// Since lenis might not have types or direct export in plain 'lenis', we'll use a client component wrapper.
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import CustomCursor from "@/components/ui/CustomCursor";
import PillNavbar from "@/components/ui/PillNavbar";
import DepthFieldNetwork from "@/components/3d/DepthFieldNetwork";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Vedant Joshi | Portfolio",
  description: "Full Stack Developer & AI/ML Enthusiast",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased text-foreground`}>
        <DepthFieldNetwork />
        <SmoothScrollProvider>
          <CustomCursor />
          <PillNavbar />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
