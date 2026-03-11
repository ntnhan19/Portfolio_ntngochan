import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Nguyen Tran Ngoc Han — Full-Stack Developer",
    template: "%s | Ngoc Han Portfolio"
  },
  description: "Full-Stack Developer specializing in PERN Stack (PostgreSQL, Express.js, React.js, Node.js). Building real-world web apps with real-time features and AI integrations.",
  keywords: [
    "full-stack developer", "PERN stack", "React", "Node.js",
    "PostgreSQL", "Next.js", "TypeScript", "intern",
    "Ho Chi Minh City", "HUTECH", "portfolio"
  ].join(", "),
  authors: [{ name: "Nguyen Tran Ngoc Han", url: "https://github.com/ntnhan19" }],
  creator: "Nguyen Tran Ngoc Han",
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "https://ntnhan19.github.io/Portfolio_ntngochan/",
    siteName: "Ngoc Han — Full-Stack Developer",
    title: "Nguyen Tran Ngoc Han — Full-Stack Developer",
    description: "PERN Stack developer building scalable web apps and AI-powered tools.",
    images: [{
      url: "https://ntnhan19.github.io/Portfolio_ntngochan/og-image.png",
      width: 1200, height: 630,
      alt: "Nguyen Tran Ngoc Han Portfolio"
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Nguyen Tran Ngoc Han — Full-Stack Developer",
    description: "PERN Stack | React | Node.js | AI/ML",
  },
  robots: { index: true, follow: true },
  category: "technology",
  alternates: { canonical: "https://ntnhan19.github.io/Portfolio_ntngochan/" }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Fonts are loaded via @import in globals.css */}
        <meta name="theme-color" content="#0a0a0f" />
        <link rel="icon" type="image/png" sizes="32x32" href="/Portfolio_ntngochan/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/Portfolio_ntngochan/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/Portfolio_ntngochan/apple-touch-icon.png" />
      </head>
      <body style={{ fontFamily: "'DM Sans', sans-serif" }}>
        {children}
      </body>
    </html>
  );
}