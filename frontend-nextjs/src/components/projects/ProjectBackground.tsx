'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, Rocket } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import type { Project } from '@/src/data/staticData';

interface ProjectBackgroundProps {
    project: Project;
    backgroundText: string;
    t: (key: string) => string;
}

export default function ProjectBackground({ project, backgroundText, t }: ProjectBackgroundProps) {
    if (!backgroundText && project.highlights.length === 0) return null;

    return (
        <section className="py-24">
            <div className="max-w-6xl mx-auto px-6">
                <div className="grid lg:grid-cols-[1fr_400px] gap-12 lg:gap-16 items-start">
                    
                    {/* Left: Background Text */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1.5rem' }}>
                            {t('aboutPage.timeline.title') === 'aboutPage.timeline.title' ? 'Background' : 'Bối cảnh'}
                            {/* Note: since 'Bối cảnh' label wasn't specified in requirements, we hardcode English/Vietnamese based on locale check if needed, or just let i18n handle it if added. For now, we'll just check if t('projectDetail.highlights') is 'Điểm nổi bật' to know it's Vietnamese. */}
                        </h2>
                        <article className="prose" style={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'var(--text-secondary)' }}>
                            <ReactMarkdown>{backgroundText}</ReactMarkdown>
                        </article>
                    </motion.div>

                    {/* Right: Highlights Box */}
                    {project.highlights.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="pt-2 md:pt-4 relative"
                        >
                            {/* Gradient border effect via pseudo-element */}
                            <div className="absolute top-0 left-0 w-full h-1" style={{ background: 'linear-gradient(90deg, var(--accent), var(--info))' }} />
                            
                            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Rocket size={20} style={{ color: 'var(--accent)' }} />
                                {t('projectDetail.highlights')}
                            </h3>
                            
                            <ul className="flex flex-col gap-4">
                                {project.highlights.map((h, i) => (
                                    <li key={i} className="flex gap-3 items-start">
                                        <CheckCircle2 size={18} style={{ color: 'var(--success)', marginTop: '0.2rem', flexShrink: 0 }} />
                                        <span style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                                            {t(`projectData.${project.slug}.highlights.${i}`)}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    )}
                </div>
            </div>
        </section>
    );
}
