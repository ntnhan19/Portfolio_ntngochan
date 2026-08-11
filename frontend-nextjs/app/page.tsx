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
  Award, GraduationCap, Heart, Briefcase
} from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePortfolioTheme } from '@/src/hooks/usePortfolioTheme';
import { useRecruiterMode } from '@/src/context/RecruiterModeContext';

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
  const { t, locale } = useLocale();
  const { isRecruiterMode, toggleRecruiterMode } = useRecruiterMode();
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
            style={{ fontFamily: 'var(--font-display)', fontWeight: 800, color: 'var(--text-primary)', fontSize: '1.2rem', letterSpacing: '-0.02em' }}
          >
            {profile.navbar_brand}
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
            <button
              onClick={toggleRecruiterMode}
              className="p-2 rounded-md transition-all flex items-center gap-1.5"
              style={{
                color: isRecruiterMode ? 'var(--bg-base)' : 'var(--text-secondary)',
                background: isRecruiterMode ? 'var(--text-primary)' : 'transparent',
                fontSize: '0.8rem', fontWeight: 600
              }}
              title="Toggle Recruiter View"
            >
              <Briefcase size={16} />
              <span className="hidden md:inline">{isRecruiterMode ? 'Recruiter View' : 'Recruiter View'}</span>
            </button>
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
                <span className="inline-flex items-center gap-2 px-3 py-1 text-[0.65rem] uppercase font-bold"
                  style={{ background: 'var(--surface-raised)', color: 'var(--text-secondary)', fontFamily: 'var(--font-body)', letterSpacing: '0.2em' }}>
                  <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--success)', display: 'inline-block', opacity: 0.8 }} />
                  {t('hero.status')}
                </span>
              </motion.div>

              {/* Greeting + Name */}
              <motion.div variants={fadeUp} custom={0.05} className="flex flex-col gap-2">
                <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                  {t('hero.greeting')}
                </p>
                <h1 className="text-hero" style={{ color: 'var(--text-primary)' }}>
                  {locale === 'vi' ? profile.display_name_vi : profile.display_name_en}
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
                <div className="relative flex flex-col items-center md:items-end">
                  <div className="relative overflow-visible w-full aspect-[4/5] max-h-[500px] rounded-2xl border border-slate-200 dark:border-slate-800"
                    style={{ background: 'var(--surface-raised)' }}>
                    <img
                      src={profile.avatar_hero}
                      alt={profile.full_name}
                      className="w-full h-full object-cover object-center rounded-2xl"
                    />
                    {/* Floating status text overlapping bottom edge */}
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-white/80 dark:bg-black/50 backdrop-blur-md px-4 py-1.5 rounded-full shadow-md border border-black/5 dark:border-white/10 whitespace-nowrap">
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--success)', display: 'inline-block' }} className="animate-pulse" />
                      <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-body)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                        {t('hero.openToWork')}
                      </span>
                    </div>
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
      <section id="projects" className="section-gap" style={{ background: 'var(--bg-subtle)' }}>
        <div className="max-w-6xl mx-auto px-6">

          {/* Header */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={stagger} className="mb-12">
            <motion.span variants={fadeUp} className="section-label block mb-3">{t('projects.sectionLabel')}</motion.span>
            <motion.h2 variants={fadeUp} className="text-section-heading" style={{ color: 'var(--text-primary)' }}>
              {t('projects.title')}
            </motion.h2>
          </motion.div>

          {/* Card grid — 2 columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-24 lg:gap-x-12 lg:gap-y-32">
            {projects.map((project, idx) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={idx}
                variant={idx === 0 ? "featured" : "default"}
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
      <section id="skills" className="section-gap" style={{ background: 'var(--bg-base)' }}>
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
          {!isRecruiterMode && (
            <>
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
                className="mt-5 p-5 rounded-xl flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border)' }}
              >
                <div className="flex flex-col md:flex-row md:items-start gap-4 flex-1 min-w-0">
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
                <Link href="/about#skills" className="btn btn-secondary text-sm shrink-0 self-start md:self-center">
                  {t('skills.viewFullBreakdown')} <ArrowRight size={14} />
                </Link>
              </motion.div>

              {/* Currently learning - Infinite Marquee */}
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                className="mt-8 py-4 rounded-xl overflow-hidden relative flex items-center"
                style={{ background: 'var(--accent-light)', border: '1px solid var(--accent-border)' }}>
                <div className="absolute left-0 top-0 bottom-0 w-12 z-10" style={{ background: 'linear-gradient(to right, var(--accent-light), transparent)' }} />
                <div className="absolute right-0 top-0 bottom-0 w-12 z-10" style={{ background: 'linear-gradient(to left, var(--accent-light), transparent)' }} />
                
                <span className="shrink-0 z-20 px-4 py-1.5 rounded-r-lg font-mono text-xs font-bold uppercase tracking-widest" style={{ background: 'var(--accent)', color: 'var(--bg-base)' }}>
                  {t('skills.currentlyLearning')}
                </span>
                
                {/* Marquee Content */}
                <div className="flex flex-1 overflow-hidden">
                  <motion.div 
                    className="flex whitespace-nowrap items-center gap-6 px-6"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    {[...['NestJS', 'Microservices Architecture', 'Docker Compose', 'System Design', 'React Native'], ...['NestJS', 'Microservices Architecture', 'Docker Compose', 'System Design', 'React Native']].map((item, i) => (
                      <span key={i} className="font-semibold text-sm" style={{ color: 'var(--accent-mid)' }}>
                        • {item}
                      </span>
                    ))}
                  </motion.div>
                </div>
              </motion.div>
            </>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════
          ABOUT SECTION
      ═══════════════════════════════════════ */}
      {!isRecruiterMode && (
        <section id="about" className="section-gap" style={{ background: 'var(--bg-subtle)' }}>
          <div className="max-w-6xl mx-auto px-6">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="mb-10">
              <motion.span variants={fadeUp} className="section-label block mb-3">{t('about.sectionLabel')}</motion.span>
              <motion.h2 variants={fadeUp} className="text-section-heading" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
                {t('about.title')}
              </motion.h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 items-stretch auto-rows-fr">
              {/* Box 1: Bio */}
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} 
                className="card col-span-1 md:col-span-2 lg:col-span-2 lg:row-span-2 p-6 lg:p-8 flex flex-col justify-center h-full relative"
              >
                {/* Subtle watermark background */}
                <div className="absolute -right-20 -top-20 opacity-[0.03] pointer-events-none">
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '20rem', fontWeight: 900 }}>&quot;</span>
                </div>
                
                <motion.div variants={fadeUp} className="text-lg md:text-xl font-medium leading-relaxed mb-6 z-10" style={{ color: 'var(--text-primary)' }}>
                  {(() => {
                    const bio1 = t('about.bio1');
                    const firstLetter = bio1.charAt(0);
                    const rest = bio1.slice(1);
                    return (
                      <>
                        <span className="float-left text-[4.5rem] md:text-[5.5rem] font-bold leading-[0.8] pr-3 pt-2" style={{ fontFamily: 'var(--font-serif)', color: 'var(--accent)' }}>
                          {firstLetter}
                        </span>
                        {rest.split('{university}').map((part, i) =>
                          i === 0 ? part : (
                            <span key={i}><strong style={{ color: 'var(--accent-mid)' }}>HUTECH</strong>{part}</span>
                          )
                        )}
                      </>
                    );
                  })()}
                </motion.div>

                <motion.div variants={fadeUp} className="relative pl-5 py-1 mb-8 border-l-4 z-10" style={{ borderColor: 'var(--accent-mid)' }}>
                  <p className="text-[1.05rem] md:text-[1.15rem] italic leading-relaxed" style={{ fontFamily: 'var(--font-serif)', color: 'var(--text-secondary)' }}>
                    {t('about.bio2')
                      .split(/\{cinema\}|\{ai\}/)
                      .map((part, i) => {
                        if (i === 1) return <span key={i}><strong style={{ color: 'var(--text-primary)', fontStyle: 'normal' }}>{t('about.cinema')}</strong>{part}</span>;
                        if (i === 2) return <span key={i}><strong style={{ color: 'var(--text-primary)', fontStyle: 'normal' }}>{t('about.ai')}</strong>{part}</span>;
                        return part;
                      })
                    }
                  </p>
                </motion.div>
                
                {/* Project anchors */}
                <motion.div variants={fadeUp} className="flex flex-wrap gap-2 mt-auto z-10">
                  {projects.filter((p) => p.featured).map((p) => (
                    <Link
                      key={p.id}
                      href={`/projects/${p.slug}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
                      style={{ background: 'var(--bg-base)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}
                    >
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--success)' }} />
                      {p.title}
                    </Link>
                  ))}
                </motion.div>
              </motion.div>

              {/* Box 2: Stats - GPA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                className="card col-span-1 lg:col-span-1 lg:row-span-1 p-5 flex flex-col justify-center relative group"
              >
                <GraduationCap className="absolute -right-4 -bottom-4 w-24 h-24 text-slate-500 opacity-5 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-12" />
                <div className="relative z-10">
                  <p style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '2.5rem', color: 'var(--accent)', lineHeight: 1 }}>3.33</p>
                  <p style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', marginTop: '0.5rem' }}>{t('about.stats.gpa')}</p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>{t('about.stats.gpaSub')}</p>
                </div>
              </motion.div>

              {/* Box 3: Stats - Projects */}
              <motion.div
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
                className="card col-span-1 lg:col-span-1 lg:row-span-1 p-5 flex flex-col justify-center relative group"
              >
                <Zap className="absolute -right-4 -bottom-4 w-24 h-24 text-slate-500 opacity-5 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-12" />
                <div className="relative z-10">
                  <p style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '2.5rem', color: 'var(--accent)', lineHeight: 1 }}>{projects.length}</p>
                  <p style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', marginTop: '0.5rem' }}>{t('about.stats.projects')}</p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>{t('about.stats.projectsSub')}</p>
                </div>
              </motion.div>

              {/* Box 4: Avatar Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}
                className="card col-span-1 md:col-span-2 lg:col-span-1 lg:row-span-1 h-full min-h-[250px] relative group"
              >
                <img
                  src={profile.avatar_about}
                  alt={profile.full_name}
                  className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80" />
                <div className="absolute bottom-4 left-4 right-4">
                  <Link href="/about" className="btn btn-primary w-full justify-center text-sm shadow-xl backdrop-blur-md bg-white/90 text-slate-900 border-none hover:bg-white">
                    {t('about.fullProfile')} <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.div>

              {/* Box 5: Stats - Certificates */}
              <motion.div
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
                className="card col-span-1 lg:col-span-1 lg:row-span-1 p-5 flex flex-col justify-center relative group"
              >
                <Award className="absolute -right-4 -bottom-4 w-24 h-24 text-slate-500 opacity-5 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-12" />
                <div className="relative z-10">
                  <p style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '2.5rem', color: 'var(--accent)', lineHeight: 1 }}>{certificates.length}</p>
                  <p style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', marginTop: '0.5rem' }}>{t('about.stats.certificates')}</p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>{t('about.stats.certificatesSub')}</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════
          CONTACT & FOOTER (MERGED)
      ═══════════════════════════════════════ */}
      <section id="contact" className="py-20 relative overflow-hidden text-stone-50 bg-[#111827]">

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="flex flex-col items-center">
            <motion.h2 variants={fadeUp} className="text-4xl md:text-6xl font-black tracking-tight mb-6">
              {t('contact.title')}
            </motion.h2>
            <motion.p variants={fadeUp} className="text-lg md:text-xl opacity-80 mb-10 max-w-2xl">
              {t('contact.description', { role: t('contact.role') })}
            </motion.p>
            
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 mb-16">
              <a href={`mailto:${profile.email}`} className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold transition-transform hover:-translate-y-1 bg-white text-stone-900">
                <Mail size={18} /> {t('contact.sendEmail')}
              </a>
            </motion.div>

            {/* Enlarged Social Icons */}
            <motion.div variants={fadeUp} className="flex gap-6 mb-16">
              {[
                { icon: Github, href: profile.github, label: 'GitHub' },
                { icon: Linkedin, href: profile.linkedin, label: 'LinkedIn' },
              ].map(social => (
                <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer"
                  className="p-5 rounded-full border border-slate-700 hover:bg-slate-800 transition-all hover:-translate-y-1 group"
                  aria-label={social.label}>
                  <social.icon size={24} className="opacity-70 group-hover:opacity-100 transition-opacity" />
                </a>
              ))}
            </motion.div>

            {/* Footer Bottom */}
            <motion.div variants={fadeUp} className="w-full pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm opacity-60">
              <p>
                © 2025 <span className="font-semibold">{profile.full_name}</span>. {t('footer.builtWith')}
              </p>
              <div className="flex gap-6">
                <Link href="/projects" className="hover:text-white transition-colors">{t('nav.projects')}</Link>
                <Link href="/about" className="hover:text-white transition-colors">{t('nav.about')}</Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

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
