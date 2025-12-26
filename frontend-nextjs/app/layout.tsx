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
  title: "Nguyen Tran Ngoc Han - Software Engineer Portfolio",
  description: "Full-Stack Developer chuyên Backend (Go, Node.js), AI/LLM, và Network Programming. Sinh viên xuất sắc HUTECH với các dự án real-world production-ready.",
  keywords: [
    "software engineer",
    "golang developer", 
    "backend developer",
    "AI developer",
    "HUTECH",
    "Vietnam developer",
    "full-stack developer",
    "nodejs developer"
  ].join(", "),
  authors: [{ name: "Nguyen Tran Ngoc Han", url: "https://github.com/ntnhan19" }],
  openGraph: {
    title: "Nguyen Tran Ngoc Han - Portfolio",
    description: "Khám phá các dự án AI, Network Programming và Full-Stack Development",
    url: "https://portfolio-fullstack-wine-seven.vercel.app",
    siteName: "Ngoc Han Portfolio",
    locale: "vi_VN",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}