'use client';

import { motion } from 'framer-motion';
import { UserCog, ArrowRight } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface ProjectContributionProps {
    contribution: string[];
    locale: string;
}

export default function ProjectContribution({ contribution, locale }: ProjectContributionProps) {
    if (!contribution || contribution.length === 0) return null;

    return (
        <section className="py-24" style={{ background: 'var(--bg-base)' }}>
            <div className="max-w-4xl mx-auto px-6">
                
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="mb-10 text-center"
                >
                    <span className="inline-flex items-center justify-center p-3 mb-4 rounded-full" style={{ background: 'color-mix(in srgb, var(--accent) 15%, transparent)' }}>
                        <UserCog size={24} style={{ color: 'var(--accent)' }} />
                    </span>
                    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                        {locale === 'vi' ? 'Đóng góp của tôi' : 'My Contribution'}
                    </h2>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="p-8 md:p-10 rounded-[2rem]"
                    style={{ background: 'var(--surface)' }}
                >
                    <ul className="space-y-6">
                        {contribution.map((item, i) => {
                            return (
                                <li key={i} className="flex items-start gap-4">
                                    <div className="flex-shrink-0 mt-1">
                                        <ArrowRight size={18} style={{ color: 'var(--accent)' }} />
                                    </div>
                                    <div className="prose prose-p:my-0 max-w-none" style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                                        <ReactMarkdown>{item}</ReactMarkdown>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </motion.div>
                
            </div>
        </section>
    );
}
