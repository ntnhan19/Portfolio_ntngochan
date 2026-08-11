'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Github, ExternalLink, Clock, Users, Layers } from 'lucide-react';
import Link from 'next/link';
import type { Project } from '@/src/data/staticData';

interface ProjectHeroProps {
    project: Project;
    t: (key: string, variables?: Record<string, string>) => string;
}

const getBrandColor = (tech: string) => {
    const t = tech.toLowerCase();
    if (t.includes('react') || t.includes('next')) return 'var(--info)'; // Blue
    if (t.includes('fastapi') || t.includes('vue')) return 'var(--success)'; // Green
    if (t.includes('aws') || t.includes('amazon')) return '#FF9900'; // Orange
    if (t.includes('docker')) return '#2496ED'; // Docker Blue
    if (t.includes('postgres') || t.includes('sql')) return '#336791'; // Postgres Blue
    if (t.includes('python')) return '#3776AB'; 
    if (t.includes('node') || t.includes('express')) return '#339933';
    return 'var(--accent)';
};

export default function ProjectHero({ project, t }: ProjectHeroProps) {
    return (
        <section style={{ position: 'relative', overflow: 'hidden', background: 'var(--surface-raised)', paddingTop: '6rem', paddingBottom: '4rem' }}>
            <div className="max-w-6xl mx-auto px-6 relative z-10">
                
                {/* Breadcrumb */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    <Link href="/" className="hover:text-primary transition-colors">home</Link>
                    <span>/</span>
                    <Link href="/#projects" className="hover:text-primary transition-colors">projects</Link>
                    <span>/</span>
                    <span style={{ color: 'var(--text-secondary)' }}>{project.slug}</span>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left: Text & Actions */}
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
                        <span className="badge badge-pill mb-4 inline-block">
                            {t(`projectData.${project.slug}.category`)}
                        </span>
                        
                        <h1 style={{ fontFamily: 'var(--font-body)', fontWeight: 800, fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', letterSpacing: '-0.03em', lineHeight: 1.1, color: 'var(--text-primary)', marginBottom: '1rem' }}>
                            {project.title}
                        </h1>
                        
                        <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '2rem' }}>
                            {t(`projectData.${project.slug}.tagline`)}
                        </p>

                        {/* Action buttons */}
                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
                            {project.repo_url && (
                                <a href={project.repo_url} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ padding: '0.75rem 1.5rem', fontSize: '0.9rem' }}>
                                    <Github size={16} /> GitHub
                                </a>
                            )}
                            {project.demo_url && (
                                <a href={project.demo_url} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ padding: '0.75rem 1.5rem', fontSize: '0.9rem' }}>
                                    <ExternalLink size={16} /> Live Demo
                                </a>
                            )}
                        </div>

                        {/* Tech Stack Tags */}
                        <div>
                            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                                {t('projectDetail.stack')}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {project.tech_stack.map(tech => {
                                    const color = getBrandColor(tech);
                                    return (
                                        <span key={tech} className="px-3 py-1 rounded-md text-xs font-semibold" style={{ background: `color-mix(in srgb, ${color} 15%, transparent)`, color: color, border: `1px solid color-mix(in srgb, ${color} 30%, transparent)` }}>
                                            {tech}
                                        </span>
                                    );
                                })}
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Mockup Image */}
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="relative">
                        <div className="rounded-2xl overflow-hidden shadow-2xl" style={{ border: '1px solid var(--border)', background: 'var(--surface)', padding: '0.5rem' }}>
                            {/* Fake browser header */}
                            <div className="flex gap-2 mb-2 px-2 pt-1">
                                <div className="w-3 h-3 rounded-full bg-red-400" />
                                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                                <div className="w-3 h-3 rounded-full bg-green-400" />
                            </div>
                            <img
                                src={project.image_url}
                                alt={`${project.title} mockup`}
                                className="w-full h-auto rounded-xl object-cover"
                                style={{ aspectRatio: '16/10' }}
                            />
                        </div>
                        {/* Decorative blob behind the mockup */}
                        <div className="absolute -inset-4 z-[-1] opacity-30 rounded-[3rem] blur-3xl" style={{ background: 'linear-gradient(45deg, var(--accent), transparent)' }} />
                    </motion.div>
                </div>
            </div>

            {/* Stats Bar (Positioned overlapping the bottom) */}
            <div className="max-w-5xl mx-auto px-6 relative z-20 mt-12">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="grid grid-cols-3 gap-4 p-5 rounded-2xl shadow-xl" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                    <div className="flex items-center gap-4 p-2">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'var(--bg-subtle)' }}>
                            <Clock size={18} style={{ color: 'var(--accent)' }} />
                        </div>
                        <div>
                            <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t('projectDetail.duration')}</p>
                            <p style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.9rem' }}>{t(`projectData.${project.slug}.duration`)}</p>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-4 p-2 border-l" style={{ borderColor: 'var(--border)' }}>
                        <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'var(--bg-subtle)' }}>
                            <Users size={18} style={{ color: 'var(--info)' }} />
                        </div>
                        <div>
                            <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t('projectDetail.team')}</p>
                            <p style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.9rem' }}>{t('projectDetail.membersCount', { n: String(project.team_size) })}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 p-2 border-l" style={{ borderColor: 'var(--border)' }}>
                        <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'var(--bg-subtle)' }}>
                            <Layers size={18} style={{ color: 'var(--success)' }} />
                        </div>
                        <div>
                            <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t('projectDetail.stack')}</p>
                            <p style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.9rem' }}>{t('projectDetail.techCount', { n: String(project.tech_stack.length) })}</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
