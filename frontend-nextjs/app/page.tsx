'use client';

import { profile, projects, certificates } from '@/data';
import {
  Mail, Github, Linkedin, ArrowUp, Menu, X,
  ExternalLink, ChevronRight, ArrowRight,
  Database, Server, Zap, Globe, MapPin
} from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect } from 'react';

/* ─── ANIMATION VARIANTS ──────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: (delay = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as any, delay }
  })
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
};

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

/* ─── SKILLS ──────────────────────────────────────────── */
const skillGroups = [
  {
    icon: Globe,
    title: 'Frontend',
    colorHex: '#2563a8',
    skills: ['React.js', 'Next.js (App Router)', 'TypeScript', 'TailwindCSS', 'Framer Motion'],
  },
  {
    icon: Server,
    title: 'Backend',
    colorHex: '#16a34a',
    skills: ['Node.js', 'Express.js', 'RESTful APIs', 'Socket.io', 'Python / FastAPI'],
  },
  {
    icon: Database,
    title: 'Database',
    colorHex: '#d97706',
    skills: ['PostgreSQL', 'Prisma ORM', 'SQL Server', 'Redis'],
  },
  {
    icon: Zap,
    title: 'AI & Tools',
    colorHex: '#7c3aed',
    skills: ['LangChain', 'RAG Pipeline', 'Pinecone', 'Google Gemini', 'Docker', 'Git'],
  },
];

export default function Portfolio() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

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

          <div className="flex items-center gap-3">
            <a href={`mailto:${profile.email}`} className="hidden md:inline-flex btn btn-primary text-sm">
              Hire me
            </a>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 rounded-md" style={{ color: 'var(--text-secondary)' }}>
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
                <a href={`mailto:${profile.email}`} className="btn btn-primary mt-3 justify-center">Hire me</a>
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
                  Available for internship
                </span>
              </motion.div>

              {/* Greeting + Name */}
              <motion.div variants={fadeUp} custom={0.05} className="flex flex-col gap-2">
                <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                  Hi, I'm
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
                  Full-Stack Developer
                </p>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <MapPin size={13} />
                  HUTECH University · Binh Thanh Distric, Ho Chi Minh City
                </p>
              </motion.div>

              {/* Description */}
              <motion.div variants={fadeUp} custom={0.15}>
                <p style={{ fontSize: '1rem', lineHeight: 1.75, color: 'var(--text-secondary)', maxWidth: '520px' }}>
                  4th-year Software Engineering student building production-grade web apps — real-time systems, AI-powered tools, and clean REST APIs.
                </p>
              </motion.div>

              {/* CTAs */}
              <motion.div variants={fadeUp} custom={0.2} className="flex flex-wrap gap-3 pt-1">
                <button onClick={() => scrollTo('#projects')} className="btn btn-primary" style={{ padding: '0.7rem 1.5rem', fontSize: '0.9rem' }}>
                  View Projects <ArrowRight size={15} />
                </button>
                <a href={`mailto:${profile.email}`} className="btn btn-secondary" style={{ padding: '0.7rem 1.5rem', fontSize: '0.9rem' }}>
                  <Mail size={15} /> Get in touch
                </a>
                <a href={profile.github} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ padding: '0.7rem 0.9rem' }}>
                  <Github size={16} />
                </a>
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ padding: '0.7rem 0.9rem' }}>
                  <Linkedin size={16} />
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
                    src={profile.avatar}
                    alt={profile.full_name}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                {/* Floating status badge */}
                <div className="absolute -bottom-3 -left-3 px-3 py-2 rounded-xl flex items-center gap-2"
                  style={{ background: 'var(--surface)', border: '1px solid var(--border)', boxShadow: '0 4px 16px rgba(26,58,92,0.1)' }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--success)', display: 'inline-block', animation: 'blink 1.5s ease infinite' }} />
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
                    open_to_work
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
                <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
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
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={stagger} className="mb-12">
            <motion.span variants={fadeUp} className="section-label block mb-3">02. Selected Work</motion.span>
            <motion.h2 variants={fadeUp} className="text-section-heading" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
              Projects
            </motion.h2>
          </motion.div>

          <div className="flex flex-col gap-0">
            {projects.map((project, idx) => (
              <motion.div key={project.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="group grid grid-cols-[3rem_1fr_auto] gap-6 items-start py-7 px-2 rounded-xl transition-all"
                  style={{ borderTop: '1px solid var(--border)' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--surface-hover)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}>

                  <Link href={`/projects/${project.id}`} className="contents">
                    <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', color: 'var(--text-muted)', fontSize: '1.1rem', paddingTop: '0.1rem' }}>
                      {String(idx + 1).padStart(2, '0')}
                    </span>

                    <div className="cursor-pointer">
                      <h3 className="font-bold text-xl mb-2 transition-colors group-hover:text-[var(--accent-mid)]"
                        style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
                        {project.title}
                      </h3>
                      <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--text-secondary)' }}>
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {project.tech_stack.split(',').slice(0, 5).map(t => (
                          <span key={t} className="badge">{t.trim()}</span>
                        ))}
                        {project.tech_stack.split(',').length > 5 && (
                          <span className="badge">+{project.tech_stack.split(',').length - 5}</span>
                        )}
                      </div>
                    </div>
                  </Link>

                  <div className="flex flex-col gap-2 pt-1 items-end">
                    {project.repo_url && (
                      <a href={project.repo_url} target="_blank" rel="noopener noreferrer"
                        className="link-hover text-sm flex items-center gap-1">
                        <Github size={14} /> GitHub
                      </a>
                    )}
                    {project.demo_url && (
                      <a href={project.demo_url} target="_blank" rel="noopener noreferrer"
                        className="link-hover text-sm flex items-center gap-1">
                        <ExternalLink size={14} /> Demo
                      </a>
                    )}
                    <Link href={`/projects/${project.id}`} className="text-sm flex items-center gap-1 mt-1"
                      style={{ color: 'var(--accent-mid)', fontFamily: 'var(--font-mono)', fontSize: '0.78rem' }}>
                      Details <ChevronRight size={13} />
                    </Link>
                  </div>
                </div>
                {idx === projects.length - 1 && (
                  <div style={{ borderTop: '1px solid var(--border)' }} />
                )}
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-10 text-center">
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
              <Github size={16} /> View all on GitHub <ExternalLink size={14} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SKILLS SECTION
      ═══════════════════════════════════════ */}
      <section id="skills" className="section-gap" style={{ background: 'var(--bg-base)', borderTop: '1px solid var(--border)' }}>
        <div className="max-w-6xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={stagger} className="mb-12">
            <motion.span variants={fadeUp} className="section-label block mb-3">03. Expertise</motion.span>
            <motion.h2 variants={fadeUp} className="text-section-heading" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
              Technical Skills
            </motion.h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {skillGroups.map((group, idx) => {
              const Icon = group.icon;
              return (
                <motion.div key={group.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="card p-6 flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg" style={{ background: `${group.colorHex}18`, border: `1px solid ${group.colorHex}30` }}>
                      <Icon size={18} style={{ color: group.colorHex }} />
                    </div>
                    <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                      {group.title}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    {group.skills.map(skill => (
                      <div key={skill} className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                        <span style={{ width: 4, height: 4, borderRadius: '50%', background: group.colorHex, flexShrink: 0 }} />
                        {skill}
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Currently learning */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="mt-8 p-5 rounded-xl flex flex-wrap items-center gap-3"
            style={{ background: 'var(--accent-light)', border: '1px solid var(--accent-border)' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--accent)' }}>
              // currently_learning
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
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
              <motion.span variants={fadeUp} className="section-label block mb-3">04. About</motion.span>
              <motion.h2 variants={fadeUp} className="text-section-heading mb-6" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
                About Me
              </motion.h2>
              <motion.p variants={fadeUp} className="text-base leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
                I'm a 4th-year Software Engineering student at{' '}
                <strong style={{ color: 'var(--text-primary)' }}>HUTECH</strong>{' '}
                with a GPA of 3.30/4.0, building full-stack web applications using the PERN stack.
              </motion.p>
              <motion.p variants={fadeUp} className="text-base leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
                My recent work includes a{' '}
                <strong style={{ color: 'var(--text-primary)' }}>real-time cinema booking system</strong>{' '}
                with Redis distributed locking, and an{' '}
                <strong style={{ color: 'var(--text-primary)' }}>AI-powered document assistant</strong>{' '}
                using RAG pipeline with LangChain & Pinecone.
              </motion.p>
              <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
                <Link href="/about" className="btn btn-secondary text-sm">
                  Full profile <ArrowRight size={14} />
                </Link>
                <Link href="/resume" className="btn btn-primary text-sm">
                  View Resume
                </Link>
              </motion.div>
            </motion.div>

            {/* Stats grid */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.55 }} className="grid grid-cols-2 gap-4">
              {[
                { label: 'Projects Built', value: projects.length + '+', sub: 'Full-stack applications' },
                { label: 'Certificates', value: certificates.length, sub: 'Professional & academic' },
                { label: 'GPA', value: '3.30', sub: 'Out of 4.0' },
                { label: 'Stack', value: 'PERN', sub: 'PostgreSQL · Express · React · Node' },
              ].map(stat => (
                <div key={stat.label} className="card p-6 flex flex-col gap-1">
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 700, color: 'var(--accent)', lineHeight: 1 }}>
                    {stat.value}
                  </span>
                  <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)' }}>{stat.label}</span>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>{stat.sub}</span>
                </div>
              ))}
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
              <motion.span variants={fadeUp} className="section-label block mb-3">05. Contact</motion.span>
              <motion.h2 variants={fadeUp} className="text-section-heading mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
                Let's work together
              </motion.h2>
              <motion.p variants={fadeUp} className="text-base leading-relaxed mb-8" style={{ color: 'var(--text-secondary)' }}>
                I'm actively looking for a{' '}
                <strong style={{ color: 'var(--text-primary)' }}>Full-Stack / Backend Developer Internship</strong>.
                Have an opportunity? I'd love to hear from you.
              </motion.p>
              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href={`mailto:${profile.email}`} className="btn btn-primary" style={{ fontSize: '0.95rem', padding: '0.75rem 1.75rem' }}>
                  <Mail size={17} /> Send me an email
                </a>
                <Link href="/contact" className="btn btn-secondary" style={{ fontSize: '0.95rem', padding: '0.75rem 1.75rem' }}>
                  Contact form
                </Link>
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
      <footer className="py-8" style={{ borderTop: '1px solid var(--border)', background: 'var(--accent)' }}>
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-mono)' }}>
            © 2025{' '}
            <em style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', color: 'rgba(255,255,255,0.8)' }}>
              {profile.full_name}
            </em>
            . Built with Next.js & Tailwind.
          </p>
          <div className="flex items-center gap-5">
            {[
              { label: 'Projects', href: '/projects' },
              { label: 'About', href: '/about' },
              { label: 'Resume', href: '/resume' },
            ].map(link => (
              <Link key={link.label} href={link.href} className="link-hover"
                style={{ fontSize: '0.78rem', fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.45)' }}>
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
