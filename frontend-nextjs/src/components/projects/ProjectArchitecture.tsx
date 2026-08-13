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
        <section className="py-24" style={{ background: 'var(--bg-subtle)' }}>
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
                                src="https://mermaid.ink/svg/eyJjb2RlIjoiZmxvd2NoYXJ0IFREXG4gICAgc3ViZ3JhcGggQ2xpZW50XG4gICAgICAgIFJlYWN0W1JlYWN0LmpzIEZyb250ZW5kXVxuICAgIGVuZFxuXG4gICAgc3ViZ3JhcGggU2VydmVyXG4gICAgICAgIE5vZGVbTm9kZS5qcyArIEV4cHJlc3MgQVBJXVxuICAgICAgICBDcm9uW05vZGUtQ3Jvbl1cbiAgICBlbmRcblxuICAgIHN1YmdyYXBoIEV4dGVybmFsXG4gICAgICAgIFZOUGF5W1ZOUGF5IFNhbmRib3hdXG4gICAgICAgIFRNREJbVE1EQiBBUEldXG4gICAgZW5kXG5cbiAgICBzdWJncmFwaCBTdG9yYWdlXG4gICAgICAgIFBvc3RncmVzWyhQb3N0Z3JlU1FMKV1cbiAgICBlbmRcblxuICAgIFJlYWN0IDwtLT58SFRUUCAvIFdlYlNvY2tldHwgTm9kZVxuICAgIE5vZGUgLS0+fERhdGFiYXNlIFRyYW5zYWN0aW9ufCBQb3N0Z3Jlc1xuICAgIE5vZGUgPC0tPnxXZWJob29rIC8gQ2FsbGJhY2t8IFZOUGF5XG4gICAgQ3JvbiAtLT58RmV0Y2ggbGF0ZXN0IG1vdmllc3wgVE1EQlxuICAgIENyb24gLS0+fEdlbmVyYXRlIHNob3d0aW1lc3wgUG9zdGdyZXMiLCJtZXJtYWlkIjp7InRoZW1lIjoiZGVmYXVsdCJ9fQ==" 
                                alt="DHLCinema Architecture Flowchart"
                                style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '1rem' }}
                            />
                        ) : slug === 'sma' ? (
                            <img 
                                src="https://mermaid.ink/svg/eyJjb2RlIjoiZmxvd2NoYXJ0IFREXG4gICAgc3ViZ3JhcGggQ2xpZW50XG4gICAgICAgIFJlYWN0W1JlYWN0IERhc2hib2FyZF1cbiAgICBlbmRcblxuICAgIHN1YmdyYXBoIEFQSSBMYXllclxuICAgICAgICBBUElbRmFzdEFQSSBCYWNrZW5kXVxuICAgICAgICBXU1tXZWJTb2NrZXQgSHViXVxuICAgIGVuZFxuXG4gICAgc3ViZ3JhcGggQUkgUGlwZWxpbmVcbiAgICAgICAgUXVldWVbKEV2ZW50IEJ1cyAvIFNRUyldXG4gICAgICAgIFdvcmtlcltBSSBXb3JrZXIgLSBFQ1MgRmFyZ2F0ZV1cbiAgICAgICAgTW9kZWxzW1doaXNwZXIgJiBWaXNpb24gTW9kZWxzXVxuICAgIGVuZFxuXG4gICAgc3ViZ3JhcGggU3RvcmFnZVxuICAgICAgICBQR1soUG9zdGdyZVNRTCArIHBndmVjdG9yKV1cbiAgICAgICAgUzNbKEFXUyBTMyldXG4gICAgZW5kXG5cbiAgICBSZWFjdCA8LS0+fEhUVFAvUkVTVHwgQVBJXG4gICAgUmVhY3QgPC0tPnxXZWJTb2NrZXR8IFdTXG4gICAgQVBJIC0uLT58RXZlbnRzfCBRdWV1ZVxuICAgIFF1ZXVlIC0tPnxUcmlnZ2Vyc3wgV29ya2VyXG4gICAgV29ya2VyIC0tPnxJbmZlcmVuY2V8IE1vZGVsc1xuICAgIFdvcmtlciAtLT58U2F2ZSBNZXRhZGF0YXwgUEdcbiAgICBXb3JrZXIgLS0+fFN0YXR1cyBVcGRhdGVzfCBXU1xuICAgIEFQSSA8LS0+fFJlYWQvV3JpdGV8IFBHXG4gICAgQVBJIDwtLT58VXBsb2Fkc3wgUzMiLCJtZXJtYWlkIjp7InRoZW1lIjoiZGVmYXVsdCJ9fQ==" 
                                alt="SMA Architecture Flowchart"
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
