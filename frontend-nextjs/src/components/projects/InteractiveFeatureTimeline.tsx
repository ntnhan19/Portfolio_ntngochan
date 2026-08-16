'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface Feature {
    title: string;
    description: string;
}

interface InteractiveFeatureTimelineProps {
    features: Feature[];
    locale: string;
    slug: string;
}

export default function InteractiveFeatureTimeline({ features, locale, slug }: InteractiveFeatureTimelineProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [imgErrors, setImgErrors] = useState<Record<number, boolean>>({});

    if (!features || features.length === 0) return null;

    const handleImageError = (index: number) => {
        setImgErrors(prev => ({ ...prev, [index]: true }));
    };

    // Helper to render the image or a sleek placeholder
    const renderImageOrPlaceholder = (index: number) => {
        const hasError = imgErrors[index];
        const imageSrc = `/images/projects/${slug}/feature-${index}.png`; // or jpg, ideally user adds png

        if (hasError) {
            // Animated Gradient Placeholder
            return (
                <div className="w-full h-full flex items-center justify-center relative overflow-hidden"
                     style={{ background: 'linear-gradient(135deg, var(--surface) 0%, var(--surface-raised) 100%)' }}>
                    {/* Background decorative elements */}
                    <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                        className="absolute w-[200%] h-[200%] opacity-20"
                        style={{
                            background: 'conic-gradient(from 0deg, transparent, var(--accent), transparent)',
                            filter: 'blur(60px)'
                        }}
                    />
                    <div className="relative z-10 text-center flex flex-col items-center gap-4">
                        <div className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg" style={{ background: 'var(--accent)', color: 'var(--bg-base)' }}>
                            <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 800 }}>0{index + 1}</span>
                        </div>
                        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                            {locale === 'vi' ? 'Hình ảnh Minh họa' : 'Feature Visualization'}
                        </p>
                    </div>
                </div>
            );
        }

        return (
            <img 
                src={imageSrc}
                alt={`Feature ${index + 1}`}
                className="w-full h-full object-cover object-center"
                onError={() => handleImageError(index)}
            />
        );
    };

    return (
        <section className="py-24" style={{ background: 'var(--bg-subtle)' }}>
            <div className="max-w-7xl mx-auto px-6">
                
                {/* Section Header */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="mb-16 text-center md:text-left"
                >
                    <span className="inline-flex items-center justify-center p-3 mb-4 rounded-full" style={{ background: 'color-mix(in srgb, var(--accent) 15%, transparent)' }}>
                        <Star size={24} style={{ color: 'var(--accent)' }} />
                    </span>
                    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                        {locale === 'vi' ? 'Tính năng Chính' : 'Key Features'}
                    </h2>
                </motion.div>

                {/* 2-Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 relative">
                    
                    {/* LEFT COLUMN: Timeline */}
                    <div className="lg:col-span-5 relative">
                        {/* Vertical Line */}
                        <div className="absolute top-8 bottom-8 left-[11px] w-[2px]" style={{ background: 'var(--border)' }} />

                        <div className="flex flex-col gap-8 relative z-10">
                            {features.map((feature, i) => {
                                const isActive = activeIndex === i;
                                
                                return (
                                    <div 
                                        key={i} 
                                        className="relative flex gap-6 cursor-pointer group"
                                        onMouseEnter={() => setActiveIndex(i)}
                                    >
                                        {/* Node Indicator */}
                                        <div className="flex-shrink-0 mt-1 relative flex items-center justify-center w-6 h-6">
                                            {/* Pulse ring if active */}
                                            {isActive && (
                                                <motion.div 
                                                    layoutId="activeFeaturePulse"
                                                    className="absolute inset-0 rounded-full"
                                                    style={{ background: 'var(--accent)', opacity: 0.2 }}
                                                    animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
                                                    transition={{ duration: 2, repeat: Infinity }}
                                                />
                                            )}
                                            {/* The dot */}
                                            <motion.div 
                                                className="w-3 h-3 rounded-full relative z-10 transition-colors duration-300"
                                                style={{ background: isActive ? 'var(--accent)' : 'var(--text-muted)' }}
                                            />
                                        </div>

                                        {/* Text Content */}
                                        <div className="flex-1 pb-4">
                                            <motion.h3 
                                                className="transition-all duration-300"
                                                style={{ 
                                                    fontFamily: 'var(--font-display)', 
                                                    fontSize: '1.25rem', 
                                                    fontWeight: 700, 
                                                    color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                                                    opacity: isActive ? 1 : 0.6
                                                }}
                                            >
                                                {feature.title}
                                            </motion.h3>
                                            
                                            <motion.div 
                                                className="prose max-w-none mt-2 transition-all duration-300" 
                                                style={{ 
                                                    fontSize: '0.95rem', 
                                                    color: 'var(--text-secondary)', 
                                                    lineHeight: 1.6,
                                                    opacity: isActive ? 0.9 : 0.4
                                                }}
                                            >
                                                <ReactMarkdown>{feature.description}</ReactMarkdown>
                                            </motion.div>

                                            {/* Mobile-only Image (Shows immediately under text on small screens) */}
                                            <div className="block lg:hidden mt-6 rounded-2xl overflow-hidden border border-color shadow-md" style={{ background: 'var(--surface-raised)', aspectRatio: '16/9' }}>
                                                {renderImageOrPlaceholder(i)}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Sticky Image Gallery (Desktop only) */}
                    <div className="hidden lg:block lg:col-span-7">
                        <div className="sticky top-32 w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeIndex}
                                    initial={{ opacity: 0, scale: 1.05 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.4, ease: "easeInOut" }}
                                    className="w-full h-full absolute inset-0"
                                >
                                    {renderImageOrPlaceholder(activeIndex)}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
