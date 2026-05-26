// tailwind.config.ts
import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                black: "#000000",
                white: "#f5f5f7",
                gray: {
                    950: "#0a0a0a",
                    900: "#111111",
                    800: "#1c1c1e",
                    700: "#2c2c2e",
                    600: "#3a3a3c",
                    500: "#636366",
                    400: "#8e8e93",
                    300: "#aeaeb2",
                    200: "#c7c7cc",
                    100: "#e5e5ea",
                    50: "#f2f2f7",
                },
                surface: {
                    0: "rgba(255,255,255,0.03)",
                    1: "rgba(255,255,255,0.06)",
                    2: "rgba(255,255,255,0.10)",
                    3: "rgba(255,255,255,0.14)",
                },
            },
            fontFamily: {
                display: ["Inter", "-apple-system", "system-ui", "sans-serif"],
                body: ["Inter", "-apple-system", "system-ui", "sans-serif"],
                mono: ["Fira Code", "SF Mono", "ui-monospace", "monospace"],
            },
            borderRadius: {
                sm: "6px",
                md: "10px",
                lg: "14px",
                xl: "20px",
                pill: "980px",
            },
            backdropBlur: {
                xs: "8px",
                md: "16px",
                xl: "40px",
            },
            letterSpacing: {
                tighter: "-0.04em",
                tight: "-0.025em",
                normal: "-0.01em",
            },
            animation: {
                "fade-up": "fadeUp 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards",
                "blink": "blink 1.2s step-end infinite",
                "pulse-sub": "subtlePulse 2.5s ease-in-out infinite",
            },
        },
    },
    plugins: [typography],
};

export default config;