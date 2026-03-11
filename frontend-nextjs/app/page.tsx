'use client';

import { profile, blogPosts, projects, certificates } from '../src/data/staticData';
import {
  Mail, Github, Linkedin, ArrowUp, Menu, X,
  ExternalLink, ChevronRight, ArrowRight,
  Code2, Database, Server, Zap, Globe
} from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';

/* ─── FADE-UP VARIANT ─────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as any, delay }
  })
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
};

/* ─── TECH STACK DATA ─────────────────────── */
const techStack = [
  { label: 'React.js', color: '#61DAFB' },
  { label: 'Next.js', color: '#fff' },
  { label: 'Node.js', color: '#68A063' },
  { label: 'Express.js', color: '#9999b0' },
  { label: 'PostgreSQL', color: '#336791' },
  { label: 'TypeScript', color: '#3178C6' },
  { label: 'Socket.io', color: '#fff' },
  { label: 'Prisma', color: '#5A67D8' },
  { label: 'TailwindCSS', color: '#38BDF8' },
  { label: 'Python', color: '#F7C948' },
];

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Blog', href: '#blog' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

/* ─── SKILLS DATA ────────────────────────── */
const skillGroups = [
  {
    icon: Globe,
    title: 'Frontend',
    color: '#61DAFB',
    skills: ['React.js', 'Next.js (App Router)', 'TypeScript', 'TailwindCSS', 'Framer Motion'],
  },
  {
    icon: Server,
    title: 'Backend',
    color: '#68A063',
    skills: ['Node.js', 'Express.js', 'RESTful APIs', 'Socket.io', 'Python / FastAPI'],
  },
  {
    icon: Database,
    title: 'Database',
    color: '#336791',
    skills: ['PostgreSQL', 'Prisma ORM', 'SQL Server', 'Redis (caching & locking)'],
  },
  {
    icon: Zap,
    title: 'AI & Tools',
    color: '#F7C948',
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
    <main className="noise-overlay" style={{ background: 'var(--bg-base)', color: 'var(--text-primary)', minHeight: '100vh' }}>

      {/* ── SCROLL PROGRESS ── */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-[60] h-[2px]"
        style={{
          scaleX,
          transformOrigin: '0%',
          background: 'linear-gradient(90deg, #6ee7b7, #60a5fa)',
        }}
      />

      {/* ═══════════════════════════════════════
          NAVBAR
      ═══════════════════════════════════════ */}
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: isScrolled
            ? 'rgba(10,10,15,0.85)'
            : 'transparent',
          backdropFilter: isScrolled ? 'blur(16px)' : 'none',
          borderBottom: isScrolled ? '1px solid rgba(255,255,255,0.07)' : 'none',
        }}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">

          {/* Logo */}
          <button
            onClick={() => scrollTo('#home')}
            className="font-display font-bold text-base tracking-tight"
            style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}
          >
            <span style={{ color: 'var(--accent-primary)' }}>{'<'}</span>
            {profile.full_name.split(' ').slice(-1)[0]}
            <span style={{ color: 'var(--accent-primary)' }}>{' />'}</span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                className="px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-150"
                style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}
                onMouseEnter={e => {
                  (e.target as HTMLElement).style.color = 'var(--text-primary)';
                  (e.target as HTMLElement).style.background = 'rgba(255,255,255,0.05)';
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

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="hidden md:inline-flex btn btn-primary text-sm"
              style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
            >
              Hire me
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-md"
              style={{ color: 'var(--text-secondary)' }}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden overflow-hidden"
              style={{ background: 'rgba(10,10,15,0.96)', borderTop: '1px solid var(--border-subtle)' }}
            >
              <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-1">
                {navLinks.map(link => (
                  <button
                    key={link.label}
                    onClick={() => scrollTo(link.href)}
                    className="text-left py-2.5 px-3 rounded-md text-sm font-medium transition-colors"
                    style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}
                  >
                    {link.label}
                  </button>
                ))}
                <a
                  href={`mailto:${profile.email}`}
                  className="btn btn-primary mt-3 justify-center"
                >
                  Hire me
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ═══════════════════════════════════════
          HERO SECTION
      ═══════════════════════════════════════ */}
      <section
        id="home"
        className="relative min-h-screen flex flex-col justify-center grid-pattern"
        style={{ paddingTop: '6rem', paddingBottom: '4rem' }}
      >
        {/* Ambient glow */}
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{
            width: '600px', height: '400px',
            background: 'radial-gradient(ellipse, rgba(110,231,183,0.07) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
          <div className="grid lg:grid-cols-[1fr_380px] gap-16 items-center">

            {/* ── LEFT COLUMN ── */}
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-6"
            >
              {/* Status badge */}
              <motion.div variants={fadeUp} custom={0}>
                <span
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium"
                  style={{
                    background: 'rgba(110,231,183,0.1)',
                    border: '1px solid rgba(110,231,183,0.25)',
                    color: 'var(--accent-primary)',
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  <span
                    style={{
                      width: 7, height: 7, borderRadius: '50%', background: '#6ee7b7',
                      boxShadow: '0 0 6px #6ee7b7', animation: 'blink 1.5s ease infinite'
                    }}
                  />
                  Open to internship opportunities
                </span>
              </motion.div>

              {/* Name */}
              <motion.div variants={fadeUp} custom={0.05}>
                <h1 className="text-hero" style={{ fontFamily: 'var(--font-display)' }}>
                  {profile.full_name.split(' ').slice(0, -1).join(' ')}{' '}
                  <span
                    className="text-shimmer"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {profile.full_name.split(' ').slice(-1)[0]}
                  </span>
                </h1>
              </motion.div>

              {/* Subtitle */}
              <motion.div variants={fadeUp} custom={0.1}>
                <p
                  className="text-xl font-medium"
                  style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}
                >
                  Full-Stack Developer
                  <span style={{ color: 'var(--border-medium)', margin: '0 0.5rem' }}>·</span>
                  <span style={{ color: 'var(--accent-primary)' }}>PERN Stack</span>
                </p>
              </motion.div>

              {/* Description */}
              <motion.div variants={fadeUp} custom={0.15}>
                <p
                  className="text-base leading-relaxed max-w-xl"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  4th-year Software Engineering student at HUTECH, building real-world web applications
                  with PostgreSQL, Express.js, React.js & Node.js.
                  Passionate about clean APIs, real-time systems, and AI-powered tools.
                </p>
              </motion.div>

              {/* Tech pills */}
              <motion.div variants={fadeUp} custom={0.2} className="flex flex-wrap gap-2">
                {techStack.map(tech => (
                  <span
                    key={tech.label}
                    className="badge"
                    style={{ borderColor: `${tech.color}30`, color: tech.color }}
                  >
                    {tech.label}
                  </span>
                ))}
              </motion.div>

              {/* CTAs */}
              <motion.div variants={fadeUp} custom={0.25} className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={() => scrollTo('#projects')}
                  className="btn btn-primary"
                >
                  View Projects
                  <ArrowRight size={16} />
                </button>
                <button
                  onClick={() => scrollTo('#contact')}
                  className="btn btn-secondary"
                >
                  Contact Me
                  <Mail size={16} />
                </button>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                >
                  <Github size={16} />
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                >
                  <Linkedin size={16} />
                </a>
              </motion.div>

              {/* Meta row */}
              <motion.div
                variants={fadeUp}
                custom={0.3}
                className="flex flex-wrap items-center gap-4 text-sm pt-2"
                style={{ color: 'var(--text-muted)' }}
              >
                <span className="flex items-center gap-1.5">
                  <MapPin size={13} />
                  Binh Thanh, Ho Chi Minh City
                </span>
                <span className="flex items-center gap-1.5">
                  <Code2 size={13} />
                  GPA 3.30 / 4.0
                </span>
              </motion.div>
            </motion.div>

            {/* ── RIGHT COLUMN: Terminal card ── */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="hidden lg:block"
            >
              <div
                className="rounded-2xl overflow-hidden"
                style={{
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-subtle)',
                  boxShadow: '0 24px 60px rgba(0,0,0,0.5)',
                }}
              >
                {/* Terminal bar */}
                <div
                  className="flex items-center gap-1.5 px-4 py-3"
                  style={{ background: 'var(--bg-elevated)', borderBottom: '1px solid var(--border-subtle)' }}
                >
                  <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#ff5f57' }} />
                  <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#febc2e' }} />
                  <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#28c840' }} />
                  <span
                    className="ml-3 text-xs"
                    style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}
                  >
                    ~/portfolio
                  </span>
                </div>

                {/* Code content */}
                <div className="p-6" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', lineHeight: '1.8' }}>
                  <div style={{ color: 'var(--text-muted)' }}>{'// about.ts'}</div>
                  <div className="mt-2">
                    <span style={{ color: '#c792ea' }}>const </span>
                    <span style={{ color: '#82aaff' }}>developer</span>
                    <span style={{ color: 'var(--text-primary)' }}> = {'{'}</span>
                  </div>
                  <div className="pl-4">
                    <span style={{ color: '#6ee7b7' }}>name</span>
                    <span style={{ color: 'var(--text-primary)' }}>: </span>
                    <span style={{ color: '#fbbf24' }}>"{profile.full_name}"</span>
                    <span style={{ color: 'var(--text-primary)' }}>,</span>
                  </div>
                  <div className="pl-4">
                    <span style={{ color: '#6ee7b7' }}>role</span>
                    <span style={{ color: 'var(--text-primary)' }}>: </span>
                    <span style={{ color: '#fbbf24' }}>"Full-Stack Intern"</span>
                    <span style={{ color: 'var(--text-primary)' }}>,</span>
                  </div>
                  <div className="pl-4">
                    <span style={{ color: '#6ee7b7' }}>stack</span>
                    <span style={{ color: 'var(--text-primary)' }}>: [</span>
                    <span style={{ color: '#fbbf24' }}>"React", "Node.js", "Postgres"</span>
                    <span style={{ color: 'var(--text-primary)' }}>],</span>
                  </div>
                  <div className="pl-4">
                    <span style={{ color: '#6ee7b7' }}>ai</span>
                    <span style={{ color: 'var(--text-primary)' }}>: [</span>
                    <span style={{ color: '#fbbf24' }}>"RAG", "LangChain"</span>
                    <span style={{ color: 'var(--text-primary)' }}>],</span>
                  </div>
                  <div className="pl-4">
                    <span style={{ color: '#6ee7b7' }}>status</span>
                    <span style={{ color: 'var(--text-primary)' }}>: </span>
                    <span style={{ color: '#6ee7b7' }}>"open_to_work"</span>
                  </div>
                  <div style={{ color: 'var(--text-primary)' }}>{'}'};</div>
                  <div className="mt-3" style={{ color: 'var(--text-muted)' }}>
                    {'>'}{' '}
                    <span style={{ color: 'var(--accent-primary)' }}>
                      Ready to ship production code 🚀
                    </span>
                    <span className="animate-blink" style={{ color: 'var(--accent-primary)' }}>▋</span>
                  </div>
                </div>

                {/* Stats footer */}
                <div
                  className="grid grid-cols-3"
                  style={{ borderTop: '1px solid var(--border-subtle)' }}
                >
                  {[
                    { label: 'Projects', value: projects.length + '+' },
                    { label: 'Blog posts', value: blogPosts.length },
                    { label: 'Certs', value: certificates.length },
                  ].map(stat => (
                    <div
                      key={stat.label}
                      className="flex flex-col items-center py-4 gap-0.5"
                      style={{ borderRight: '1px solid var(--border-subtle)' }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '1.4rem',
                          fontWeight: 700,
                          color: 'var(--accent-primary)',
                        }}
                      >
                        {stat.value}
                      </span>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Scroll hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
            style={{ color: 'var(--text-muted)' }}
          >
            <span style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}>
              SCROLL
            </span>
            <div
              style={{
                width: 1, height: 40,
                background: 'linear-gradient(to bottom, var(--text-muted), transparent)',
              }}
            />
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          PROJECTS SECTION
      ═══════════════════════════════════════ */}
      <section id="projects" className="section-gap" style={{ borderTop: '1px solid var(--border-subtle)' }}>
        <div className="max-w-6xl mx-auto px-6">

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
            className="mb-12"
          >
            <motion.span variants={fadeUp} className="section-label block mb-3">
              02. Selected Work
            </motion.span>
            <motion.h2 variants={fadeUp} className="text-section-heading" style={{ fontFamily: 'var(--font-display)' }}>
              Projects
            </motion.h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, delay: idx * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="card group overflow-hidden"
              >
                {/* Project image */}
                <div className="relative h-48 overflow-hidden" style={{ background: 'var(--bg-elevated)' }}>
                  <img
                    src={project.image_url}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={e => { (e.target as HTMLImageElement).src = 'https://placehold.co/800x400/111118/555566?text=Project'; }}
                  />
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3"
                    style={{ background: 'rgba(10,10,15,0.75)' }}
                  >
                    {project.repo_url && (
                      <a
                        href={project.repo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-secondary text-sm"
                        style={{ padding: '0.5rem 1rem' }}
                        onClick={e => e.stopPropagation()}
                      >
                        <Github size={15} /> GitHub
                      </a>
                    )}
                    {project.demo_url && (
                      <a
                        href={project.demo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary text-sm"
                        style={{ padding: '0.5rem 1rem' }}
                        onClick={e => e.stopPropagation()}
                      >
                        <ExternalLink size={15} /> Demo
                      </a>
                    )}
                  </div>
                  {/* Category label */}
                  <div className="absolute top-3 left-3">
                    <span
                      className="px-2 py-1 rounded text-xs font-medium"
                      style={{
                        background: 'rgba(10,10,15,0.8)',
                        color: 'var(--accent-primary)',
                        fontFamily: 'var(--font-mono)',
                        border: '1px solid rgba(110,231,183,0.2)',
                      }}
                    >
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Card content */}
                <div className="p-6 flex flex-col gap-3">
                  <h3 className="text-project-title" style={{ fontFamily: 'var(--font-display)' }}>
                    {project.title}
                  </h3>
                  <p className="text-sm leading-relaxed line-clamp-2" style={{ color: 'var(--text-secondary)' }}>
                    {project.description}
                  </p>

                  {/* Tech badges */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech_stack.split(',').slice(0, 5).map(t => (
                      <span key={t} className="badge">{t.trim()}</span>
                    ))}
                    {project.tech_stack.split(',').length > 5 && (
                      <span className="badge">+{project.tech_stack.split(',').length - 5}</span>
                    )}
                  </div>

                  {/* Footer row */}
                  <div className="flex items-center justify-between pt-2" style={{ borderTop: '1px solid var(--border-subtle)' }}>
                    <div className="flex items-center gap-3">
                      {project.repo_url && (
                        <a
                          href={project.repo_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link-hover text-sm flex items-center gap-1"
                        >
                          <Github size={14} /> GitHub
                        </a>
                      )}
                      {project.demo_url && (
                        <a
                          href={project.demo_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link-hover text-sm flex items-center gap-1"
                        >
                          <ExternalLink size={14} /> Demo
                        </a>
                      )}
                    </div>
                    <Link
                      href={`/projects/${project.id}`}
                      className="text-sm flex items-center gap-1 transition-all"
                      style={{ color: 'var(--accent-primary)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}
                    >
                      Case study <ChevronRight size={14} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-10 text-center"
          >
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              <Github size={16} />
              View all on GitHub
              <ExternalLink size={14} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SKILLS SECTION
      ═══════════════════════════════════════ */}
      <section
        id="skills"
        className="section-gap"
        style={{ background: 'var(--bg-surface)', borderTop: '1px solid var(--border-subtle)' }}
      >
        <div className="max-w-6xl mx-auto px-6">

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
            className="mb-12"
          >
            <motion.span variants={fadeUp} className="section-label block mb-3">
              03. Expertise
            </motion.span>
            <motion.h2 variants={fadeUp} className="text-section-heading" style={{ fontFamily: 'var(--font-display)' }}>
              Technical Skills
            </motion.h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {skillGroups.map((group, idx) => {
              const Icon = group.icon;
              return (
                <motion.div
                  key={group.title}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="card p-6 flex flex-col gap-4"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="p-2 rounded-lg"
                      style={{ background: `${group.color}15`, border: `1px solid ${group.color}25` }}
                    >
                      <Icon size={18} style={{ color: group.color }} />
                    </div>
                    <span
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 700,
                        fontSize: '0.95rem',
                      }}
                    >
                      {group.title}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    {group.skills.map(skill => (
                      <div
                        key={skill}
                        className="flex items-center gap-2 text-sm"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        <span
                          style={{ width: 5, height: 5, borderRadius: '50%', background: group.color, flexShrink: 0 }}
                        />
                        {skill}
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Currently learning row */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-8 p-5 rounded-xl flex flex-wrap items-center gap-3"
            style={{
              background: 'rgba(110,231,183,0.05)',
              border: '1px solid rgba(110,231,183,0.15)',
            }}
          >
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--accent-primary)' }}>
              // currently_learning
            </span>
            {['NestJS', 'Microservices Architecture', 'Docker Compose', 'System Design'].map(item => (
              <span key={item} className="badge" style={{ color: 'var(--accent-primary)', borderColor: 'rgba(110,231,183,0.2)' }}>
                {item}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          BLOG SECTION
      ═══════════════════════════════════════ */}
      <section id="blog" className="section-gap" style={{ borderTop: '1px solid var(--border-subtle)' }}>
        <div className="max-w-6xl mx-auto px-6">

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
            className="flex items-end justify-between mb-12 flex-wrap gap-4"
          >
            <div>
              <motion.span variants={fadeUp} className="section-label block mb-3">
                04. Writing
              </motion.span>
              <motion.h2 variants={fadeUp} className="text-section-heading" style={{ fontFamily: 'var(--font-display)' }}>
                Blog
              </motion.h2>
            </div>
            <motion.div variants={fadeUp}>
              <Link href="/blog" className="btn btn-secondary text-sm">
                All posts <ArrowRight size={14} />
              </Link>
            </motion.div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {blogPosts.slice(0, 6).map((post, idx) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
              >
                <Link
                  href={`/blog/${post.id}`}
                  className="card group flex flex-col h-full overflow-hidden block"
                >
                  <div className="h-40 overflow-hidden" style={{ background: 'var(--bg-elevated)' }}>
                    <img
                      src={post.cover_image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={e => { (e.target as HTMLImageElement).src = 'https://placehold.co/600x300/111118/555566?text=Blog'; }}
                    />
                  </div>
                  <div className="p-5 flex flex-col gap-2 flex-1">
                    <div className="flex flex-wrap gap-1">
                      {post.tags.split(',').slice(0, 2).map(tag => (
                        <span key={tag} className="badge" style={{ fontSize: '0.68rem' }}>{tag.trim()}</span>
                      ))}
                    </div>
                    <h3
                      className="font-bold line-clamp-2 leading-snug transition-colors group-hover:text-[var(--accent-primary)]"
                      style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem' }}
                    >
                      {post.title}
                    </h3>
                    <p
                      className="text-sm line-clamp-2 flex-1"
                      style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}
                    >
                      {post.summary}
                    </p>
                    <div
                      className="flex items-center justify-between pt-3 text-xs"
                      style={{ color: 'var(--text-muted)', borderTop: '1px solid var(--border-subtle)', fontFamily: 'var(--font-mono)' }}
                    >
                      <span>{post.date}</span>
                      <span style={{ color: 'var(--accent-primary)' }}>Read →</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          ABOUT SECTION
      ═══════════════════════════════════════ */}
      <section
        id="about"
        className="section-gap"
        style={{ background: 'var(--bg-surface)', borderTop: '1px solid var(--border-subtle)' }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
            >
              <motion.span variants={fadeUp} className="section-label block mb-3">
                05. About
              </motion.span>
              <motion.h2 variants={fadeUp} className="text-section-heading mb-6" style={{ fontFamily: 'var(--font-display)' }}>
                About Me
              </motion.h2>
              <motion.p variants={fadeUp} className="text-base leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
                I'm a 4th-year Software Engineering student at <strong style={{ color: 'var(--text-primary)' }}>HUTECH (Ho Chi Minh City University of Technology)</strong> with a GPA of 3.30/4.0, building full-stack web applications using the PERN stack.
              </motion.p>
              <motion.p variants={fadeUp} className="text-base leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
                My recent work includes a <strong style={{ color: 'var(--text-primary)' }}>real-time cinema booking system</strong> with Redis distributed locking to prevent race conditions, and an <strong style={{ color: 'var(--text-primary)' }}>AI-powered document assistant</strong> using RAG pipeline with LangChain & Pinecone.
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
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { label: 'Projects Built', value: projects.length + '+', sub: 'Full-stack applications' },
                { label: 'Blog Posts', value: blogPosts.length, sub: 'Technical deep-dives' },
                { label: 'Certificates', value: certificates.length, sub: 'Professional & academic' },
                { label: 'GPA', value: '3.30', sub: 'Out of 4.0' },
              ].map(stat => (
                <div
                  key={stat.label}
                  className="card p-6 flex flex-col gap-1"
                  style={{ textAlign: 'left' }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '2rem',
                      fontWeight: 800,
                      color: 'var(--accent-primary)',
                      lineHeight: 1,
                    }}
                  >
                    {stat.value}
                  </span>
                  <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{stat.label}</span>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{stat.sub}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          CONTACT SECTION
      ═══════════════════════════════════════ */}
      <section id="contact" className="section-gap" style={{ borderTop: '1px solid var(--border-subtle)' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
            >
              <motion.span variants={fadeUp} className="section-label block mb-3">
                06. Contact
              </motion.span>
              <motion.h2
                variants={fadeUp}
                className="text-section-heading mb-4"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Let's work together
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="text-base leading-relaxed mb-8"
                style={{ color: 'var(--text-secondary)' }}
              >
                I'm actively looking for a <strong style={{ color: 'var(--text-primary)' }}>Full-Stack / Backend Developer Internship</strong>.
                Have an opportunity? I'd love to hear from you.
              </motion.p>
              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={`mailto:${profile.email}`}
                  className="btn btn-primary"
                  style={{ fontSize: '0.95rem', padding: '0.75rem 1.75rem' }}
                >
                  <Mail size={17} />
                  Send me an email
                </a>
                <Link
                  href="/contact"
                  className="btn btn-secondary"
                  style={{ fontSize: '0.95rem', padding: '0.75rem 1.75rem' }}
                >
                  Contact form
                </Link>
              </motion.div>

              <motion.div
                variants={fadeUp}
                className="flex items-center justify-center gap-5 mt-10 pt-8"
                style={{ borderTop: '1px solid var(--border-subtle)' }}
              >
                {[
                  { icon: Github, href: profile.github, label: 'GitHub' },
                  { icon: Linkedin, href: profile.linkedin, label: 'LinkedIn' },
                  { icon: Mail, href: `mailto:${profile.email}`, label: 'Email' },
                ].map(social => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center gap-1.5 group"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      <div
                        className="p-3 rounded-xl transition-all group-hover:border-[var(--accent-primary)] group-hover:text-[var(--accent-primary)]"
                        style={{ border: '1px solid var(--border-subtle)', background: 'var(--bg-surface)' }}
                      >
                        <Icon size={18} />
                      </div>
                      <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)' }}>{social.label}</span>
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
      <footer
        className="py-8"
        style={{ borderTop: '1px solid var(--border-subtle)', background: 'var(--bg-surface)' }}
      >
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
            © 2025 {profile.full_name}. Built with Next.js & Tailwind.
          </p>
          <div className="flex items-center gap-5">
            {[
              { label: 'Projects', href: '/projects' },
              { label: 'Blog', href: '/blog' },
              { label: 'About', href: '/about' },
              { label: 'Resume', href: '/resume' },
            ].map(link => (
              <Link
                key={link.label}
                href={link.href}
                className="link-hover"
                style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}
              >
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
            style={{
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border-medium)',
              color: 'var(--text-secondary)',
            }}
          >
            <ArrowUp size={18} />
          </motion.button>
        )}
      </AnimatePresence>

    </main>
  );
}