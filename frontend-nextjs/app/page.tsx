'use client';

import { profile, blogPosts, projects, certificates } from '../src/data/staticData';
import { Mail, Github, Linkedin, ArrowUp, Menu, X, ExternalLink, ChevronRight, Sparkles, Code2, Award, BookOpen, Zap, ArrowRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Download, Moon, Sun, MapPin } from 'lucide-react';
import { useTheme } from 'next-themes';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

export default function OptimizedHome() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const { theme, setTheme } = useTheme();
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const stats = [
    { label: "Dự án", value: projects.length, icon: Code2, color: "blue" },
    { label: "Blog Posts", value: blogPosts.length, icon: BookOpen, color: "purple" },
    { label: "Chứng chỉ", value: certificates.length, icon: Award, color: "green" }
  ];

  return (
    <main className="min-h-screen bg-slate-50 font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-purple-600 origin-left z-[60]"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? 'bg-slate-900/80 backdrop-blur-xl shadow-lg shadow-slate-900/50 py-3 border-b border-slate-800'
          : 'bg-transparent py-5'
          }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          {/* Logo / Name with gradient */}
          <motion.span
            onClick={() => scrollToSection('home')}
            className={`font-bold text-xl cursor-pointer transition-all ${isScrolled
              ? 'bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent'
              : 'text-white'
              }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {profile.full_name.split(' ').slice(-1)[0]} {/* Show last name only */}
          </motion.span>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8">
            {['Home', 'About', 'Blog', 'Projects', 'Certificates'].map((item, idx) => (
              <motion.button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className={`relative font-medium text-sm transition-colors ${isScrolled ? 'text-slate-300 hover:text-cyan-400' : 'text-slate-200 hover:text-white'
                  }`}
                whileHover={{ y: -2 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                {item}
                {/* Underline effect */}
                <motion.span
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden transition-colors ${isScrolled ? 'text-slate-300' : 'text-white'}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden absolute top-full left-0 right-0 bg-slate-900/95 backdrop-blur-xl shadow-lg border-b border-slate-800 p-4 flex flex-col gap-3"
          >
            {['Home', 'About', 'Blog', 'Projects', 'Certificates'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-left font-medium text-slate-300 hover:text-cyan-400 py-3 border-b border-slate-800 last:border-0 transition-colors"
              >
                {item}
              </button>
            ))}
          </motion.div>
        )}
      </nav>

      {/* --- 2. HERO SECTION (UPDATED) --- */}
      <section id="home" className="relative pt-32 pb-20 px-6 min-h-screen bg-slate-950 overflow-hidden">
        {/* Animated Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000,transparent)]"></div>

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12">

          {/* Left: Profile Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 text-center lg:text-left"
          >
            {/* Avatar with Glow */}
            <div className="relative inline-block mb-6">
              <div className="absolute inset-0 bg-cyan-500/20 blur-3xl rounded-full animate-pulse"></div>
              <div className="relative w-32 h-32 rounded-full border-4 border-cyan-400/30 overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center shadow-2xl">
                <img
                  src={profile.avatar}
                  alt={profile.full_name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement!.innerHTML = `<span class="text-5xl font-bold text-cyan-400">H</span>`;
                  }}
                />
              </div>
            </div>

            {/* Name with Gradient */}
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
              {profile.full_name}
            </h1>

            <p className="text-xl text-slate-300 mb-6">
              Fullstack Developer Intern • AI Enthusiast
            </p>

            <p className="text-slate-400 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Đam mê xây dựng <span className="text-cyan-400 font-semibold">full-stack web applications</span> và{' '}
              <span className="text-cyan-400 font-semibold">AI-powered solutions</span>.
              Hiện đang tìm kiếm vị trí Fullstack Developer Intern.
            </p>

            {/* Status & Location */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-8">
              <span className="flex items-center gap-2 bg-slate-800/50 backdrop-blur-sm border border-slate-700 px-4 py-2 rounded-full text-sm text-slate-300">
                <MapPin size={14} className="text-cyan-400" />
                TP. Hồ Chí Minh
              </span>
              <span className="flex items-center gap-2 bg-green-500/10 border border-green-500/30 px-4 py-2 rounded-full text-sm">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                <span className="text-green-400 font-medium">Open to work</span>
              </span>
            </div>

            {/* Social Links */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <motion.a
                href={profile.github}
                target="_blank"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group px-6 py-3 bg-white text-slate-900 font-semibold rounded-xl hover:bg-slate-100 transition-all flex items-center gap-2 shadow-lg shadow-cyan-500/20"
              >
                <Github size={20} className="group-hover:rotate-12 transition-transform" />
                GitHub
              </motion.a>
              <motion.a
                href={profile.linkedin}
                target="_blank"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-500 transition-all flex items-center gap-2 shadow-lg shadow-blue-500/30"
              >
                <Linkedin size={20} />
                LinkedIn
              </motion.a>
              <motion.a
                href={`mailto:${profile.email}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-slate-800 border border-slate-700 text-white font-semibold rounded-xl hover:border-cyan-500 transition-all flex items-center gap-2"
              >
                <Mail size={20} />
                Email
              </motion.a>
            </div>
          </motion.div>

          {/* Right: Animated Code Terminal */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 w-full lg:w-auto"
          >
            <div className="bg-slate-900/50 backdrop-blur-md border border-slate-700 rounded-2xl overflow-hidden shadow-2xl shadow-cyan-900/20">
              {/* Terminal Header */}
              <div className="bg-slate-800/80 px-4 py-3 flex items-center gap-2 border-b border-slate-700">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                </div>
                <span className="text-sm text-slate-400 font-mono ml-4">developer.js</span>
              </div>

              {/* Terminal Content */}
              <div className="p-6 font-mono text-sm">
                <div className="text-slate-300 space-y-1">
                  <div><span className="text-purple-400">const</span> <span className="text-cyan-400">developer</span> = {'{'}</div>
                  <div className="pl-4"><span className="text-green-400">name</span>: <span className="text-orange-300">"{profile.full_name}"</span>,</div>
                  <div className="pl-4"><span className="text-green-400">role</span>: <span className="text-orange-300">"Fullstack Developer Intern"</span>,</div>
                  <div className="pl-4"><span className="text-green-400">skills</span>: [<span className="text-orange-300">"React", "Node.js", "Python", "AI/LLM"</span>],</div>
                  <div className="pl-4"><span className="text-green-400">passion</span>: <span className="text-orange-300">"Building scalable systems ⚡"</span></div>
                  <div>{'};'}</div>
                  <div className="mt-4 text-cyan-400">
                    → <span className="animate-pulse">Ready to ship production code! 🚀</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tech Stack Pills */}
            <div className="mt-6 flex flex-wrap gap-2 justify-center lg:justify-start">
              {['React.js', 'Node.js', 'Python', 'PostgreSQL', 'TypeScript'].map((tech) => (
                <motion.span
                  key={tech}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="px-3 py-1 bg-slate-800/50 border border-slate-700 rounded-full text-xs text-slate-300 hover:border-cyan-500 hover:text-cyan-400 transition-all cursor-default"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-slate-600 rounded-full flex justify-center p-2">
            <div className="w-1 h-3 bg-cyan-500 rounded-full"></div>
          </div>
        </motion.div>
      </section>

      {/* SECTION 2: About + Skills */}
      <section id="about" className="py-24 px-6 bg-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(148 163 184) 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">

          {/* Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Về tôi</h2>
              <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto rounded-full"></div>
            </motion.div>
          </div>

          {/* About Content + Quick Stats */}
          <div className="grid lg:grid-cols-2 gap-12 mb-20">

            {/* Left: Bio */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-slate-50 p-8 rounded-2xl border border-slate-200"
            >
              <div className="prose prose-slate max-w-none">
                <p className="text-slate-700 leading-relaxed text-lg mb-6">
                  Là sinh viên năm 4 chuyên ngành Kỹ thuật Phần mềm tại HUTECH, tôi đã xây dựng nền tảng vững chắc về Backend Development thông qua các dự án học thuật và tự học.
                </p>

                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <span className="text-cyan-500">💪</span> Điểm mạnh
                </h3>
                <ul className="space-y-2 text-slate-700 mb-6 list-none">
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-500 mt-1">▸</span>
                    <span>Xây dựng RESTful API với Node.js (Express) và React/Next.js frontend</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-500 mt-1">▸</span>
                    <span>Thiết kế database schema với PostgreSQL và Prisma ORM</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-500 mt-1">▸</span>
                    <span>Xử lý real-time communication với Socket.io</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-500 mt-1">▸</span>
                    <span>Xây dựng AI chatbot với RAG Pipeline, LangChain và Pinecone</span>
                  </li>
                </ul>

                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <span className="text-purple-500">🎯</span> Mục tiêu
                </h3>
                <p className="text-slate-700 leading-relaxed">
                  Tìm kiếm vị trí <span className="text-cyan-600 font-semibold">Fullstack Developer Intern</span> tại các công ty công nghệ để xây dựng hệ thống thực tế, học hỏi best practices và phát triển kỹ năng full-stack từ các senior developers.
                </p>
              </div>
            </motion.div>

            {/* Right: Quick Stats */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {[
                { label: 'Dự án hoàn thành', value: `${projects.length}+`, icon: '🚀', color: 'from-cyan-500 to-blue-500', bg: 'bg-cyan-50', border: 'border-cyan-200' },
                { label: 'Blog posts kỹ thuật', value: blogPosts.length, icon: '📝', color: 'from-purple-500 to-pink-500', bg: 'bg-purple-50', border: 'border-purple-200' },
                { label: 'Chứng chỉ & Giải thưởng', value: certificates.length, icon: '🏆', color: 'from-orange-500 to-red-500', bg: 'bg-orange-50', border: 'border-orange-200' },
                { label: 'Năm kinh nghiệm', value: '2+', icon: '⚡', color: 'from-green-500 to-teal-500', bg: 'bg-green-50', border: 'border-green-200' }
              ].map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group relative"
                >
                  <div className={`relative ${stat.bg} border ${stat.border} rounded-2xl p-6 transition-all hover:shadow-lg`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className={`text-4xl font-bold mb-2 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                          {stat.value}
                        </div>
                        <div className="text-slate-600 text-sm font-medium">{stat.label}</div>
                      </div>
                      <div className="text-4xl">{stat.icon}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Skills Section */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Technical Skills</h2>
              <p className="text-slate-600">Hover để xem chi tiết từng lĩnh vực</p>
            </motion.div>
          </div>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: 'Backend',
                icon: '⚙️',
                level: 85,
                skills: ['Node.js', 'Express.js', 'RESTful APIs', 'Python'],
                color: 'cyan',
                bg: 'bg-cyan-50',
                border: 'border-cyan-200',
                text: 'text-cyan-600'
              },
              {
                name: 'Database',
                icon: '🗄️',
                level: 80,
                skills: ['PostgreSQL', 'Prisma ORM', 'SQL Server'],
                color: 'green',
                bg: 'bg-green-50',
                border: 'border-green-200',
                text: 'text-green-600'
              },
              {
                name: 'AI & LLM',
                icon: '🤖',
                level: 70,
                skills: ['LangChain', 'RAG Pipeline', 'Pinecone', 'Google Gemini'],
                color: 'purple',
                bg: 'bg-purple-50',
                border: 'border-purple-200',
                text: 'text-purple-600'
              },
              {
                name: 'DevOps & Tools',
                icon: '🐳',
                level: 65,
                skills: ['Docker', 'Git', 'GitHub', 'Postman'],
                color: 'orange',
                bg: 'bg-orange-50',
                border: 'border-orange-200',
                text: 'text-orange-600'
              },
              {
                name: 'Frontend',
                icon: '🎨',
                level: 75,
                skills: ['React.js', 'Next.js (App Router)', 'Tailwind CSS', 'Framer Motion'],
                color: 'blue',
                bg: 'bg-blue-50',
                border: 'border-blue-200',
                text: 'text-blue-600'
              },
              {
                name: 'Real-time',
                icon: '⚡',
                level: 80,
                skills: ['Socket.io', 'Real-time Updates'],
                color: 'yellow',
                bg: 'bg-yellow-50',
                border: 'border-yellow-200',
                text: 'text-yellow-600'
              }
            ].map((skill, idx) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative"
              >
                <div className={`relative h-full ${skill.bg} border ${skill.border} rounded-2xl p-6 transition-all hover:shadow-xl hover:scale-105`}>

                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-3xl">{skill.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-bold text-slate-900 text-lg">{skill.name}</h3>
                      <span className={`text-sm font-bold ${skill.text}`}>{skill.level}%</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="h-2 bg-white rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full bg-gradient-to-r ${skill.color === 'cyan' ? 'from-cyan-500 to-blue-500' :
                          skill.color === 'green' ? 'from-green-500 to-teal-500' :
                            skill.color === 'purple' ? 'from-purple-500 to-pink-500' :
                              skill.color === 'orange' ? 'from-orange-500 to-red-500' :
                                skill.color === 'blue' ? 'from-blue-500 to-indigo-500' :
                                  'from-yellow-500 to-orange-500'
                          }`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: idx * 0.1 }}
                      />
                    </div>
                  </div>

                  {/* Skills List */}
                  <div className="space-y-2">
                    {skill.skills.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 text-sm text-slate-700"
                      >
                        <div className={`w-1.5 h-1.5 rounded-full ${skill.bg} border ${skill.border}`}></div>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Learning Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-2xl p-8 text-center"
          >
            <p className="text-slate-700 mb-4">
              🚀 <span className="font-semibold">Đang học thêm:</span> <span className="text-cyan-600 font-semibold">NestJS, Microservices Architecture</span>
            </p>
            <p className="text-slate-500 text-sm">
              Cập nhật liên tục qua side projects và online courses
            </p>
          </motion.div>
        </div>
      </section>

      {/* SECTION 3: Featured Projects - Bento Grid Layout */}
      <section id="projects" className="py-24 px-6 bg-slate-900 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full">
              <Code2 className="text-purple-400" size={20} />
              <span className="text-sm font-semibold text-purple-400">SHOWCASE</span>
            </div>

            <h2 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-purple-100 to-pink-100 bg-clip-text text-transparent">
              Dự án tiêu biểu
            </h2>

            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Real-world applications giải quyết production-grade problems
            </p>
          </motion.div>

          {/* Bento Grid Layout */}
          <div className="grid lg:grid-cols-2 gap-6 mb-12">

            {projects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className={`group relative overflow-hidden rounded-2xl ${idx === 0 ? 'lg:col-span-2 lg:row-span-2' : '' // First project is featured (2x size)
                  }`}
              >
                {/* Background Image with Overlay */}
                <div className={`absolute inset-0 ${idx === 0 ? 'min-h-[600px]' : 'min-h-[400px]'}`}>
                  <img
                    src={project.image_url}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                      e.currentTarget.src = 'https://placehold.co/1200x800/1e293b/64748b?text=Project+Demo';
                    }}
                  />
                  {/* Gradient overlays */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-900/80 via-slate-900/80 to-blue-900/80"></div>
                  <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[1px]"></div>
                </div>

                {/* Content */}
                <div className={`relative h-full p-8 flex flex-col justify-between ${idx === 0 ? 'min-h-[600px]' : 'min-h-[400px]'
                  }`}>

                  {/* Top Section */}
                  <div>
                    {/* Meta badges */}
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-full text-xs font-semibold backdrop-blur-sm">
                        {project.category}
                      </span>
                      {project.highlights && project.highlights.split(',').slice(0, 2).map((tag, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-white/10 text-white border border-white/20 rounded-full text-xs font-medium backdrop-blur-sm"
                        >
                          {tag.trim()}
                        </span>
                      ))}
                    </div>

                    {/* Title & Description */}
                    <h3 className={`font-bold text-white mb-4 ${idx === 0 ? 'text-4xl lg:text-5xl' : 'text-3xl'
                      }`}>
                      {project.title}
                    </h3>

                    <p className={`text-slate-200 mb-6 ${idx === 0 ? 'text-lg max-w-3xl' : 'text-base'
                      }`}>
                      {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech_stack.split(',').map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg text-sm text-slate-200 font-medium hover:border-cyan-500 hover:text-cyan-400 transition-colors"
                        >
                          {tech.trim()}
                        </span>
                      ))}
                    </div>

                    {/* Stats (if available) */}
                    {project.duration && (
                      <div className="flex gap-4 text-sm text-slate-300">
                        <span>⏱️ {project.duration}</span>
                        {project.team_size && <span>👥 {project.team_size}</span>}
                      </div>
                    )}
                  </div>

                  {/* Bottom Section - Action Buttons (Show on hover) */}
                  <div className="flex flex-wrap gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <Link
                      href={`/projects/${project.id}`}
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-white text-slate-900 font-semibold rounded-xl hover:bg-slate-100 transition-all hover:scale-105 shadow-lg"
                    >
                      Chi tiết →
                    </Link>
                    {project.repo_url && (
                      <a
                        href={project.repo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-slate-800/80 backdrop-blur-sm text-white font-semibold rounded-xl border border-slate-700 hover:border-cyan-500 transition-all hover:scale-105"
                      >
                        <Github size={20} />
                        GitHub
                      </a>
                    )}
                    {project.demo_url && (
                      <a
                        href={project.demo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-500 transition-all hover:scale-105"
                      >
                        <ExternalLink size={18} />
                        Demo
                      </a>
                    )}
                  </div>
                </div>

                {/* Hover glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 opacity-0 group-hover:opacity-20 blur-2xl transition-opacity -z-10"></div>
              </motion.div>
            ))}
          </div>

          {/* GitHub CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-slate-800 border border-slate-700 hover:border-purple-500 rounded-xl font-semibold text-white transition-all hover:scale-105"
            >
              <Github size={24} className="group-hover:rotate-12 transition-transform" />
              <span>Xem tất cả projects trên GitHub</span>
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </a>
          </motion.div>
        </div>
      </section>


      {/* SECTION 4: Latest Blog Posts */}
      <section id="blog" className="py-20 px-6 bg-slate-950">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full"
            >
              <BookOpen className="text-blue-400" size={20} />
              <span className="text-sm font-semibold text-blue-400">TECHNICAL BLOG</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent"
            >
              Blog chia sẻ
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-slate-400 text-lg"
            >
              Deep dives vào Java, JavaScript, Backend Architecture và AI/ML
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post, idx) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative"
              >
                {/* Glow Effect on Hover */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity"></div>

                {/* Card */}
                <div className="relative h-full bg-slate-900/50 backdrop-blur-sm border border-slate-800 group-hover:border-slate-700 rounded-2xl overflow-hidden transition-all">

                  {/* Image with Gradient Overlay */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.cover_image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      onError={(e) => {
                        e.currentTarget.src = 'https://placehold.co/600x400/1e293b/64748b?text=Blog';
                      }}
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>

                    {/* Tags on image */}
                    <div className="absolute top-4 left-4 flex gap-2">
                      {post.tags.split(',').slice(0, 2).map((tag, i) => (
                        <span
                          key={i}
                          className="text-xs font-semibold bg-cyan-500/20 backdrop-blur-sm text-cyan-300 px-3 py-1 rounded-full border border-cyan-500/30"
                        >
                          {tag.trim()}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="font-bold text-xl text-white mb-3 line-clamp-2 group-hover:text-cyan-400 transition-colors">
                      {post.title}
                    </h3>

                    <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                      {post.summary}
                    </p>

                    {/* Meta Info */}
                    <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                      <span className="text-xs text-slate-500">{post.date}</span>
                      <Link
                        href={`/blog/${post.id}`}
                        className="group/link flex items-center gap-1 text-sm font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
                      >
                        Đọc tiếp
                        <motion.span
                          className="inline-block"
                          animate={{ x: [0, 4, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          →
                        </motion.span>
                      </Link>
                    </div>
                  </div>

                  {/* Bottom border animation on hover */}
                  <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-overlay filter blur-3xl opacity-20" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-overlay filter blur-3xl opacity-20" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-full font-semibold text-sm mb-6">
              <Zap size={16} />
              Let's Work Together
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Sẵn sàng hợp tác?
            </h2>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed">
              Tôi đang tìm kiếm cơ hội thực tập Backend Developer. Hãy kết nối để cùng tạo ra sản phẩm giá trị.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/contact"
                className="px-8 py-4 bg-white text-slate-900 font-bold rounded-full hover:bg-blue-50 transition-all flex items-center justify-center gap-2 shadow-2xl hover:scale-105"
              >
                <Mail size={20} />
                Gửi email
              </Link>
              <Link
                href="/resume"
                className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white/10 transition-all flex items-center justify-center gap-2 hover:scale-105"
              >
                <ExternalLink size={20} />
                Xem Resume
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-slate-950 text-center text-slate-400 text-sm border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <p className="mb-2">
            © 2024 {profile.full_name}. Built with Next.js & Tailwind CSS.
          </p>
          <div className="flex justify-center gap-6 text-xs">
            <Link href="/about" className="hover:text-white transition-colors">About</Link>
            <Link href="/projects" className="hover:text-white transition-colors">Projects</Link>
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
          </div>
        </div>
      </footer>

      {/* Scroll to top */}
      {isScrolled && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 bg-blue-600 text-white p-4 rounded-full shadow-2xl hover:bg-blue-700 transition-all z-40 hover:scale-110 group"
        >
          <ArrowUp size={24} className="group-hover:-translate-y-1 transition-transform" />
        </motion.button>
      )}
    </main>
  );
}