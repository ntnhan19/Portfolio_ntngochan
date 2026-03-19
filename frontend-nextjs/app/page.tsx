'use client';

import { profile, blogPosts, projects, certificates } from '../src/data/staticData';
import {
  Mail, Github, Linkedin, ArrowUp, Menu, X,
  ExternalLink, ChevronRight, ArrowRight,
  Code2, Database, Server, Zap, Globe, MapPin
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

/* ─── TECH STACK ──────────────────────────────────────── */
const techStack = [
  { label: 'React.js' }, { label: 'Next.js' }, { label: 'Node.js' },
  { label: 'Express.js' }, { label: 'PostgreSQL' }, { label: 'TypeScript' },
  { label: 'Socket.io' }, { label: 'Prisma' }, { label: 'TailwindCSS' }, { label: 'Python' },
];

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Blog', href: '#blog' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

/* ─── SKILLS ──────────────────────────────────────────── */
const skillGroups = [
  {
    icon: Globe,
    title: 'Frontend',
    colorHex: '#a4b8cc',
    skills: ['React.js', 'Next.js (App Router)', 'TypeScript', 'TailwindCSS', 'Framer Motion'],
  },
  {
    icon: Server,
    title: 'Backend',
    colorHex: '#9db4a0',
    skills: ['Node.js', 'Express.js', 'RESTful APIs', 'Socket.io', 'Python / FastAPI'],
  },
  {
    icon: Database,
    title: 'Database',
    colorHex: '#c4a882',
    skills: ['PostgreSQL', 'Prisma ORM', 'SQL Server', 'Redis'],
  },
  {
    icon: Zap,
    title: 'AI & Tools',
    colorHex: '#b8aec8',
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
    <main style={{ background: 'var(--cream)', color: 'var(--ink)', minHeight: '100vh' }}>

      {/* ── SCROLL PROGRESS ── */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-[60] h-[2px]"
        style={{
          scaleX,
          transformOrigin: '0%',
          background: 'linear-gradient(90deg, var(--rose), var(--clay))',
        }}
      />

      {/* ═══════════════════════════════════════
          NAVBAR
      ═══════════════════════════════════════ */}
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: isScrolled ? 'rgba(250,247,242,0.9)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(16px)' : 'none',
          borderBottom: isScrolled ? '1px solid var(--parchment)' : 'none',
        }}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
          <button
            onClick={() => scrollTo('#home')}
            style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--ink)', fontSize: '1rem' }}
          >
            <span style={{ color: 'var(--rose)' }}>{'<'}</span>
            {profile.full_name.split(' ').slice(-1)[0]}
            <span style={{ color: 'var(--rose)' }}>{' />'}</span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                className="px-3 py-1.5 rounded-full text-sm font-semibold transition-all duration-150"
                style={{ color: 'var(--ink-soft)', fontFamily: 'var(--font-body)' }}
                onMouseEnter={e => {
                  (e.target as HTMLElement).style.color = 'var(--ink)';
                  (e.target as HTMLElement).style.background = 'var(--parchment)';
                }}
                onMouseLeave={e => {
                  (e.target as HTMLElement).style.color = 'var(--ink-soft)';
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
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 rounded-md" style={{ color: 'var(--ink-soft)' }}>
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
              style={{ background: 'rgba(250,247,242,0.97)', borderTop: '1px solid var(--parchment)' }}
            >
              <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-1">
                {navLinks.map(link => (
                  <button key={link.label} onClick={() => scrollTo(link.href)}
                    className="text-left py-2.5 px-3 rounded-lg text-sm font-semibold transition-colors"
                    style={{ color: 'var(--ink-soft)' }}>
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
      <section id="home" className="relative min-h-screen flex flex-col justify-center grid-pattern"
        style={{ paddingTop: '6rem', paddingBottom: '4rem' }}>

        {/* Decorative rings */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute w-[480px] h-[480px] rounded-full top-[-100px] right-[-80px]"
            style={{ border: '1.5px solid var(--parchment)' }} />
          <div className="absolute w-[220px] h-[220px] rounded-full bottom-[10%] left-[-50px]"
            style={{ border: '1.5px solid var(--stone)' }} />
          <div className="absolute w-[180px] h-[180px] rounded-full top-[15%] right-[8%]"
            style={{ background: 'var(--accent-bg)', borderRadius: '50%', opacity: 0.6 }} />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
          <div className="grid lg:grid-cols-[1fr_360px] gap-16 items-center">

            {/* LEFT COLUMN */}
            <motion.div variants={stagger} initial="hidden" animate="visible" className="flex flex-col gap-6">

              {/* Status badge */}
              <motion.div variants={fadeUp} custom={0}>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
                  style={{ background: 'var(--accent-bg)', border: '1px solid var(--rose)', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--rose)' }}>
                  <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--sage)', display: 'inline-block', animation: 'blink 1.5s ease infinite' }} />
                  Open to internship opportunities
                </div>
              </motion.div>

              {/* Name */}
              <motion.div variants={fadeUp} custom={0.05} className="flex flex-col md:flex-row md:items-center gap-5">
                <img
                  src={profile.avatar}
                  alt={profile.full_name}
                  className="w-20 h-20 md:w-24 md:h-24 rounded-full border-[3px] object-cover shrink-0"
                  style={{ borderColor: 'var(--rose)', boxShadow: '0 0 0 6px var(--accent-bg)' }}
                />
                <div>
                  <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', color: 'var(--ink-faint)', fontSize: '1rem', marginBottom: '0.2rem' }}>
                    Hello, I'm
                  </p>
                  <h1 className="text-hero" style={{ fontFamily: 'var(--font-display)', color: 'var(--ink)' }}>
                    {profile.full_name.split(' ').slice(0, -1).join(' ')}{' '}
                    <span style={{ color: 'var(--rose)' }}>
                      {profile.full_name.split(' ').slice(-1)[0]}
                    </span>
                  </h1>
                </div>
              </motion.div>

              {/* Subtitle */}
              <motion.div variants={fadeUp} custom={0.1}>
                <p className="text-xl font-semibold" style={{ color: 'var(--ink-soft)', fontFamily: 'var(--font-body)' }}>
                  Full-Stack Developer
                  <span style={{ color: 'var(--stone)', margin: '0 0.5rem' }}>·</span>
                  <span style={{ color: 'var(--clay)', fontFamily: 'var(--font-mono)', fontSize: '0.95rem' }}>PERN Stack</span>
                </p>
              </motion.div>

              {/* Description */}
              <motion.div variants={fadeUp} custom={0.15}>
                <p className="text-base leading-relaxed max-w-xl" style={{ color: 'var(--ink-soft)' }}>
                  4th-year Software Engineering student at HUTECH, building real-world web applications with PostgreSQL, Express.js, React.js & Node.js. Passionate about clean APIs, real-time systems, and AI-powered tools.
                </p>
              </motion.div>

              {/* Tech pills */}
              <motion.div variants={fadeUp} custom={0.2} className="flex flex-wrap gap-2">
                {techStack.map(tech => (
                  <span key={tech.label} className="badge">{tech.label}</span>
                ))}
              </motion.div>

              {/* CTAs */}
              <motion.div variants={fadeUp} custom={0.25} className="flex flex-wrap gap-3 pt-2">
                <button onClick={() => scrollTo('#projects')} className="btn btn-primary">
                  View Projects <ArrowRight size={15} />
                </button>
                <button onClick={() => scrollTo('#contact')} className="btn btn-secondary">
                  Contact Me <Mail size={15} />
                </button>
                <a href={profile.github} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                  <Github size={16} />
                </a>
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                  <Linkedin size={16} />
                </a>
              </motion.div>

              {/* Meta row */}
              <motion.div variants={fadeUp} custom={0.3} className="flex flex-wrap items-center gap-5 text-sm pt-2"
                style={{ color: 'var(--ink-faint)' }}>
                <span className="flex items-center gap-1.5">
                  <MapPin size={13} /> Bình Thạnh, Hồ Chí Minh
                </span>
                <span className="flex items-center gap-1.5">
                  <Code2 size={13} /> GPA 3.30 / 4.0
                </span>
              </motion.div>
            </motion.div>

            {/* RIGHT COLUMN: Warm terminal card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="hidden lg:block"
            >
              <div className="rounded-2xl overflow-hidden"
                style={{ background: 'var(--warm-white)', border: '1px solid var(--parchment)', boxShadow: '0 20px 60px rgba(44,40,37,0.1)' }}>

                {/* "Terminal" bar */}
                <div className="flex items-center gap-1.5 px-4 py-3"
                  style={{ background: 'var(--parchment)', borderBottom: '1px solid var(--stone)' }}>
                  <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#d4a0a0' }} />
                  <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#c4a882' }} />
                  <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#9db4a0' }} />
                  <span className="ml-3 text-xs" style={{ color: 'var(--ink-faint)', fontFamily: 'var(--font-mono)' }}>
                    ~/portfolio
                  </span>
                </div>

                {/* Code content */}
                <div className="p-6" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', lineHeight: '1.9' }}>
                  <div style={{ color: 'var(--ink-faint)' }}>{'// about.ts'}</div>
                  <div className="mt-2">
                    <span style={{ color: 'var(--lavender)' }}>const </span>
                    <span style={{ color: 'var(--sky)' }}>developer</span>
                    <span style={{ color: 'var(--ink)' }}> = {'{'}</span>
                  </div>
                  <div className="pl-4">
                    <span style={{ color: 'var(--sage)' }}>name</span>
                    <span style={{ color: 'var(--ink-soft)' }}>: </span>
                    <span style={{ color: 'var(--clay)' }}>"{profile.full_name}"</span>
                    <span style={{ color: 'var(--ink-soft)' }}>,</span>
                  </div>
                  <div className="pl-4">
                    <span style={{ color: 'var(--sage)' }}>role</span>
                    <span style={{ color: 'var(--ink-soft)' }}>: </span>
                    <span style={{ color: 'var(--clay)' }}>"Full-Stack Intern"</span>
                    <span style={{ color: 'var(--ink-soft)' }}>,</span>
                  </div>
                  <div className="pl-4">
                    <span style={{ color: 'var(--sage)' }}>stack</span>
                    <span style={{ color: 'var(--ink-soft)' }}>: [</span>
                    <span style={{ color: 'var(--clay)' }}>"React", "Node.js", "Postgres"</span>
                    <span style={{ color: 'var(--ink-soft)' }}>],</span>
                  </div>
                  <div className="pl-4">
                    <span style={{ color: 'var(--sage)' }}>ai</span>
                    <span style={{ color: 'var(--ink-soft)' }}>: [</span>
                    <span style={{ color: 'var(--clay)' }}>"RAG", "LangChain"</span>
                    <span style={{ color: 'var(--ink-soft)' }}>],</span>
                  </div>
                  <div className="pl-4">
                    <span style={{ color: 'var(--sage)' }}>status</span>
                    <span style={{ color: 'var(--ink-soft)' }}>: </span>
                    <span style={{ color: 'var(--rose)' }}>"open_to_work"</span>
                  </div>
                  <div style={{ color: 'var(--ink)' }}>{'}'};</div>
                  <div className="mt-3" style={{ color: 'var(--ink-faint)' }}>
                    {'> '}
                    <span style={{ color: 'var(--sage)' }}>
                      Ready to ship production code 🚀
                    </span>
                    <span className="animate-blink" style={{ color: 'var(--rose)' }}>▋</span>
                  </div>
                </div>

                {/* Stats footer */}
                <div style={{ borderTop: '1px solid var(--parchment)' }} className="grid grid-cols-3">
                  {[
                    { label: 'Projects', value: projects.length + '+' },
                    { label: 'Blog posts', value: blogPosts.length },
                    { label: 'Certs', value: certificates.length },
                  ].map(stat => (
                    <div key={stat.label} className="flex flex-col items-center py-4 gap-0.5"
                      style={{ borderRight: '1px solid var(--parchment)' }}>
                      <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 700, color: 'var(--rose)' }}>
                        {stat.value}
                      </span>
                      <span style={{ fontSize: '0.68rem', color: 'var(--ink-faint)', fontFamily: 'var(--font-mono)' }}>
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Scroll hint */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
            style={{ color: 'var(--ink-faint)' }}>
            <span style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}>SCROLL</span>
            <div style={{ width: 1, height: 40, background: 'linear-gradient(to bottom, var(--stone), transparent)', animation: 'scrollPulse 2s ease-in-out infinite' }} />
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          PROJECTS SECTION
      ═══════════════════════════════════════ */}
      <section id="projects" className="section-gap" style={{ borderTop: '1px solid var(--parchment)', background: 'var(--warm-white)' }}>
        <div className="max-w-6xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={stagger} className="mb-12">
            <motion.span variants={fadeUp} className="section-label block mb-3">02. Selected Work</motion.span>
            <motion.h2 variants={fadeUp} className="text-section-heading" style={{ fontFamily: 'var(--font-display)', color: 'var(--ink)' }}>
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
                <Link href={`/projects/${project.id}`}>
                  <div className="group grid grid-cols-[3rem_1fr_auto] gap-6 items-start py-7 px-2 rounded-xl transition-all cursor-pointer"
                    style={{ borderTop: '1px solid var(--parchment)' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--cream)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}>

                    <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', color: 'var(--stone)', fontSize: '1.1rem', paddingTop: '0.1rem' }}>
                      {String(idx + 1).padStart(2, '0')}
                    </span>

                    <div>
                      <h3 className="font-bold text-xl mb-2 transition-colors group-hover:text-[var(--rose)]"
                        style={{ fontFamily: 'var(--font-display)', color: 'var(--ink)' }}>
                        {project.title}
                      </h3>
                      <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--ink-soft)' }}>
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

                    <div className="flex flex-col gap-2 pt-1 items-end">
                      {project.repo_url && (
                        <a href={project.repo_url} target="_blank" rel="noopener noreferrer"
                          className="link-hover text-sm flex items-center gap-1"
                          onClick={e => e.stopPropagation()}>
                          <Github size={14} /> GitHub
                        </a>
                      )}
                      {project.demo_url && (
                        <a href={project.demo_url} target="_blank" rel="noopener noreferrer"
                          className="link-hover text-sm flex items-center gap-1"
                          onClick={e => e.stopPropagation()}>
                          <ExternalLink size={14} /> Demo
                        </a>
                      )}
                      <span className="text-sm flex items-center gap-1 mt-1"
                        style={{ color: 'var(--rose)', fontFamily: 'var(--font-mono)', fontSize: '0.78rem' }}>
                        Details <ChevronRight size={13} />
                      </span>
                    </div>
                  </div>
                </Link>
                {idx === projects.length - 1 && (
                  <div style={{ borderTop: '1px solid var(--parchment)' }} />
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
      <section id="skills" className="section-gap" style={{ background: 'var(--cream)', borderTop: '1px solid var(--parchment)' }}>
        <div className="max-w-6xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={stagger} className="mb-12">
            <motion.span variants={fadeUp} className="section-label block mb-3">03. Expertise</motion.span>
            <motion.h2 variants={fadeUp} className="text-section-heading" style={{ fontFamily: 'var(--font-display)', color: 'var(--ink)' }}>
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
                    <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.95rem', color: 'var(--ink)' }}>
                      {group.title}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    {group.skills.map(skill => (
                      <div key={skill} className="flex items-center gap-2 text-sm" style={{ color: 'var(--ink-soft)' }}>
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
            style={{ background: 'var(--accent-bg)', border: '1px solid var(--rose)' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--rose)' }}>
              // currently_learning
            </span>
            {['NestJS', 'Microservices Architecture', 'Docker Compose', 'System Design'].map(item => (
              <span key={item} className="badge" style={{ color: 'var(--rose)', borderColor: 'var(--rose)', background: 'transparent' }}>
                {item}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          BLOG SECTION
      ═══════════════════════════════════════ */}
      <section id="blog" className="section-gap" style={{ background: 'var(--warm-white)', borderTop: '1px solid var(--parchment)' }}>
        <div className="max-w-6xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={stagger}
            className="flex items-end justify-between mb-12 flex-wrap gap-4">
            <div>
              <motion.span variants={fadeUp} className="section-label block mb-3">04. Writing</motion.span>
              <motion.h2 variants={fadeUp} className="text-section-heading" style={{ fontFamily: 'var(--font-display)', color: 'var(--ink)' }}>
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
              <motion.div key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}>
                <Link href={`/blog/${post.id}`} className="card group flex flex-col h-full overflow-hidden block">
                  <div className="h-40 overflow-hidden" style={{ background: 'var(--parchment)' }}>
                    <img src={post.cover_image} alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={e => { (e.target as HTMLImageElement).src = 'https://placehold.co/600x300/ede8df/9a9089?text=Blog'; }} />
                  </div>
                  <div className="p-5 flex flex-col gap-2 flex-1">
                    <div className="flex flex-wrap gap-1">
                      {post.tags.split(',').slice(0, 2).map(tag => (
                        <span key={tag} className="badge" style={{ fontSize: '0.68rem' }}>{tag.trim()}</span>
                      ))}
                    </div>
                    <h3 className="font-bold line-clamp-2 leading-snug transition-colors group-hover:text-[var(--rose)]"
                      style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem', color: 'var(--ink)' }}>
                      {post.title}
                    </h3>
                    <p className="text-sm line-clamp-2 flex-1" style={{ color: 'var(--ink-soft)', lineHeight: 1.6 }}>
                      {post.summary}
                    </p>
                    <div className="flex items-center justify-between pt-3 text-xs"
                      style={{ color: 'var(--ink-faint)', borderTop: '1px solid var(--parchment)', fontFamily: 'var(--font-mono)' }}>
                      <span>{post.date}</span>
                      <span style={{ color: 'var(--rose)' }}>Read →</span>
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
      <section id="about" className="section-gap" style={{ background: 'var(--cream)', borderTop: '1px solid var(--parchment)' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
              <motion.span variants={fadeUp} className="section-label block mb-3">05. About</motion.span>
              <motion.h2 variants={fadeUp} className="text-section-heading mb-6" style={{ fontFamily: 'var(--font-display)', color: 'var(--ink)' }}>
                About Me
              </motion.h2>
              <motion.p variants={fadeUp} className="text-base leading-relaxed mb-4" style={{ color: 'var(--ink-soft)' }}>
                I'm a 4th-year Software Engineering student at{' '}
                <strong style={{ color: 'var(--ink)' }}>HUTECH</strong>{' '}
                with a GPA of 3.30/4.0, building full-stack web applications using the PERN stack.
              </motion.p>
              <motion.p variants={fadeUp} className="text-base leading-relaxed mb-6" style={{ color: 'var(--ink-soft)' }}>
                My recent work includes a{' '}
                <strong style={{ color: 'var(--ink)' }}>real-time cinema booking system</strong>{' '}
                with Redis distributed locking, and an{' '}
                <strong style={{ color: 'var(--ink)' }}>AI-powered document assistant</strong>{' '}
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
                { label: 'Blog Posts', value: blogPosts.length, sub: 'Technical deep-dives' },
                { label: 'Certificates', value: certificates.length, sub: 'Professional & academic' },
                { label: 'GPA', value: '3.30', sub: 'Out of 4.0' },
              ].map(stat => (
                <div key={stat.label} className="card p-6 flex flex-col gap-1">
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 700, color: 'var(--rose)', lineHeight: 1 }}>
                    {stat.value}
                  </span>
                  <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--ink)' }}>{stat.label}</span>
                  <span style={{ color: 'var(--ink-faint)', fontSize: '0.78rem' }}>{stat.sub}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          CONTACT SECTION
      ═══════════════════════════════════════ */}
      <section id="contact" className="section-gap" style={{ background: 'var(--parchment)', borderTop: '1px solid var(--stone)' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
              <motion.span variants={fadeUp} className="section-label block mb-3">06. Contact</motion.span>
              <motion.h2 variants={fadeUp} className="text-section-heading mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--ink)' }}>
                Let's work together
              </motion.h2>
              <motion.p variants={fadeUp} className="text-base leading-relaxed mb-8" style={{ color: 'var(--ink-soft)' }}>
                I'm actively looking for a{' '}
                <strong style={{ color: 'var(--ink)' }}>Full-Stack / Backend Developer Internship</strong>.
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
                style={{ borderTop: '1px solid var(--stone)' }}>
                {[
                  { icon: Github, href: profile.github, label: 'GitHub' },
                  { icon: Linkedin, href: profile.linkedin, label: 'LinkedIn' },
                  { icon: Mail, href: `mailto:${profile.email}`, label: 'Email' },
                ].map(social => {
                  const Icon = social.icon;
                  return (
                    <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer"
                      className="flex flex-col items-center gap-1.5 group" style={{ color: 'var(--ink-faint)' }}>
                      <div className="p-3 rounded-xl transition-all"
                        style={{ border: '1px solid var(--stone)', background: 'var(--warm-white)' }}
                        onMouseEnter={e => {
                          (e.currentTarget as HTMLElement).style.borderColor = 'var(--rose)';
                          (e.currentTarget as HTMLElement).style.color = 'var(--rose)';
                        }}
                        onMouseLeave={e => {
                          (e.currentTarget as HTMLElement).style.borderColor = 'var(--stone)';
                          (e.currentTarget as HTMLElement).style.color = 'var(--ink-faint)';
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
      <footer className="py-8" style={{ borderTop: '1px solid var(--parchment)', background: 'var(--ink)' }}>
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p style={{ fontSize: '0.8rem', color: 'rgba(250,247,242,0.5)', fontFamily: 'var(--font-mono)' }}>
            © 2025{' '}
            <em style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', color: 'rgba(250,247,242,0.8)' }}>
              {profile.full_name}
            </em>
            . Built with Next.js & Tailwind.
          </p>
          <div className="flex items-center gap-5">
            {[
              { label: 'Projects', href: '/projects' },
              { label: 'Blog', href: '/blog' },
              { label: 'About', href: '/about' },
              { label: 'Resume', href: '/resume' },
            ].map(link => (
              <Link key={link.label} href={link.href} className="link-hover"
                style={{ fontSize: '0.78rem', fontFamily: 'var(--font-mono)', color: 'rgba(250,247,242,0.4)' }}>
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
            style={{ background: 'var(--warm-white)', border: '1px solid var(--stone)', color: 'var(--ink-soft)' }}
          >
            <ArrowUp size={18} />
          </motion.button>
        )}
      </AnimatePresence>

    </main>
  );
}