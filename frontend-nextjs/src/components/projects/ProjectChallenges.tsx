'use client';

import { motion } from 'framer-motion';
import { Target, Bug, AlertTriangle, Cpu, Zap } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface Challenge {
    title: string;
    description: string;
}

interface ProjectChallengesProps {
    challenges: Challenge[];
    locale: string;
}

const getChallengeIcon = (title: string) => {
    const t = title.toLowerCase();
    if (t.includes('bug') || t.includes('lỗi')) return Bug;
    if (t.includes('performance') || t.includes('hiệu suất')) return Zap;
    if (t.includes('concurrency') || t.includes('đồng thời')) return Cpu;
    if (t.includes('race') || t.includes('tranh chấp')) return AlertTriangle;
    return Target;
};

export default function ProjectChallenges({ challenges, locale }: ProjectChallengesProps) {
    if (!challenges || challenges.length === 0) return null;

    return (
        <section className="py-24" style={{ background: 'var(--bg-base)' }}>
            <div className="max-w-6xl mx-auto px-6">
                
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="mb-12 text-center"
                >
                    <span className="inline-flex items-center justify-center p-3 mb-4 rounded-full" style={{ background: 'color-mix(in srgb, var(--danger) 15%, transparent)' }}>
                        <Target size={24} style={{ color: 'var(--danger)' }} />
                    </span>
                    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                        {locale === 'vi' ? 'Thách thức Kỹ thuật' : 'Engineering Challenges'}
                    </h2>
                </motion.div>

                <div className="flex flex-col gap-16 lg:gap-24 mt-8">
                    {challenges.map((challenge, i) => {
                        const Icon = getChallengeIcon(challenge.title);
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
                                        style={{ background: 'color-mix(in srgb, var(--danger) 15%, transparent)' }}
                                    >
                                        <Icon size={24} style={{ color: 'var(--danger)' }} />
                                    </div>
                                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.4 }}>
                                        {challenge.title}
                                    </h3>
                                </div>
                                
                                {/* Right Column: Description & Media */}
                                <div className="md:col-span-8 w-full overflow-hidden">
                                    <div className="prose max-w-none" style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                                        <ReactMarkdown>{challenge.description}</ReactMarkdown>
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
