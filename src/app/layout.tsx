import type { Metadata } from "next";
import { Inter, Space_Grotesk, Caveat } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nadipi Mohith Sai | AI Engineer & Embedded Systems Specialist",
  description: "Immersive Black Dune portfolio ecosystem of Nadipi Mohith Sai, specializing in Artificial Intelligence, Embedded Systems, Cloud Infrastructure, and Scalable Full-Stack Platforms.",
  keywords: ["Nadipi Mohith Sai", "Mohith Sai", "AI Engineer", "Embedded Systems", "Full Stack Developer", "SRMIST", "Aperture GPUaaS", "TrailGuard"],
  authors: [{ name: "Nadipi Mohith Sai" }],
  openGraph: {
    title: "Nadipi Mohith Sai | AI Engineer & Embedded Systems Specialist",
    description: "Immersive Black Dune portfolio ecosystem of Nadipi Mohith Sai.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nadipi Mohith Sai | AI Engineer Portfolio",
    description: "Intelligent systems combining AI, embedded hardware, and cloud-native infrastructure.",
  },
  icons: {
    icon: "/favicon.ico",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${caveat.variable} h-full antialiased`}
      style={{ colorScheme: "dark" }}
      suppressHydrationWarning
    >
      <body className="font-sans text-white selection:bg-[#B7FF2A] selection:text-black min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
