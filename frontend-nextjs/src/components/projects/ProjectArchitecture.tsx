'use client';

import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { Network } from 'lucide-react';

interface ProjectArchitectureProps {
    architectureText: string;
    locale: string;
    slug?: string;
}

export default function ProjectArchitecture({ architectureText, locale, slug }: ProjectArchitectureProps) {
    if (!architectureText) return null;

    return (
        <section className="py-24">
            <div className="max-w-6xl mx-auto px-6">
                
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <span className="inline-flex items-center justify-center p-3 mb-4 rounded-full" style={{ background: 'color-mix(in srgb, var(--accent) 15%, transparent)' }}>
                        <Network size={24} style={{ color: 'var(--accent)' }} />
                    </span>
                    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1rem' }}>
                        {locale === 'vi' ? 'Kiến trúc Hệ thống' : 'System Architecture'}
                    </h2>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                >
                    {/* Visual Diagram Placeholder or Actual Diagram */}
                    <div 
                        className="rounded-2xl overflow-hidden mb-10 flex items-center justify-center relative group bg-white"
                        style={{ 
                            aspectRatio: '16/9', 
                            border: '1px dashed var(--border)'
                        }}
                    >
                        {slug === 'dhlcinema' ? (
                            <img 
                                src="https://mermaid.ink/svg/eyJjb2RlIjoic2VxdWVuY2VEaWFncmFtXG4gICAgcGFydGljaXBhbnQgSFIgYXMgVXNlclxuICAgIHBhcnRpY2lwYW50IFJlbmRlciBhcyBOb2RlLmpzIChCYWNrZW5kKVxuICAgIHBhcnRpY2lwYW50IFRNRGIgYXMgVE1EYiBBUElcbiAgICBwYXJ0aWNpcGFudCBEQiBhcyBQb3N0Z3JlU1FMXG5cbiAgICBIUi0+PlJlbmRlcjogMS4gVmlzaXQgV2ViIChXYWtlcyBTZXJ2ZXIpXG4gICAgYWN0aXZhdGUgUmVuZGVyXG4gICAgUmVuZGVyLT4+VE1EYjogMi4gRmV0Y2ggTGF0ZXN0IE1vdmllc1xuICAgIFRNRGItLT4+UmVuZGVyOiBKU09OIChOb3cgUGxheWluZyAmIFVwY29taW5nKVxuICAgIFJlbmRlci0+PkRCOiAzLiBHYXJiYWdlIENvbGxlY3Rpb24gKE9sZCBUaWNrZXRzICYgTW92aWVzKVxuICAgIFJlbmRlci0+PkRCOiA0LiBTYXZlIE1vdmllcyAmIEdlbmVyYXRlIFNob3VzYW5kcyBvZiBTZWF0cylcbiAgICBSZW5kZXItLT4+SFI6IDYuIFNlcnZlIFBlcmZlY3QgV2ViIEludGVyZmFjZVxuICAgIGRlYWN0aXZhdGUgUmVuZGVyXG4iLCJtZXJtYWlkIjp7InRoZW1lIjoiZGVmYXVsdCJ9fQ" 
                                alt="Self-Healing Architecture Sequence Diagram"
                                style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '1rem' }}
                            />
                        ) : (
                            <div className="text-center p-6">
                                <Network size={48} style={{ color: 'var(--text-muted)', margin: '0 auto 1rem', opacity: 0.5 }} />
                                <p style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                    Architecture Diagram Placeholder
                                </p>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.5rem', opacity: 0.7 }}>
                                    16:9 Excalidraw / Draw.io export goes here
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Description Text */}
                    <div className="max-w-3xl mx-auto">
                        <article className="prose max-w-none" style={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'var(--text-secondary)' }}>
                            <ReactMarkdown>{architectureText}</ReactMarkdown>
                        </article>
                    </div>
                </motion.div>
                
            </div>
        </section>
    );
}
