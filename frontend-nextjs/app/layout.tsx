// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { LocaleProvider } from '@/src/context/LocaleContext';

const basePath =
  process.env.NODE_ENV === "production" ? "/Portfolio_ntngochan" : "";

export const metadata: Metadata = {
  title: {
    default: "Nguyễn Trần Ngọc Hân — Fullstack Developer",
    template: "%s | Ngọc Hân",
  },
  description:
    "Fullstack Developer (intern) — PERN Stack, Next.js, FastAPI. Building real-world web apps with real-time features and AI integrations. HUTECH Software Engineering, Year 4.",
  keywords: [
    "fullstack developer",
    "backend developer",
    "intern",
    "PERN stack",
    "React",
    "Node.js",
    "PostgreSQL",
    "Next.js",
    "TypeScript",
    "FastAPI",
    "Python",
    "Ho Chi Minh City",
    "HUTECH",
    "Ngọc Hân",
    "portfolio",
  ].join(", "),
  authors: [
    { name: "Nguyễn Trần Ngọc Hân", url: "https://github.com/ntnhan19" },
  ],
  creator: "Nguyễn Trần Ngọc Hân",
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "https://ntnhan19.github.io/Portfolio_ntngochan/",
    siteName: "Ngọc Hân — Fullstack Developer",
    title: "Nguyễn Trần Ngọc Hân — Fullstack Developer",
    description:
      "PERN Stack · Next.js · FastAPI · RAG — building scalable web apps and AI-powered tools.",
    images: [
      {
        url: "https://ntnhan19.github.io/Portfolio_ntngochan/og-image.png",
        width: 1200,
        height: 630,
        alt: "Nguyễn Trần Ngọc Hân — Fullstack Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nguyễn Trần Ngọc Hân — Fullstack Developer",
    description: "PERN Stack · Next.js · FastAPI · AI/RAG",
  },
  robots: { index: true, follow: true },
  category: "technology",
  alternates: {
    canonical: "https://ntnhan19.github.io/Portfolio_ntngochan/",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        {/* Theme init — runs before first paint to prevent FOUC */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('portfolio-theme');if(!t){t=window.matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light';}document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`
          }}
        />
        {/* Theme color — black cho iOS Safari status bar */}
        <meta name="theme-color" content="#000000" />

        {/* Apple / PWA */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />

        {/* Favicon */}
        <link rel="icon" href={`${basePath}/favicon.ico`} sizes="any" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={`${basePath}/favicon-32x32.png`}
        />
        <link
          rel="apple-touch-icon"
          href={`${basePath}/apple-touch-icon.png`}
        />

        {/* Fonts — preconnect trước để giảm LCP */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* Structured data (JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Nguyễn Trần Ngọc Hân",
              alternateName: "Ngọc Hân",
              url: "https://ntnhan19.github.io/Portfolio_ntngochan/",
              sameAs: [
                "https://github.com/ntnhan19",
              ],
              jobTitle: "Fullstack Developer",
              description:
                "Fullstack Developer intern — PERN Stack, Next.js, FastAPI. HUTECH Software Engineering Year 4, GPA 3.30/4.0.",
              alumniOf: {
                "@type": "CollegeOrUniversity",
                name: "HUTECH University",
                address: {
                  "@type": "PostalAddress",
                  addressLocality: "Ho Chi Minh City",
                  addressCountry: "VN",
                },
              },
              address: {
                "@type": "PostalAddress",
                addressLocality: "Bình Thạnh, Hồ Chí Minh",
                addressCountry: "VN",
              },
              knowsAbout: [
                "PostgreSQL",
                "Express.js",
                "React",
                "Node.js",
                "Next.js",
                "TypeScript",
                "FastAPI",
                "Python",
                "Redis",
                "Docker",
              ],
            }),
          }}
        />
      </head>

      <body className="antialiased">
        {/* Ambient background orbs — fixed, pointer-events none */}
        <div
          aria-hidden="true"
          className="fixed inset-0 overflow-hidden pointer-events-none -z-10"
        >
          {/* Top-right orb — navy tint */}
          <div
            style={{
              position: "absolute",
              top: "-15vh",
              right: "-10vw",
              width: "55vw",
              height: "55vw",
              maxWidth: "700px",
              maxHeight: "700px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(37,99,168,0.07) 0%, transparent 70%)",
              filter: "blur(80px)",
            }}
          />
          {/* Bottom-left orb — lighter navy */}
          <div
            style={{
              position: "absolute",
              bottom: "-8vh",
              left: "-8vw",
              width: "45vw",
              height: "45vw",
              maxWidth: "560px",
              maxHeight: "560px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(26,58,92,0.05) 0%, transparent 70%)",
              filter: "blur(80px)",
            }}
          />
          {/* Center wash */}
          <div
            style={{
              position: "absolute",
              top: "40%",
              left: "30%",
              width: "40vw",
              height: "40vw",
              maxWidth: "480px",
              maxHeight: "480px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(219,234,254,0.4) 0%, transparent 70%)",
              filter: "blur(100px)",
            }}
          />
        </div>

        <LocaleProvider>
          {children}
        </LocaleProvider>
      </body>
    </html>
  );
}