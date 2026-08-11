// app/projects/[id]/ProjectDetailClient.tsx
'use client';

import { projects } from '../../../src/data/staticData';
import Link from 'next/link';
import { ArrowLeft, Github, ExternalLink, Users, Clock, Code2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { useLocale } from '../../../src/context/LocaleContext';
import { LanguageToggle } from '@/src/components/ui/LanguageToggle';
import { ThemeToggle } from '@/src/components/ui/ThemeToggle';
import { usePortfolioTheme } from '@/src/hooks/usePortfolioTheme';
import { useState, useEffect } from 'react';

export default function ProjectDetailClient({ slug, contentEn, contentVi }: { slug: string, contentEn: string, contentVi: string }) {
    const { t, locale } = useLocale();
    const { theme, toggleTheme } = usePortfolioTheme();
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            setIsScrolled(window.scrollY > 40);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);
    const project = projects.find(
        (p) => p.slug === slug || p.id.toString() === slug
    );

    if (!project) {
        return (
            <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-base)', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
                project not found
            </main>
        );
    }

    return (
        <main style={{ background: 'var(--bg-base)', color: 'var(--text-primary)', minHeight: '100vh' }}>
            
            {/* ── NAVBAR ── */}
            <header
                style={{
                    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
                    transition: 'all 0.3s ease',
                    background: isScrolled ? 'var(--bg-overlay)' : 'transparent',
                    backdropFilter: isScrolled ? 'blur(16px)' : 'none',
                    borderBottom: isScrolled ? '1px solid var(--border)' : 'none',
                    height: '64px',
                    display: 'flex',
                    alignItems: 'center'
                }}
            >
                <div style={{ maxWidth: '56rem', margin: '0 auto', width: '100%', padding: '0 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Link href="/#projects"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)', textDecoration: 'none' }}>
                        <ArrowLeft size={16} /> {t('projectDetail.back')}
                    </Link>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <LanguageToggle />
                        <ThemeToggle theme={theme} onToggle={toggleTheme} />
                    </div>
                </div>
            </header>

            {/* ── HERO ── */}
            <section style={{ position: 'relative', minHeight: '420px', overflow: 'hidden', background: 'var(--surface-raised)' }}>
                <img
                    src={project.image_url}
                    alt={project.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.3 }}
                    onError={e => { e.currentTarget.style.display = 'none'; }}
                />
                {/* Gradient overlay — theme-aware */}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--bg-base) 0%, color-mix(in srgb, var(--bg-base) 40%, transparent) 50%, transparent 100%)' }} />

                {/* Hero content */}
                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '2.5rem 1.5rem' }}>
                    <div style={{ maxWidth: '56rem', margin: '0 auto', width: '100%' }}>
                        {/* Breadcrumb */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                            <Link href="/" style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.15s' }}
                                onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-primary)')}
                                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}>
                                home
                            </Link>
                            <span>/</span>
                            <Link href="/#projects" style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.15s' }}
                                onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-primary)')}
                                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}>
                                projects
                            </Link>
                            <span>/</span>
                            <span style={{ color: 'var(--text-secondary)' }}>{project.slug}</span>
                        </div>

                        {/* Category badge */}
                        <span className="badge badge-pill" style={{ marginBottom: '1rem', display: 'inline-block' }}>
                            {t(`projectData.${project.slug}.category`)}
                        </span>

                        {/* Title */}
                        <h1 style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 'clamp(2rem, 5vw, 3rem)', letterSpacing: '-0.03em', lineHeight: 1.05, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
                            {project.title}
                        </h1>

                        {/* Tagline */}
                        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-muted)', letterSpacing: '0.03em', marginBottom: '1.5rem' }}>
                            {t(`projectData.${project.slug}.tagline`)}
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

                {/* Meta strip — thay 3 gradient cards */}
                <div style={{
                    display: 'flex', gap: '2rem', flexWrap: 'wrap',
                    padding: '1rem 1.25rem', marginBottom: '2.5rem',
                    background: 'var(--surface)', border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-lg)',
                }}>
                    {[
                        { icon: <Clock size={13} />, label: t('projectDetail.duration'), value: t(`projectData.${project.slug}.duration`) },
                        { icon: <Users size={13} />, label: t('projectDetail.team'), value: t('projectDetail.membersCount', { n: String(project.team_size) }) },
                        { icon: <Code2 size={13} />, label: t('projectDetail.stack'), value: t('projectDetail.techCount', { n: String(project.tech_stack.length) }) },
                    ].map(item => (
                        <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{ color: 'var(--text-muted)' }}>{item.icon}</span>
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{item.label}</span>
                            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--text-primary)', fontWeight: 500 }}>{item.value}</span>
                        </div>
                    ))}
                </div>

                {/* Tech stack */}
                <div style={{ marginBottom: '2rem' }}>
                    <p className="section-label" style={{ marginBottom: '0.75rem' }}>{t('projectDetail.stack')}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {project.tech_stack.map(tech => (
                            <span key={tech} className="badge">{tech}</span>
                        ))}
                    </div>
                </div>

                {/* Highlights */}
                {project.highlights.length > 0 && (
                    <div style={{ marginBottom: '2.5rem', padding: '1.25rem', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)' }}>
                        <p className="section-label" style={{ marginBottom: '0.75rem' }}>{t('projectDetail.highlights')}</p>
                        <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            {project.highlights.map((h, i) => (
                                <li key={h} style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start', fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                                    <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--text-muted)', flexShrink: 0, marginTop: '0.45rem' }} />
                                    {t(`projectData.${project.slug}.highlights.${i}`)}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Markdown content */}
                <article className="prose">
                    <ReactMarkdown>{locale === 'vi' ? contentVi : contentEn}</ReactMarkdown>
                </article>
            </div>
        </main>
    );
}
