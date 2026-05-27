"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Award, Briefcase, Heart, Trophy, ChevronDown } from "lucide-react";
import { useState } from "react";

import { timelineData } from "@/data";
import type { TimelineItem } from "@/data";

interface CareerTimelineProps {
    items?: TimelineItem[];
    ctaLabel?: string;
}

const typeConfig = {
    project: {
        icon: Briefcase,
        colorVar: "--success",
    },
    award: {
        icon: Trophy,
        colorVar: "--warning",
    },
    cert: {
        icon: Award,
        colorVar: "--accent-mid",
    },
    activity: {
        icon: Heart,
        colorVar: "--info",
    },
} as const;

function TimelineCard({ item, ctaLabel }: { item: TimelineItem; ctaLabel?: string }) {
    return (
        <div
            className="rounded-2xl p-5 md:p-6"
            style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                boxShadow: "0 12px 36px rgba(15, 28, 46, 0.06)",
            }}
        >
            <div className="flex items-center justify-between gap-4 flex-wrap mb-3">
                <span
                    style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.72rem",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: "var(--text-muted)",
                    }}
                >
                    {item.date}
                </span>
                <span className="badge">{item.type}</span>
            </div>

            <h3
                style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.05rem",
                    fontWeight: 700,
                    color: "var(--text-primary)",
                    lineHeight: 1.25,
                    marginBottom: "0.35rem",
                }}
            >
                {item.title}
            </h3>

            <p
                style={{
                    fontSize: "0.82rem",
                    fontWeight: 600,
                    color: "var(--accent-mid)",
                    marginBottom: "0.75rem",
                }}
            >
                {item.subtitle}
            </p>

            <p
                style={{
                    color: "var(--text-secondary)",
                    fontSize: "0.9rem",
                    lineHeight: 1.7,
                    marginBottom: item.tags?.length || item.link ? "1rem" : 0,
                }}
            >
                {item.description}
            </p>

            {item.tags && item.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                    {item.tags.map((tag) => (
                        <span key={tag} className="badge">
                            {tag}
                        </span>
                    ))}
                </div>
            )}

            {item.link && ctaLabel && (
                <div className="pt-2" style={{ borderTop: "1px solid var(--border)" }}>
                    {item.link.startsWith("/") ? (
                        <Link
                            href={item.link}
                            className="link-hover inline-flex items-center gap-1 text-sm"
                            style={{ fontWeight: 600 }}
                        >
                            {ctaLabel}
                        </Link>
                    ) : (
                        <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="link-hover inline-flex items-center gap-1 text-sm"
                            style={{ fontWeight: 600 }}
                        >
                            {ctaLabel}
                        </a>
                    )}
                </div>
            )}
        </div>
    );
}

export default function CareerTimeline({
    items = timelineData,
    ctaLabel,
}: CareerTimelineProps) {
    const [showAll, setShowAll] = useState(false);
    const displayItems = showAll ? items : items.slice(-5);
    const hasMore = items.length > 5;
    return (
        <div className="relative">
            <div
                className="absolute top-0 bottom-0 left-6 lg:left-1/2 w-px -translate-x-1/2"
                style={{ background: "var(--border)" }}
            />

            <div className="flex flex-col gap-8 md:gap-10">
                {displayItems.map((item, index) => {
                    const isEven = index % 2 === 0;
                    const config = typeConfig[item.type];
                    const Icon = config.icon;

                    return (
                        <motion.article
                            key={item.id}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{ duration: 0.55, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
                            className="relative lg:grid lg:grid-cols-2 lg:gap-12"
                        >
                            <div
                                className="absolute left-6 lg:left-1/2 top-6 -translate-x-1/2 w-11 h-11 rounded-full flex items-center justify-center z-10"
                                style={{
                                    background: `color-mix(in srgb, var(${config.colorVar}) 12%, transparent)`,
                                    border: `1px solid color-mix(in srgb, var(${config.colorVar}) 24%, transparent)`,
                                    color: `var(${config.colorVar})`,
                                }}
                            >
                                <Icon size={18} />
                            </div>

                            {isEven ? (
                                <>
                                    <div className="pl-16 lg:pl-0 lg:pr-12">
                                        <TimelineCard item={item} ctaLabel={ctaLabel} />
                                    </div>
                                    <div className="hidden lg:block" />
                                </>
                            ) : (
                                <>
                                    <div className="hidden lg:block" />
                                    <div className="pl-16 lg:pl-12">
                                        <TimelineCard item={item} ctaLabel={ctaLabel} />
                                    </div>
                                </>
                            )}
                        </motion.article>
                    );
                })}
            </div>

            {/* Show all / Collapse button */}
            {hasMore && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-10 flex justify-center"
                >
                    <button
                        onClick={() => setShowAll(!showAll)}
                        className="px-6 py-2.5 rounded-lg flex items-center gap-2 font-semibold text-sm transition-all"
                        style={{
                            background: "var(--surface)",
                            border: "1px solid var(--border)",
                            color: "var(--text-primary)",
                        }}
                        onMouseEnter={e => {
                            (e.currentTarget as HTMLElement).style.background = "var(--bg-subtle)";
                        }}
                        onMouseLeave={e => {
                            (e.currentTarget as HTMLElement).style.background = "var(--surface)";
                        }}
                    >
                        {showAll ? "Show less" : `Show all (${items.length})`}
                        <ChevronDown
                            size={16}
                            style={{
                                transform: showAll ? "rotate(180deg)" : "rotate(0deg)",
                                transition: "transform 0.3s ease",
                            }}
                        />
                    </button>
                </motion.div>
            )}
        </div>
    );
}
