// src/components/projects/ProjectCard.tsx
"use client";

import Link from "next/link";
import { Github, ExternalLink, ArrowRight, Users } from "lucide-react";
import { motion } from "framer-motion";
import type { Project } from "@/src/data/staticData";

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
    const isFeatured = variant === "featured";
    const MAX_TAGS = isFeatured ? 5 : 4;

    return (
        <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="card"
            style={{
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                borderRadius: "var(--radius-xl)",
            }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
        >
            {/* Thumbnail */}
            <Link
                href={`/projects/${project.slug}`}
                tabIndex={-1}
                aria-hidden="true"
                style={{
                    display: "block",
                    position: "relative",
                    height: isFeatured ? "220px" : "180px",
                    background: "var(--gray-900)",
                    overflow: "hidden",
                    flexShrink: 0,
                }}
            >
                <img
                    src={project.image_url}
                    alt={project.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.75, transition: "opacity 0.3s, transform 0.4s ease" }}
                    onMouseEnter={e => { const el = e.currentTarget; el.style.opacity = "1"; el.style.transform = "scale(1.04)"; }}
                    onMouseLeave={e => { const el = e.currentTarget; el.style.opacity = "0.75"; el.style.transform = "scale(1)"; }}
                    onError={e => { e.currentTarget.style.display = "none"; }}
                />
                {/* Year badge */}
                <div style={{
                    position: "absolute", top: "0.75rem", right: "0.75rem",
                    background: "rgba(0,0,0,0.55)", backdropFilter: "blur(8px)",
                    border: "0.5px solid var(--border-subtle)", borderRadius: "var(--radius-pill)",
                    padding: "3px 10px", fontFamily: "var(--font-mono)",
                    fontSize: "0.65rem", color: "rgba(255,255,255,0.85)", letterSpacing: "0.06em",
                }}>
                    {project.year}
                </div>
            </Link>

            {/* Body */}
            <div style={{
                padding: isFeatured ? "1.5rem" : "1.25rem",
                display: "flex", flexDirection: "column", gap: "0.75rem", flex: 1,
            }}>
                {/* Meta: category · team · role */}
                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", flexWrap: "wrap" }}>
                    {[
                        project.category,
                        <><Users size={10} /> {project.team_size} members</>,
                        project.role,
                    ].map((item, i) => (
                        <span key={i} style={{ display: "flex", alignItems: "center", gap: "3px", fontFamily: "var(--font-mono)", fontSize: "0.67rem", color: "var(--text-tertiary)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                            {i > 0 && <span style={{ opacity: 0.3, marginRight: "0.4rem" }}>·</span>}
                            {item}
                        </span>
                    ))}
                </div>

                {/* Title + tagline */}
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    <Link href={`/projects/${project.slug}`} style={{ textDecoration: "none" }}>
                        <h3 style={{
                            fontFamily: "var(--font-body)", fontWeight: 600,
                            fontSize: isFeatured ? "1.1rem" : "1rem",
                            color: "var(--text-primary)", letterSpacing: "-0.02em",
                            lineHeight: 1.2, transition: "color 0.15s",
                        }}
                            onMouseEnter={e => (e.currentTarget.style.color = "var(--text-secondary)")}
                            onMouseLeave={e => (e.currentTarget.style.color = "var(--text-primary)")}
                        >
                            {project.title}
                        </h3>
                    </Link>
                    <p style={{
                        fontFamily: "var(--font-mono)", fontSize: "0.7rem",
                        color: "var(--text-tertiary)", letterSpacing: "0.02em", lineHeight: 1.4,
                    }}>
                        {project.tagline}
                    </p>
                </div>

                {/* Description — featured only */}
                {isFeatured && (
                    <p style={{
                        fontFamily: "var(--font-body)", fontSize: "0.82rem",
                        color: "var(--text-secondary)", lineHeight: 1.65,
                        display: "-webkit-box", WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical", overflow: "hidden",
                    }}>
                        {project.description}
                    </p>
                )}

                {/* Tech badges */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    {project.tech_stack.slice(0, MAX_TAGS).map(tech => (
                        <span key={tech} className="badge">{tech}</span>
                    ))}
                    {project.tech_stack.length > MAX_TAGS && (
                        <span className="badge">+{project.tech_stack.length - MAX_TAGS}</span>
                    )}
                </div>

                {/* Footer links */}
                <div style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    marginTop: "auto", paddingTop: "0.75rem",
                    borderTop: "0.5px solid var(--border-subtle)",
                }}>
                    <div style={{ display: "flex", gap: "0.75rem" }}>
                        {project.repo_url && (
                            <a href={project.repo_url} target="_blank" rel="noopener noreferrer"
                                className="link-hover"
                                style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "0.78rem", fontFamily: "var(--font-body)" }}>
                                <Github size={13} /> GitHub
                            </a>
                        )}
                        {project.demo_url && (
                            <a href={project.demo_url} target="_blank" rel="noopener noreferrer"
                                className="link-hover"
                                style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "0.78rem", fontFamily: "var(--font-body)" }}>
                                <ExternalLink size={13} /> Demo
                            </a>
                        )}
                    </div>
                    <Link href={`/projects/${project.slug}`}
                        className="link-hover"
                        style={{ display: "flex", alignItems: "center", gap: "3px", fontSize: "0.78rem", fontFamily: "var(--font-body)" }}>
                        Details <ArrowRight size={12} />
                    </Link>
                </div>
            </div>
        </motion.article>
    );
}