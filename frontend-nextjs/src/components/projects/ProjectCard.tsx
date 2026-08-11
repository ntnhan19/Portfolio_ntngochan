// src/components/projects/ProjectCard.tsx
"use client";

import Link from "next/link";
import { Github, ExternalLink, ArrowRight, Users } from "lucide-react";
import { motion } from "framer-motion";
import type { Project } from "@/src/data/staticData";
import { useLocale } from "@/src/context/LocaleContext";
import { useRecruiterMode } from "@/src/context/RecruiterModeContext";

interface ProjectCardProps {
    project: Project;
    index?: number;
    variant?: "featured" | "default";
}

export function ProjectCard({
    project,
    index = 0,
    variant = "default",
}: ProjectCardProps) {
    const { t } = useLocale();
    const { isRecruiterMode } = useRecruiterMode();
    const isFeatured = variant === "featured";
    const MAX_TAGS = isFeatured ? 5 : 4;

    return (
        <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className={`card group flex flex-col md:flex-row gap-0 items-center overflow-hidden ${isFeatured ? 'md:col-span-2' : 'col-span-1'}`}
        >
            {/* Thumbnail */}
            <Link
                href={`/projects/${project.slug}`}
                tabIndex={-1}
                aria-hidden="true"
                className="w-full md:w-[55%] shrink-0 relative overflow-hidden"
                style={{
                    display: "block",
                    borderRight: "1px solid var(--border)",
                }}
            >
                <div className="w-full h-full bg-slate-50 dark:bg-slate-900 flex flex-col">
                    {/* Browser Top Bar */}
                    <div className="bg-slate-100 dark:bg-slate-800 px-4 py-3 flex items-center gap-2 border-b border-slate-200 dark:border-slate-700">
                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                        <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                        <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    </div>
                    {/* The actual image */}
                    <div className="relative w-full aspect-[4/3] md:aspect-video overflow-hidden bg-white dark:bg-black">
                        <img
                            src={project.image_url}
                            alt={project.title}
                            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", opacity: 0.9 }}
                            className="transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                            onError={e => { e.currentTarget.style.display = "none"; }}
                        />
                    </div>
                </div>
                {/* Year badge */}
                <div style={{
                    position: "absolute", top: "1rem", right: "1rem",
                    background: "var(--bg-overlay)", backdropFilter: "blur(8px)",
                    border: "1px solid var(--border)", borderRadius: "var(--radius-pill)",
                    padding: "4px 12px", fontFamily: "var(--font-mono)",
                    fontSize: "0.7rem", color: "var(--text-primary)", fontWeight: 600, letterSpacing: "0.06em",
                }}>
                    {project.year}
                </div>
            </Link>

            {/* Body */}
            <div className="w-full md:w-[45%] flex flex-col justify-center p-6 md:p-8 lg:pr-10" style={{ gap: "1rem" }}>
                {/* Meta: category · team · role */}
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
                    {[
                        t(`projectData.${project.slug}.category`),
                        <><Users size={12} /> {t('projectDetail.membersCount', { n: String(project.team_size) })}</>,
                        t(`projectData.${project.slug}.role`),
                    ].map((item, i) => (
                        <span key={i} style={{ display: "flex", alignItems: "center", gap: "4px", fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--text-muted)", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                            {i > 0 && <span style={{ opacity: 0.3, marginRight: "0.5rem" }}>•</span>}
                            {item}
                        </span>
                    ))}
                </div>

                {/* Title + tagline */}
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <Link href={`/projects/${project.slug}`} style={{ textDecoration: "none" }}>
                        <h3 style={{
                            fontFamily: "var(--font-display)", fontWeight: 700,
                            fontSize: isFeatured ? "1.5rem" : "1.2rem",
                            color: "var(--text-primary)", letterSpacing: "-0.01em",
                            lineHeight: 1.2, transition: "color 0.15s",
                        }}
                            onMouseEnter={e => (e.currentTarget.style.color = "var(--accent-mid)")}
                            onMouseLeave={e => (e.currentTarget.style.color = "var(--text-primary)")}
                        >
                            {project.title}
                        </h3>
                    </Link>
                    <p style={{
                        fontSize: isFeatured ? "0.9rem" : "0.85rem",
                        color: "var(--text-secondary)", lineHeight: 1.5,
                    }}>
                        {t(`projectData.${project.slug}.tagline`)}
                    </p>
                </div>

                {isFeatured && !isRecruiterMode && (
                    <p style={{
                        fontSize: "0.9rem",
                        color: "var(--text-secondary)", lineHeight: 1.6,
                        display: "-webkit-box", WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical", overflow: "hidden",
                    }}>
                        {t(`projectData.${project.slug}.description`)}
                    </p>
                )}

                {/* Tech badges (Soft Editorial Pills) */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: isFeatured ? "0.5rem" : "auto" }}>
                    {project.tech_stack.slice(0, MAX_TAGS).map(tech => (
                        <span key={tech} className="px-3 py-1 rounded-full text-[0.8rem] bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300">
                            {tech}
                        </span>
                    ))}
                    {project.tech_stack.length > MAX_TAGS && (
                        <span className="px-3 py-1 rounded-full text-[0.8rem] bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300">
                            +{project.tech_stack.length - MAX_TAGS}
                        </span>
                    )}
                </div>

                {/* Footer links */}
                <div style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    marginTop: isFeatured ? "1rem" : "1rem", paddingTop: "1rem",
                    borderTop: "1px solid var(--border)",
                }}>
                    <div style={{ display: "flex", gap: "1rem" }}>
                        {project.repo_url && (
                            <a href={project.repo_url} target="_blank" rel="noopener noreferrer"
                                className="link-hover"
                                style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "0.85rem", fontWeight: 500, color: "var(--text-primary)" }}>
                                <Github size={15} /> GitHub
                            </a>
                        )}
                        {project.demo_url && (
                            <a href={project.demo_url} target="_blank" rel="noopener noreferrer"
                                className="link-hover"
                                style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "0.85rem", fontWeight: 500, color: "var(--text-primary)" }}>
                                <ExternalLink size={15} /> Demo
                            </a>
                        )}
                    </div>
                    <Link href={`/projects/${project.slug}`}
                        className="link-hover"
                        style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "0.85rem", fontWeight: 600, color: "var(--accent)" }}>
                        Details <ArrowRight size={14} />
                    </Link>
                </div>
            </div>
        </motion.article>
    );
}
