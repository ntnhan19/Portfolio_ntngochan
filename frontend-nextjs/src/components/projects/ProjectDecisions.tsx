'use client';

import { motion } from 'framer-motion';
import { Lightbulb, Server, Database, Code, Cloud } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface Decision {
    title: string;
    description: string;
}

interface ProjectDecisionsProps {
    decisions: Decision[];
    locale: string;
}

const getDecisionIcon = (title: string) => {
    const t = title.toLowerCase();
    if (t.includes('cloud') || t.includes('đám mây') || t.includes('aws')) return Cloud;
    if (t.includes('database') || t.includes('dữ liệu') || t.includes('vector')) return Database;
    if (t.includes('architecture') || t.includes('kiến trúc') || t.includes('server')) return Server;
    if (t.includes('code') || t.includes('separation') || t.includes('phân tách')) return Code;
    return Lightbulb;
};

export default function ProjectDecisions({ decisions, locale }: ProjectDecisionsProps) {
    if (!decisions || decisions.length === 0) return null;

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
                    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                        {locale === 'vi' ? 'Quyết định Kỹ thuật' : 'Key Technical Decisions'}
                    </h2>
                </motion.div>

                <div className="flex flex-col gap-16 lg:gap-24 mt-8">
                    {decisions.map((decision, i) => {
                        const Icon = getDecisionIcon(decision.title);
                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                className="grid md:grid-cols-12 gap-6 md:gap-12 items-start border-b border-color pb-16 lg:pb-24 last:border-0 last:pb-0"
                            >
                                {/* Left Column: Icon & Title */}
                                <div className="md:col-span-4 flex flex-col items-start md:sticky top-24">
                                    <div 
                                        className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                                        style={{ background: 'color-mix(in srgb, var(--accent) 15%, transparent)' }}
                                    >
                                        <Icon size={24} style={{ color: 'var(--accent)' }} />
                                    </div>
                                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.4 }}>
                                        {decision.title}
                                    </h3>
                                </div>
                                
                                {/* Right Column: Description & Media */}
                                <div className="md:col-span-8 w-full overflow-hidden">
                                    <div className="prose max-w-none" style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                                        <ReactMarkdown>{decision.description}</ReactMarkdown>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
                
            </div>
        </section>
    );
}
