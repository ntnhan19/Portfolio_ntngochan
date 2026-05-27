'use client';

import { profile, certificates, skillCategories } from '@/data';
import Link from 'next/link';
import {
    ArrowLeft, Mail, Github, Linkedin,
    Award, Trophy, Calendar, ExternalLink,
    Download, Code2, Database,
    Cpu, Globe, Zap, BookOpen, Gamepad2, Heart
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useLocale } from '@/src/context/LocaleContext';
import CareerTimeline from '@/src/components/about/CareerTimeline';

const fadeInUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } }
};

const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } }
};

const skillIcons = {
    backend: Code2,
    frontend: Globe,
    database: Database,
    'ai-tools': Cpu,
    devops: Zap,
} as const;

export default function AboutPage() {
    const { t, locale } = useLocale();

    const hobbies = [
        { icon: Gamepad2, title: t('aboutPage.hobbies.items.0.title'), desc: t('aboutPage.hobbies.items.0.desc') },
        { icon: Heart,    title: t('aboutPage.hobbies.items.1.title'), desc: t('aboutPage.hobbies.items.1.desc') },
        { icon: BookOpen, title: t('aboutPage.hobbies.items.2.title'), desc: t('aboutPage.hobbies.items.2.desc') },
    ];

    return (
        <div style={{ background: 'var(--bg-base)', color: 'var(--text-primary)', minHeight: '100vh' }}>

            {/* ── HERO ─────────────────────────────────────── */}
            <section style={{ borderBottom: '1px solid var(--border)', paddingTop: '5rem', paddingBottom: '4rem' }}>
                <div className="max-w-6xl mx-auto px-6">
                    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>

                        <Link href="/"
                            className="inline-flex items-center gap-2 mb-10 text-sm font-semibold transition-colors"
                            style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-body)' }}
                            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)'}
                            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'}
                        >
                            <ArrowLeft size={16} /> {t('aboutPage.backHome')}
                        </Link>

                        {/* 2-col: Avatar | Bio */}
                        <div className="grid lg:grid-cols-[380px_1fr] gap-12 lg:gap-20 items-center">

                            {/* Avatar */}
                            <motion.div
                                initial={{ opacity: 0, x: -24 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                className="flex justify-center lg:justify-start"
                            >
                                <div className="relative">
                                    {/* Photo */}
                                    <div className="w-72 h-72 lg:w-80 lg:h-80 rounded-2xl overflow-hidden"
                                        style={{ border: '1px solid var(--border)', boxShadow: '0 20px 60px rgba(26,58,92,0.12)' }}>
                                        <img
                                            src={profile.avatar_hero || '/placeholder-avatar.png'}
                                            alt={profile.full_name}
                                            className="w-full h-full object-cover object-center"
                                        />
                                    </div>
                                    {/* Status badge — minimal */}
                                    <div className="absolute -bottom-3 left-4 px-3 py-1.5 rounded-full flex items-center gap-2"
                                        style={{ background: 'var(--surface)', border: '1px solid var(--border)', boxShadow: '0 4px 16px rgba(26,58,92,0.1)' }}>
                                        <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--success)', display: 'inline-block', animation: 'blink 1.5s ease infinite' }} />
                                        <span style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
                                            {t('aboutPage.statusBadge')}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Bio text */}
                            <motion.div
                                variants={stagger} initial="hidden" animate="visible"
                                className="flex flex-col gap-5"
                            >
                                <motion.div variants={fadeInUp}>
                                    <p style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-mid)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                                        {locale === 'vi' ? '01. Giới thiệu' : '01. About me'}
                                    </p>
                                    <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em', color: 'var(--text-primary)' }}>
                                        {profile.full_name}
                                    </h1>
                                </motion.div>

                                <motion.p variants={fadeInUp}
                                    style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--accent)', fontFamily: 'var(--font-display)' }}>
                                    {profile.title}
                                </motion.p>

                                <motion.div variants={fadeInUp}
                                    style={{ fontSize: '0.95rem', lineHeight: 1.75, color: 'var(--text-secondary)' }}
                                    dangerouslySetInnerHTML={{ __html: profile.bio.replace(/\*\*(.*?)\*\*/g, `<strong style="color:var(--text-primary)">$1</strong>`) }}
                                />

                                {/* Social actions */}
                                <motion.div variants={fadeInUp} className="flex flex-wrap gap-3 pt-1">
                                    <a href={`mailto:${profile.email}`} className="btn btn-primary" style={{ fontSize: '0.875rem' }}>
                                        <Mail size={15} /> {t('aboutPage.cta.contact')}
                                    </a>
                                    <a href={profile.github} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ fontSize: '0.875rem' }}>
                                        <Github size={15} /> GitHub
                                    </a>
                                    <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ fontSize: '0.875rem' }}>
                                        <Linkedin size={15} /> LinkedIn
                                    </a>
                                </motion.div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── SKILLS ───────────────────────────────────── */}
            <section id="skills" style={{ background: 'var(--bg-subtle)', borderBottom: '1px solid var(--border)', paddingTop: '5rem', paddingBottom: '5rem' }}>
                <div className="max-w-6xl mx-auto px-6">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="mb-10">
                        <motion.span variants={fadeInUp}
                            style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent-mid)', display: 'block', marginBottom: '0.5rem' }}>
                            02. {t('aboutPage.skills.title')}
                        </motion.span>
                        <motion.h2 variants={fadeInUp}
                            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
                            {t('aboutPage.skills.subtitle')}
                        </motion.h2>
                    </motion.div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                        {skillCategories.map((cat, i) => {
                            const Icon = skillIcons[cat.key as keyof typeof skillIcons];
                            return (
                                <motion.div key={cat.key}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.45, delay: i * 0.07 }}
                                    className="card p-5 flex flex-col gap-4"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-lg" style={{
                                            background: `color-mix(in srgb, var(${cat.colorVar}) 12%, transparent)`,
                                            border: `1px solid color-mix(in srgb, var(${cat.colorVar}) 22%, transparent)`,
                                        }}>
                                            <Icon size={16} style={{ color: `var(${cat.colorVar})` }} />
                                        </div>
                                        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-primary)' }}>
                                            {t(`aboutPage.skills.categories.${cat.i18nKey}`)}
                                        </span>
                                    </div>
                                    <div className="flex flex-col gap-2.5">
                                        {cat.core.map(skill => (
                                            <div key={skill} className="flex items-center gap-2" style={{ fontSize: '0.82rem' }}>
                                                <span style={{ width: 4, height: 4, borderRadius: '50%', background: `var(${cat.colorVar})`, flexShrink: 0 }} />
                                                <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{skill}</span>
                                            </div>
                                        ))}
                                        {cat.secondary.map(skill => (
                                            <div key={skill} className="flex items-center gap-2 pl-1" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                                <span style={{ width: 2, height: 2, borderRadius: '50%', background: 'var(--text-muted)', opacity: 0.45, flexShrink: 0 }} />
                                                {skill}
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ── EDUCATION ────────────────────────────────── */}
            <section style={{ background: 'var(--bg-base)', borderBottom: '1px solid var(--border)', paddingTop: '5rem', paddingBottom: '5rem' }}>
                <div className="max-w-6xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="card p-8 flex flex-col md:flex-row items-center gap-8"
                    >
                        <div className="p-4 rounded-2xl flex-shrink-0 flex items-center justify-center"
                            style={{ background: 'var(--surface)', border: '1px solid var(--border)', width: '7.5rem', height: '7.5rem' }}>
                            <img
                                src="/images/logo_hutech.webp"
                                alt="HUTECH logo"
                                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                            />
                        </div>
                        <div className="text-center md:text-left">
                            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem', color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                                {t('aboutPage.education.university')}
                            </h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '0.75rem' }}>
                                {t('aboutPage.education.degree')}
                            </p>
                            <div className="flex flex-wrap gap-5 justify-center md:justify-start" style={{ color: 'var(--text-muted)', fontSize: '0.82rem', fontFamily: 'var(--font-mono)' }}>
                                <span className="flex items-center gap-1.5"><Calendar size={14} /> {t('aboutPage.education.year')}</span>
                                <span className="flex items-center gap-1.5"><Award size={14} /> {t('aboutPage.education.gpa')}</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── CERTIFICATES & AWARDS ────────────────────── */}
            <section style={{ background: 'var(--bg-subtle)', borderBottom: '1px solid var(--border)', paddingTop: '5rem', paddingBottom: '5rem' }}>
                <div className="max-w-6xl mx-auto px-6">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="mb-10">
                        <motion.span variants={fadeInUp} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent-mid)', display: 'block', marginBottom: '0.5rem' }}>
                            03. {t('aboutPage.certificates.title')}
                        </motion.span>
                        <motion.h2 variants={fadeInUp} style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
                            {t('aboutPage.certificates.subtitle')}
                        </motion.h2>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {certificates.map((cert, i: number) => (
                            <motion.div key={cert.id}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.08 }}
                                className="card overflow-hidden group"
                                style={{ cursor: cert.url ? 'pointer' : 'default' }}
                            >
                                {/* Image area */}
                                <div style={{ height: '14rem', background: 'var(--surface-raised)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0.75rem', borderBottom: '1px solid var(--border)' }}>
                                    <img
                                        src={cert.image_url}
                                        alt={cert.name}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '10px', transition: 'transform 0.3s ease' }}
                                        className="group-hover:scale-105"
                                    />
                                </div>
                                {/* Content */}
                                <div style={{ padding: '1.25rem' }}>
                                    <div className="flex items-center gap-2 mb-2">
                                        {cert.type === 'Award'
                                            ? <Trophy size={15} style={{ color: 'var(--warning)' }} />
                                            : <Award size={15} style={{ color: 'var(--accent-mid)' }} />}
                                        <span style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)' }}>
                                            {cert.type}
                                        </span>
                                    </div>
                                    <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)', lineHeight: 1.35, marginBottom: '0.3rem' }}>
                                        {cert.name}
                                    </h3>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', marginBottom: '0.5rem' }}>{cert.issuer}</p>
                                    <div className="flex items-center justify-between">
                                        <span className="flex items-center gap-1.5" style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                                            <Calendar size={12} /> {cert.date}
                                        </span>
                                        {cert.url && (
                                            <a href={cert.url} target="_blank" rel="noopener noreferrer"
                                                className="flex items-center gap-1 transition-colors"
                                                style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--accent-mid)', fontFamily: 'var(--font-body)' }}
                                                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--accent)'}
                                                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--accent-mid)'}
                                            >
                                                {t('aboutPage.certificates.viewCert')} <ExternalLink size={12} />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── HOBBIES & ACTIVITIES ─────────────────────── */}
            <section style={{ background: 'var(--bg-base)', borderBottom: '1px solid var(--border)', paddingTop: '5rem', paddingBottom: '5rem' }}>
                <div className="max-w-6xl mx-auto px-6">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="mb-10">
                        <motion.span variants={fadeInUp} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent-mid)', display: 'block', marginBottom: '0.5rem' }}>
                            04. {t('aboutPage.timeline.title')}
                        </motion.span>
                        <motion.h2 variants={fadeInUp} style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
                            {t('aboutPage.timeline.subtitle')}
                        </motion.h2>
                    </motion.div>

                    <CareerTimeline ctaLabel={t('aboutPage.timeline.cta')} />

                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="mt-16 mb-8">
                        <motion.span variants={fadeInUp} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent-mid)', display: 'block', marginBottom: '0.5rem' }}>
                            05. {t('aboutPage.hobbies.title')}
                        </motion.span>
                        <motion.h3 variants={fadeInUp} style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.35rem, 2.4vw, 1.8rem)', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
                            {t('aboutPage.hobbies.subtitle')}
                        </motion.h3>
                    </motion.div>

                    {/* Personal hobbies */}
                    <div className="grid md:grid-cols-3 gap-4">
                        {hobbies.map((hobby, i) => {
                            const Icon = hobby.icon;
                            return (
                                <motion.div key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.08 }}
                                    className="card p-6 text-center"
                                >
                                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                                        style={{ background: 'var(--accent-light)', border: '1px solid var(--accent-border)' }}>
                                        <Icon size={22} style={{ color: 'var(--accent)' }} />
                                    </div>
                                    <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                                        {hobby.title}
                                    </h3>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', lineHeight: 1.6 }}>
                                        {hobby.desc}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ── CTA ──────────────────────────────────────── */}
            <section style={{ background: 'var(--bg-subtle)', paddingTop: '5rem', paddingBottom: '5rem' }}>
                <div className="max-w-3xl mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="card p-10 flex flex-col items-center gap-6"
                    >
                        {/* Accent dot */}
                        <div className="flex items-center gap-2 mb-2">
                            <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--success)', display: 'inline-block', animation: 'blink 1.5s ease infinite' }} />
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)', letterSpacing: '0.08em' }}>
                                {t('hero.status')}
                            </span>
                        </div>

                        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, letterSpacing: '-0.025em', color: 'var(--text-primary)', lineHeight: 1.2 }}>
                            {t('aboutPage.cta.title')}
                        </h2>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.75, maxWidth: '38rem' }}>
                            {t('aboutPage.cta.desc', { role: t('aboutPage.cta.role') })}
                        </p>

                        <div className="flex flex-wrap justify-center gap-3 pt-2">
                            <a href={`mailto:${profile.email}`} className="btn btn-primary" style={{ padding: '0.75rem 1.75rem', fontSize: '0.9rem' }}>
                                <Mail size={16} /> {t('aboutPage.cta.contact')}
                            </a>
                            <Link href="/resume" className="btn btn-secondary" style={{ padding: '0.75rem 1.75rem', fontSize: '0.9rem' }}>
                                <Download size={16} /> {t('aboutPage.cta.cv')}
                            </Link>
                        </div>

                        <div className="flex items-center gap-4 pt-2" style={{ borderTop: '1px solid var(--border)', width: '100%', justifyContent: 'center', paddingTop: '1.5rem' }}>
                            {[
                                { icon: Github, href: profile.github, label: 'GitHub' },
                                { icon: Linkedin, href: profile.linkedin, label: 'LinkedIn' },
                                { icon: Mail, href: `mailto:${profile.email}`, label: 'Email' },
                            ].map(social => {
                                const Icon = social.icon;
                                return (
                                    <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer"
                                        className="btn btn-secondary"
                                        style={{ padding: '0.55rem 0.75rem' }}
                                        aria-label={social.label}
                                    >
                                        <Icon size={16} />
                                    </a>
                                );
                            })}
                        </div>
                    </motion.div>
                </div>
            </section>

        </div>
    );
}
