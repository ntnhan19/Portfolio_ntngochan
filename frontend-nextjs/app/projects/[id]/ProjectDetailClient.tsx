// app/projects/[id]/ProjectDetailClient.tsx
'use client';

import { projects } from '../../../src/data/staticData';
import Link from 'next/link';
import { ArrowLeft, Github, ExternalLink, Users, Clock, Code2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';

export default function ProjectDetailClient({ slug }: { slug: string }) {
    const project = projects.find(
        (p) => p.slug === slug || p.id.toString() === slug
    );

    if (!project) {
        return (
            <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--black)', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
                project not found
            </main>
        );
    }

    return (
        <main style={{ background: 'var(--black)', color: 'var(--text-primary)', minHeight: '100vh' }}>

            {/* ── HERO ── */}
            <section style={{ position: 'relative', height: '420px', overflow: 'hidden', background: 'var(--gray-900)' }}>
                <img
                    src={project.image_url}
                    alt={project.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.3 }}
                    onError={e => { e.currentTarget.style.display = 'none'; }}
                />
                {/* Gradient overlay */}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--black) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.2) 100%)' }} />

                {/* Hero content */}
                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '2.5rem 1.5rem' }}>
                    <div style={{ maxWidth: '56rem', margin: '0 auto', width: '100%' }}>
                        {/* Breadcrumb */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-tertiary)' }}>
                            <Link href="/" style={{ color: 'var(--text-tertiary)', textDecoration: 'none', transition: 'color 0.15s' }}
                                onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-primary)')}
                                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-tertiary)')}>
                                home
                            </Link>
                            <span>/</span>
                            <Link href="/#projects" style={{ color: 'var(--text-tertiary)', textDecoration: 'none', transition: 'color 0.15s' }}
                                onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-primary)')}
                                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-tertiary)')}>
                                projects
                            </Link>
                            <span>/</span>
                            <span style={{ color: 'var(--text-secondary)' }}>{project.slug}</span>
                        </div>

                        {/* Category badge */}
                        <span className="badge badge-pill" style={{ marginBottom: '1rem', display: 'inline-block' }}>
                            {project.category}
                        </span>

                        {/* Title */}
                        <h1 style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 'clamp(2rem, 5vw, 3rem)', letterSpacing: '-0.03em', lineHeight: 1.05, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
                            {project.title}
                        </h1>

                        {/* Tagline */}
                        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-tertiary)', letterSpacing: '0.03em', marginBottom: '1.5rem' }}>
                            {project.tagline}
                        </p>

                        {/* Action buttons */}
                        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                            {project.repo_url && (
                                <a href={project.repo_url} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ fontSize: '0.85rem', padding: '0.55rem 1.25rem' }}>
                                    <Github size={15} /> GitHub
                                </a>
                            )}
                            {project.demo_url && (
                                <a href={project.demo_url} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ fontSize: '0.85rem', padding: '0.55rem 1.25rem' }}>
                                    <ExternalLink size={15} /> Live Demo
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── MAIN ── */}
            <div style={{ maxWidth: '56rem', margin: '0 auto', padding: '3rem 1.5rem' }}>

                {/* Back */}
                <Link href="/#projects"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: 'var(--text-tertiary)', textDecoration: 'none', marginBottom: '2.5rem', transition: 'color 0.15s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-primary)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-tertiary)')}>
                    <ArrowLeft size={14} /> Quay lại
                </Link>

                {/* Meta strip — thay 3 gradient cards */}
                <div style={{
                    display: 'flex', gap: '2rem', flexWrap: 'wrap',
                    padding: '1rem 1.25rem', marginBottom: '2.5rem',
                    background: 'var(--surface-1)', border: '0.5px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-lg)',
                }}>
                    {[
                        { icon: <Clock size={13} />, label: 'Thời gian', value: project.duration },
                        { icon: <Users size={13} />, label: 'Team', value: `${project.team_size} members` },
                        { icon: <Code2 size={13} />, label: 'Stack', value: `${project.tech_stack.length} công nghệ` },
                    ].map(item => (
                        <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{ color: 'var(--text-tertiary)' }}>{item.icon}</span>
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-tertiary)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{item.label}</span>
                            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--text-primary)', fontWeight: 500 }}>{item.value}</span>
                        </div>
                    ))}
                </div>

                {/* Tech stack */}
                <div style={{ marginBottom: '2rem' }}>
                    <p className="section-label" style={{ marginBottom: '0.75rem' }}>Tech Stack</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {project.tech_stack.map(tech => (
                            <span key={tech} className="badge">{tech}</span>
                        ))}
                    </div>
                </div>

                {/* Highlights */}
                {project.highlights.length > 0 && (
                    <div style={{ marginBottom: '2.5rem', padding: '1.25rem', background: 'var(--surface-1)', border: '0.5px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)' }}>
                        <p className="section-label" style={{ marginBottom: '0.75rem' }}>Điểm nổi bật</p>
                        <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            {project.highlights.map(h => (
                                <li key={h} style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start', fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                                    <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--text-tertiary)', flexShrink: 0, marginTop: '0.45rem' }} />
                                    {h}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Markdown content */}
                <article className="prose">
                    <ReactMarkdown>{project.content}</ReactMarkdown>
                </article>
            </div>
        </main>
    );
}