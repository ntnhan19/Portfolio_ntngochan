'use client';

import { motion } from 'framer-motion';
import { Lightbulb, Server, Database, Code, Cloud } from 'lucide-react';

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
        <section className="py-24">
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

                <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
                    {decisions.map((decision, i) => {
                        const Icon = getDecisionIcon(decision.title);
                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.5, delay: i * 0.15 }}
                                className="group flex flex-col items-start transition-all duration-300"
                            >
                                <div 
                                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
                                    style={{ background: 'color-mix(in srgb, var(--accent) 15%, transparent)' }}
                                >
                                    <Icon size={24} style={{ color: 'var(--accent)' }} />
                                </div>
                                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1rem', lineHeight: 1.4 }}>
                                    {decision.title}
                                </h3>
                                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                                    {decision.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
                
            </div>
        </section>
    );
}
