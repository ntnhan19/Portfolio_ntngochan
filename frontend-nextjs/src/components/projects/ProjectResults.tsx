'use client';

import { motion } from 'framer-motion';
import { Target } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface ProjectResultsProps {
    resultsText: string;
    locale: string;
}

// A custom markdown renderer that wraps numbers in a highlighted span
const CustomTextRenderer = ({ children }: { children: React.ReactNode }) => {
    if (typeof children !== 'string') return <>{children}</>;

    // Regex to match numbers (e.g. 95%, 3-5, 9/10, 4, 2026) and wrap them
    const parts = children.split(/(\d+(?:[.,]\d+)?(?:%|\/\d+|-\d+)?)/);
    
    return (
        <>
            {parts.map((part, i) => {
                if (part.match(/^\d+(?:[.,]\d+)?(?:%|\/\d+|-\d+)?$/)) {
                    return (
                        <span key={i} style={{ fontFamily: 'var(--font-display)', fontWeight: 800, color: 'var(--accent)', fontSize: '1.25em', padding: '0 0.15em' }}>
                            {part}
                        </span>
                    );
                }
                return <span key={i}>{part}</span>;
            })}
        </>
    );
};

export default function ProjectResults({ resultsText, locale }: ProjectResultsProps) {
    if (!resultsText) return null;

    return (
        <section className="py-16 md:py-24" style={{ background: 'var(--bg-subtle)', borderTop: '1px solid var(--border)' }}>
            <div className="max-w-4xl mx-auto px-6">
                
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <span className="inline-flex items-center justify-center p-3 mb-4 rounded-full" style={{ background: 'color-mix(in srgb, var(--success) 15%, transparent)' }}>
                        <Target size={24} style={{ color: 'var(--success)' }} />
                    </span>
                    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                        {locale === 'vi' ? 'Kết quả Đạt được' : 'Results & Impact'}
                    </h2>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="card p-8 md:p-12"
                    style={{ background: 'var(--surface)', border: '1px solid var(--border)', boxShadow: '0 20px 40px rgba(0,0,0,0.04)' }}
                >
                    <article className="prose" style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--text-secondary)' }}>
                        <ReactMarkdown
                            components={{
                                li: ({ node, ...props }) => (
                                    <li className="mb-4 flex gap-3 items-start" {...props}>
                                        <span style={{ color: 'var(--accent)', marginTop: '0.4rem', fontSize: '1.2rem' }}>•</span>
                                        <div>
                                            <CustomTextRenderer>{props.children as string}</CustomTextRenderer>
                                        </div>
                                    </li>
                                ),
                                p: ({ node, ...props }) => (
                                    <p className="mb-4" {...props}>
                                        <CustomTextRenderer>{props.children as string}</CustomTextRenderer>
                                    </p>
                                )
                            }}
                        >
                            {resultsText}
                        </ReactMarkdown>
                    </article>
                </motion.div>
                
            </div>
        </section>
    );
}
