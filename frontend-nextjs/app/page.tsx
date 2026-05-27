'use client';

import { profile, projects, certificates, coreStackSkills, homepageSkillGroups, devopsSkillGroup } from '@/data';
import { ProjectCard } from '@/src/components/projects/ProjectCard';
import { ThemeToggle } from '@/src/components/ui/ThemeToggle';
import { LanguageToggle } from '@/src/components/ui/LanguageToggle';
import { useLocale } from '@/src/context/LocaleContext';
import {
  Mail, Github, Linkedin, ArrowUp, Menu, X,
  ExternalLink, ArrowRight,
  Database, Server, Zap, Globe, GitBranch, Check,
  Award, GraduationCap, Heart
} from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePortfolioTheme } from '@/src/hooks/usePortfolioTheme';

/* ─── ANIMATION VARIANTS ──────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: (delay = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay }
  })
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
};

/* navLinks built inside component so labels can be translated */

/* ─── SKILLS ──────────────────────────────────────────── */
/* colorVar = CSS variable name; works in both light & dark mode */
const skillIcons = {
  frontend: Globe,
  backend: Server,
  database: Database,
  'ai-tools': Zap,
  devops: GitBranch,
} as const;

export default function Portfolio() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { theme, toggleTheme } = usePortfolioTheme();
  const { t } = useLocale();
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  /* ── Nav links (built here so labels are translated) ── */
  const navLinks = [
    { label: t('nav.home'), href: '#home' },
    { label: t('nav.projects'), href: '#projects' },
    { label: t('nav.skills'), href: '#skills' },
    { label: t('nav.about'), href: '#about' },
    { label: t('nav.contact'), href: '#contact' },
  ];

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 40);
      setShowScrollTop(window.scrollY > 600);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main style={{ background: 'var(--bg-base)', color: 'var(--text-primary)', minHeight: '100vh' }}>

      {/* ── SCROLL PROGRESS ── */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-[60] h-[2px]"
        style={{
          scaleX,
          transformOrigin: '0%',
          background: 'linear-gradient(90deg, var(--progress-from), var(--progress-to))',
        }}
      />

      {/* ═══════════════════════════════════════
          NAVBAR
      ═══════════════════════════════════════ */}
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: isScrolled ? 'var(--bg-overlay)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(16px)' : 'none',
          borderBottom: isScrolled ? '1px solid var(--border)' : 'none',
        }}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
          <button
            onClick={() => scrollTo('#home')}
            style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--text-primary)', fontSize: '1rem' }}
          >
            <span style={{ color: 'var(--accent)' }}>{'<'}</span>
            {profile.full_name.split(' ').slice(-1)[0]}
            <span style={{ color: 'var(--accent)' }}>{' />'}</span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                className="px-3 py-1.5 rounded-full text-sm font-semibold transition-all duration-150"
                style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}
                onMouseEnter={e => {
                  (e.target as HTMLElement).style.color = 'var(--text-primary)';
                  (e.target as HTMLElement).style.background = 'var(--bg-muted)';
                }}
                onMouseLeave={e => {
                  (e.target as HTMLElement).style.color = 'var(--text-secondary)';
                  (e.target as HTMLElement).style.background = 'transparent';
                }}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden md:flex">
              <LanguageToggle />
            </div>
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-md"
              style={{ color: 'var(--text-secondary)' }}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden overflow-hidden"
              style={{ background: 'var(--bg-overlay)', borderTop: '1px solid var(--border)' }}
            >
              <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-1">
                {navLinks.map(link => (
                  <button key={link.label} onClick={() => scrollTo(link.href)}
                    className="text-left py-2.5 px-3 rounded-lg text-sm font-semibold transition-colors"
                    style={{ color: 'var(--text-secondary)' }}>
                    {link.label}
                  </button>
                ))}
                <div className="mt-3 flex items-center gap-2">
                  <LanguageToggle />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ═══════════════════════════════════════
          HERO SECTION
      ═══════════════════════════════════════ */}
      <section id="home" className="relative min-h-screen flex items-center"
        style={{ paddingTop: '5rem', paddingBottom: '4rem' }}>

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 grid-pattern pointer-events-none" style={{ opacity: 0.6 }} />

        {/* Decorative accent blob */}
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] pointer-events-none"
          style={{ background: 'radial-gradient(circle at 70% 50%, var(--accent-light) 0%, transparent 65%)', opacity: 0.7 }} />

        <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
          <div className="grid lg:grid-cols-[1fr_420px] gap-12 xl:gap-20 items-center">

            {/* ── LEFT: Text content ── */}
            <motion.div variants={stagger} initial="hidden" animate="visible" className="flex flex-col gap-7">

              {/* Status badge */}
              <motion.div variants={fadeUp} custom={0}>
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold"
                  style={{ background: 'var(--accent-light)', border: '1px solid var(--accent-border)', color: 'var(--accent)', fontFamily: 'var(--font-mono)', letterSpacing: '0.04em' }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--success)', display: 'inline-block', animation: 'blink 1.5s ease infinite' }} />
                  {t('hero.status')}
                </span>
              </motion.div>

              {/* Greeting + Name */}
              <motion.div variants={fadeUp} custom={0.05} className="flex flex-col gap-2">
                <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                  {t('hero.greeting')}
                </p>
                <h1 className="text-hero">
                  {profile.full_name.split(' ').slice(0, -1).join(' ')}{' '}
                  <span style={{ color: 'var(--accent)' }}>
                    {profile.full_name.split(' ').slice(-1)[0]}
                  </span>
                </h1>
              </motion.div>

              {/* Role + location */}
              <motion.div variants={fadeUp} custom={0.1} className="flex flex-col gap-1.5">
                <p style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--text-secondary)', letterSpacing: '-0.01em' }}>
                  {t('hero.role')}
                </p>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', display: 'flex', alignItems: 'center', gap: '0.45rem', flexWrap: 'wrap' }}>
                  <span>{t('hero.gpa')}</span>
                  <span style={{ opacity: 0.3 }}>·</span>
                  <span>{t('hero.university')}</span>
                </p>
              </motion.div>

              {/* Description */}
              <motion.div variants={fadeUp} custom={0.15}>
                <p style={{ fontSize: '1rem', lineHeight: 1.75, color: 'var(--text-secondary)', maxWidth: '520px' }}>
                  {t('hero.description')}
                </p>
              </motion.div>

              {/* CTAs */}
              <motion.div variants={fadeUp} custom={0.2} className="flex flex-wrap items-center gap-3 pt-1">
                <button onClick={() => scrollTo('#projects')} className="btn btn-primary" style={{ padding: '0.7rem 1.5rem', fontSize: '0.9rem' }}>
                  {t('hero.viewProjects')} <ArrowRight size={15} />
                </button>
                <a href={`mailto:${profile.email}`} className="btn btn-secondary" style={{ padding: '0.7rem 1.5rem', fontSize: '0.9rem' }}>
                  <Mail size={15} /> {t('hero.getInTouch')}
                </a>
                {/* Separator */}
                <span style={{ width: 1, height: 28, background: 'var(--border)', display: 'inline-block', margin: '0 0.25rem' }} />
                {/* Icon group */}
                <a href={profile.github} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ padding: '0.55rem 0.75rem' }}>
                  <Github size={15} />
                </a>
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ padding: '0.55rem 0.75rem' }}>
                  <Linkedin size={15} />
                </a>
              </motion.div>
            </motion.div>

            {/* ── RIGHT: Photo ── */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="hidden lg:block"
            >
              <div className="relative">
                <div className="rounded-2xl overflow-hidden aspect-square w-full"
                  style={{ boxShadow: '0 24px 64px rgba(26,58,92,0.14)', border: '1px solid var(--border)' }}>
                  <img
                    src={profile.avatar_hero}
                    alt={profile.full_name}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                {/* Floating status badge */}
                <div className="absolute -bottom-3 -left-3 px-3 py-2 rounded-xl flex items-center gap-2"
                  style={{ background: 'var(--surface)', border: '1px solid var(--border)', boxShadow: '0 4px 16px rgba(26,58,92,0.1)' }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--success)', display: 'inline-block', animation: 'blink 1.5s ease infinite' }} />
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
                    {t('hero.openToWork')}
                  </span>
                </div>
              </div>
            </motion.div>

          </div>

          {/* Scroll hint — animated chevron, fades on scroll */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isScrolled ? 0 : 1 }}
            transition={{ duration: 0.4 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center"
            style={{ pointerEvents: 'none' }}
          >
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              style={{ color: 'var(--border-strong)' }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          PROJECTS SECTION
      ═══════════════════════════════════════ */}
      <section id="projects" className="section-gap" style={{ borderTop: '1px solid var(--border)', background: 'var(--bg-subtle)' }}>
        <div className="max-w-6xl mx-auto px-6">

          {/* Header */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={stagger} className="mb-12">
            <motion.span variants={fadeUp} className="section-label block mb-3">{t('projects.sectionLabel')}</motion.span>
            <motion.h2 variants={fadeUp} className="text-section-heading" style={{ color: 'var(--text-primary)' }}>
              {t('projects.title')}
            </motion.h2>
          </motion.div>

          {/* Card grid — 2 columns, auto-wraps as more projects are added */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.25rem',
          }}>
            {projects.map((project, idx) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={idx}
                variant="featured"
              />
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="mt-10 text-center"
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/projects" className="btn btn-primary">
                {t('projects.viewAll')} <ArrowRight size={16} />
              </Link>
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                <Github size={16} /> {t('projects.viewMore')} <ExternalLink size={14} />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SKILLS SECTION
      ═══════════════════════════════════════ */}
      <section id="skills" className="section-gap" style={{ background: 'var(--bg-base)', borderTop: '1px solid var(--border)' }}>
        <div className="max-w-6xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={stagger} className="mb-10">
            <motion.span variants={fadeUp} className="section-label block mb-3">{t('skills.sectionLabel')}</motion.span>
            <motion.h2 variants={fadeUp} className="text-section-heading mb-2" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
              {t('skills.title')}
            </motion.h2>
            <motion.p variants={fadeUp} className="text-sm max-w-2xl" style={{ color: 'var(--text-secondary)', lineHeight: 1.65 }}>
              {t('skills.subtitle')}
            </motion.p>
          </motion.div>

          {/* Core stack — what I use in projects (intern scan target) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8 p-6 rounded-2xl"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)', boxShadow: '0 8px 32px rgba(26,58,92,0.06)' }}
          >
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent-mid)', marginBottom: '0.75rem' }}>
              {t('skills.coreStackLabel')}
            </p>
            <div className="flex flex-wrap gap-2.5">
              {coreStackSkills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-semibold"
                  style={{
                    background: 'var(--accent-light)',
                    border: '1px solid var(--accent-border)',
                    color: 'var(--accent)',
                    fontFamily: 'var(--font-display)',
                  }}
                >
                  <Check size={14} strokeWidth={2.5} />
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>

          {/* 4 domain groups with core vs familiar hierarchy */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {homepageSkillGroups.map((group, idx) => {
              const Icon = skillIcons[group.key as keyof typeof skillIcons];
              return (
                <motion.div
                  key={group.key}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className="card p-5 flex flex-col gap-4"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="p-2 rounded-lg"
                      style={{
                        background: `color-mix(in srgb, var(${group.colorVar}) 12%, transparent)`,
                        border: `1px solid color-mix(in srgb, var(${group.colorVar}) 25%, transparent)`,
                      }}
                    >
                      <Icon size={18} style={{ color: `var(${group.colorVar})` }} />
                    </div>
                    <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                      {group.title}
                    </span>
                  </div>

                  <div className="flex flex-col gap-3">
                    <div>
                      <p style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                        {t('skills.coreLabel')}
                      </p>
                      <ul className="flex flex-col gap-2 list-none m-0 p-0">
                        {group.core.map((skill) => (
                          <li key={skill} className="flex items-center gap-2">
                            <Check size={14} strokeWidth={2.5} style={{ color: `var(${group.colorVar})`, flexShrink: 0 }} />
                            <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.35 }}>
                              {skill}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {group.secondary.length > 0 && (
                      <div style={{ borderTop: '1px solid var(--border)', paddingTop: '0.75rem' }}>
                        <p style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                          {t('skills.familiarLabel')}
                        </p>
                        <ul className="flex flex-col gap-1.5 list-none m-0 p-0">
                          {group.secondary.map((skill) => (
                            <li key={skill} className="flex items-center gap-2">
                              <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'var(--text-muted)', flexShrink: 0, opacity: 0.5 }} />
                              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.35 }}>
                                {skill}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* DevOps — visible on homepage + link to full breakdown on /about */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-5 p-5 rounded-xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
            style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border)' }}
          >
            <div className="flex flex-col sm:flex-row sm:items-start gap-4 flex-1 min-w-0">
              <div className="flex items-center gap-3 shrink-0">
                <div className="p-2 rounded-lg" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                  <GitBranch size={18} style={{ color: 'var(--text-secondary)' }} />
                </div>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                  {devopsSkillGroup.title}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                {devopsSkillGroup.core.map((skill) => (
                  <span key={skill} className="inline-flex items-center gap-1.5 text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                    <Check size={13} strokeWidth={2.5} style={{ color: 'var(--success)' }} />
                    {skill}
                  </span>
                ))}
                {devopsSkillGroup.secondary.map((skill) => (
                  <span key={skill} className="text-sm" style={{ color: 'var(--text-muted)' }}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <Link href="/about#skills" className="btn btn-secondary text-sm shrink-0 self-start sm:self-center">
              {t('skills.viewFullBreakdown')} <ArrowRight size={14} />
            </Link>
          </motion.div>

          {/* Currently learning */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="mt-8 p-5 rounded-xl flex flex-wrap items-center gap-3"
            style={{ background: 'var(--accent-light)', border: '1px solid var(--accent-border)' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--accent)' }}>
              {t('skills.currentlyLearning')}
            </span>
            {['NestJS', 'Microservices Architecture', 'Docker Compose', 'System Design'].map(item => (
              <span key={item} className="badge" style={{ color: 'var(--accent)', borderColor: 'var(--accent-border)', background: 'transparent' }}>
                {item}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          ABOUT SECTION
      ═══════════════════════════════════════ */}
      <section id="about" className="section-gap" style={{ background: 'var(--bg-subtle)', borderTop: '1px solid var(--border)' }}>
        <div className="max-w-6xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="mb-10">
            <motion.span variants={fadeUp} className="section-label block mb-3">{t('about.sectionLabel')}</motion.span>
            <motion.h2 variants={fadeUp} className="text-section-heading" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
              {t('about.title')}
            </motion.h2>
          </motion.div>

          <div className="grid lg:grid-cols-[1fr_minmax(280px,360px)] gap-10 lg:gap-14 items-start">
            {/* Left: bio + social proof stats */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
              <motion.p variants={fadeUp} className="text-base leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
                {t('about.bio1').split('{university}').map((part, i) =>
                  i === 0 ? part : (
                    <span key={i}><strong style={{ color: 'var(--text-primary)' }}>HUTECH</strong>{part}</span>
                  )
                )}
              </motion.p>
              <motion.p variants={fadeUp} className="text-base leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
                {t('about.bio2')
                  .split(/\{cinema\}|\{ai\}/)
                  .map((part, i) => {
                    if (i === 1) return <span key={i}><strong style={{ color: 'var(--text-primary)' }}>{t('about.cinema')}</strong>{part}</span>;
                    if (i === 2) return <span key={i}><strong style={{ color: 'var(--text-primary)' }}>{t('about.ai')}</strong>{part}</span>;
                    return part;
                  })
                }
              </motion.p>

              {/* Mini stats — social proof */}
              <motion.div variants={fadeUp} className="grid grid-cols-3 gap-3 mb-6">
                {[
                  { value: '3.33', label: t('about.stats.gpa'), sub: t('about.stats.gpaSub') },
                  { value: String(projects.length), label: t('about.stats.projects'), sub: t('about.stats.projectsSub') },
                  { value: String(certificates.length), label: t('about.stats.certificates'), sub: t('about.stats.certificatesSub') },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl px-3 py-3 text-center"
                    style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
                  >
                    <p style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.35rem', color: 'var(--accent)', lineHeight: 1.1 }}>
                      {stat.value}
                    </p>
                    <p style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-primary)', marginTop: '0.25rem' }}>
                      {stat.label}
                    </p>
                    <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '0.15rem', lineHeight: 1.3 }}>
                      {stat.sub}
                    </p>
                  </div>
                ))}
              </motion.div>

              {/* Project anchors — visual tie to bio mentions */}
              <motion.div variants={fadeUp} className="flex flex-wrap gap-2">
                {projects.filter((p) => p.featured).map((p) => (
                  <Link
                    key={p.id}
                    href={`/projects/${p.slug}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors"
                    style={{ background: 'var(--bg-base)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}
                  >
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--success)' }} />
                    {p.title}
                  </Link>
                ))}
              </motion.div>
            </motion.div>

            {/* Right: avatar + cert preview + compelling CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-4"
            >
              {/* Visual anchor */}
              <div
                className="rounded-2xl overflow-hidden"
                style={{ border: '1px solid var(--border)', boxShadow: '0 16px 48px rgba(26,58,92,0.1)' }}
              >
                {/* Image container */}
                <div className="aspect-[4/3] relative">
                  <img
                    src={profile.avatar_about}
                    alt={profile.full_name}
                    className="w-full h-full object-cover object-center"
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(to top, rgba(15,28,46,0.55) 0%, transparent 50%)' }}
                  />
                </div>
                
                {/* Certificate thumb strip — below image */}
                <div className="px-4 py-3 flex items-center gap-2" style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)' }}>
                  {certificates.slice(0, 3).map((cert) => (
                    <div
                      key={cert.id}
                      className="rounded-md overflow-hidden flex-1"
                      style={{
                        border: '1px solid var(--border)',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                        aspectRatio: '4/3',
                        background: 'var(--surface)',
                      }}
                    >
                      <img src={cert.image_url} alt={cert.name} title={cert.name} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Full profile CTA with preview */}
              <div
                className="card p-5 flex flex-col gap-4"
                style={{ background: 'var(--surface)' }}
              >
                <div>
                  <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                    {t('about.profilePreviewTitle')}
                  </p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                    {t('about.profilePreviewDesc')}
                  </p>
                </div>
                <ul className="flex flex-col gap-2.5 list-none m-0 p-0">
                  {[
                    { icon: Award, text: t('about.profilePreviewCerts', { count: String(certificates.length) }) },
                    { icon: Heart, text: t('about.profilePreviewActivities') },
                    { icon: GraduationCap, text: t('about.profilePreviewEducation') },
                  ].map(({ icon: Icon, text }) => (
                    <li key={text} className="flex items-center gap-2.5 text-sm" style={{ color: 'var(--text-secondary)' }}>
                      <span
                        className="flex items-center justify-center shrink-0 rounded-lg"
                        style={{ width: 28, height: 28, background: 'var(--accent-light)', border: '1px solid var(--accent-border)' }}
                      >
                        <Icon size={14} style={{ color: 'var(--accent)' }} />
                      </span>
                      {text}
                    </li>
                  ))}
                </ul>
                <Link href="/about" className="btn btn-primary w-full justify-center text-sm">
                  {t('about.fullProfile')} <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          CONTACT SECTION
      ═══════════════════════════════════════ */}
      <section id="contact" className="section-gap" style={{ background: 'var(--bg-subtle)', borderTop: '1px solid var(--border)' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
              <motion.span variants={fadeUp} className="section-label block mb-3">{t('contact.sectionLabel')}</motion.span>
              <motion.h2 variants={fadeUp} className="text-section-heading mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
                {t('contact.title')}
              </motion.h2>
              <motion.p variants={fadeUp} className="text-base leading-relaxed mb-8" style={{ color: 'var(--text-secondary)' }}>
                {t('contact.description', { role: t('contact.role') })}
              </motion.p>
              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href={`mailto:${profile.email}`} className="btn btn-primary" style={{ fontSize: '0.95rem', padding: '0.75rem 1.75rem' }}>
                  <Mail size={17} /> {t('contact.sendEmail')}
                </a>
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ fontSize: '0.95rem', padding: '0.75rem 1.75rem' }}>
                  <Linkedin size={17} /> {t('contact.messageLinkedIn')}
                </a>
              </motion.div>

              <motion.div variants={fadeUp} className="flex items-center justify-center gap-5 mt-10 pt-8"
                style={{ borderTop: '1px solid var(--border)' }}>
                {[
                  { icon: Github, href: profile.github, label: 'GitHub' },
                  { icon: Linkedin, href: profile.linkedin, label: 'LinkedIn' },
                  { icon: Mail, href: `mailto:${profile.email}`, label: 'Email' },
                ].map(social => {
                  const Icon = social.icon;
                  return (
                    <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer"
                      className="flex flex-col items-center gap-1.5 group" style={{ color: 'var(--text-muted)' }}>
                      <div className="p-3 rounded-xl transition-all"
                        style={{ border: '1px solid var(--border)', background: 'var(--surface)' }}
                        onMouseEnter={e => {
                          (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent-mid)';
                          (e.currentTarget as HTMLElement).style.color = 'var(--accent-mid)';
                        }}
                        onMouseLeave={e => {
                          (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
                          (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)';
                        }}>
                        <Icon size={18} />
                      </div>
                      <span style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)' }}>{social.label}</span>
                    </a>
                  );
                })}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FOOTER
      ═══════════════════════════════════════ */}
      <footer className="py-8" style={{ borderTop: '1px solid var(--border)', background: 'var(--bg-subtle)' }}>
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
            © 2025{' '}
            <em style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', color: 'var(--text-secondary)' }}>
              {profile.full_name}
            </em>
            {'. '}{t('footer.builtWith')}
          </p>
          <div className="flex items-center gap-5">
            {[
              { label: t('nav.projects'), href: '/projects' },
              { label: t('nav.about'), href: '/about' },
            ].map(link => (
              <Link key={link.label} href={link.href} className="link-hover"
                style={{ fontSize: '0.78rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </footer>

      {/* ── SCROLL TO TOP ── */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 p-3 rounded-xl z-40"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}
          >
            <ArrowUp size={18} />
          </motion.button>
        )}
      </AnimatePresence>

    </main>
  );
}
