'use client';

import { motion } from 'framer-motion';
import { Star, CheckCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface Feature {
    title: string;
    description: string;
}

interface ProjectFeaturesProps {
    features: Feature[];
    locale: string;
}

export default function ProjectFeatures({ features, locale }: ProjectFeaturesProps) {
    if (!features || features.length === 0) return null;

    return (
        <section className="py-24" style={{ background: 'var(--bg-subtle)' }}>
            <div className="max-w-6xl mx-auto px-6">
                
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="mb-12 text-center"
                >
                    <span className="inline-flex items-center justify-center p-3 mb-4 rounded-full" style={{ background: 'color-mix(in srgb, var(--accent) 15%, transparent)' }}>
                        <Star size={24} style={{ color: 'var(--accent)' }} />
                    </span>
                    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                        {locale === 'vi' ? 'Tính năng Chính' : 'Key Features'}
                    </h2>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                    {features.map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="flex gap-4 p-6 rounded-2xl border border-color"
                            style={{ background: 'var(--surface)' }}
                        >
                            <div className="flex-shrink-0 mt-1">
                                <CheckCircle size={20} style={{ color: 'var(--success)' }} />
                            </div>
                            <div>
                                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                                    {feature.title}
                                </h3>
                                <div className="prose max-w-none" style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                                    <ReactMarkdown>{feature.description}</ReactMarkdown>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
                
            </div>
        </section>
    );
}
