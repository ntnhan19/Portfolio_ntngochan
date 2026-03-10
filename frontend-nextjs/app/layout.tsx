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

// === ENHANCED METADATA ===
export const metadata: Metadata = {
  title: {
    default: "Nguyễn Trần Ngọc Hân - Backend Developer Portfolio",
    template: "%s | Ngoc Han Portfolio"
  },
  description: "Backend Developer passionate về Go, Node.js, và AI/ML. Xây dựng scalable systems với PostgreSQL, Redis, và WebSocket. Sinh viên 5 Tốt HUTECH.",
  keywords: [
    // Technical keywords
    "backend developer",
    "golang developer vietnam",
    "nodejs developer",
    "AI developer",
    "RAG pipeline",
    "WebSocket developer",
    "PostgreSQL expert",
    "Redis developer",

    // Location & Status
    "backend intern vietnam",
    "HUTECH computer science",
    "ho chi minh developer",
    "vietnamese developer",

    // Skills
    "microservices",
    "distributed systems",
    "real-time applications",
    "LangChain developer",

    // Projects
    "RAG chatbot",
    "ticket booking system",
    "race condition handling"
  ].join(", "),

  authors: [
    {
      name: "Nguyễn Trần Ngọc Hân",
      url: "https://github.com/ntnhan19"
    }
  ],

  creator: "Nguyễn Trần Ngọc Hân",

  // Open Graph
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "https://ntnhan19.github.io/Portfolio_ntngochan/",
    siteName: "Ngoc Han - Backend Developer Portfolio",
    title: "Nguyễn Trần Ngọc Hân - Backend Developer",
    description: "Passionate Backend Developer specializing in Go, Node.js, and AI/ML. Building scalable systems with real-world impact.",
    images: [
      {
        url: "https://ntnhan19.github.io/Portfolio_ntngochan/og-image.png", // Tạo file này
        width: 1200,
        height: 630,
        alt: "Nguyen Tran Ngoc Han - Backend Developer Portfolio"
      }
    ]
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "Nguyễn Trần Ngọc Hân - Backend Developer",
    description: "Backend Developer | Go, Node.js, AI/ML | HUTECH Student",
    images: ["https://ntnhan19.github.io/Portfolio_ntngochan/og-image.png"]
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    }
  },

  // Verification (add if you have)
  // verification: {
  //   google: "your-google-verification-code",
  // },

  // Additional
  category: "technology",
  alternates: {
    canonical: "https://ntnhan19.github.io/Portfolio_ntngochan/"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="scroll-smooth">
      <head>
        {/* Preconnect to external resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://images.unsplash.com" />

        {/* Favicon (create these) */}
        <link rel="icon" type="image/png" sizes="32x32" href="/Portfolio_ntngochan/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/Portfolio_ntngochan/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/Portfolio_ntngochan/apple-touch-icon.png" />

        {/* Theme color */}
        <meta name="theme-color" content="#020617" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}