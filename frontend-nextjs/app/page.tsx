'use client';

import { profile, blogPosts, projects, certificates, activities } from '../src/data/staticData';
import { Mail, Github, Linkedin, MapPin, BookOpen, Code2, Award, ArrowUp, Menu, X, ExternalLink, Download, Database, Server, Cpu, Globe } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect, lazy } from 'react';
import ReactMarkdown from 'react-markdown';
import StatsSection from './components/StatsSection';
import Timeline from './components/Timeline';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen bg-slate-50 font-sans selection:bg-blue-100 selection:text-blue-900">

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-blue-600 origin-left z-[60]"
        style={{ scaleX }}
      />

      {/* --- NAVIGATION --- */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <span onClick={() => scrollToSection('home')} className={`font-bold text-xl cursor-pointer tracking-tighter ${isScrolled ? 'text-slate-900' : 'text-slate-800'}`}>
            {profile.full_name} <span className="text-blue-600">.</span>
          </span>
          <div className="hidden md:flex gap-8">
            {[
              { name: 'Home', href: '/' },
              { name: 'About', href: '/about' },
              { name: 'Blog', href: '/blog' },
              { name: 'Projects', href: '#projects' },
              { name: 'Certificates', href: '#certificates' }
            ].map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`font-medium text-sm transition-colors hover:text-blue-600 ${isScrolled ? 'text-slate-600' : 'text-slate-700'
                  }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <button className="md:hidden text-slate-700" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t border-slate-100 p-4 flex flex-col gap-4">
            {['Home', 'About', 'Blog', 'Projects', 'Certificates'].map((item) => (
              <button key={item} onClick={() => scrollToSection(item.toLowerCase())} className="text-left font-medium text-slate-700 py-2 border-b border-slate-50 last:border-0">
                {item}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* --- HERO SECTION --- */}
      <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 px-6 overflow-hidden bg-white">
        {/* Background Blobs */}
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-20%] left-[20%] w-[500px] h-[500px] bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
            <div className="relative w-40 h-40 mx-auto mb-8 rounded-full border-[6px] border-white shadow-2xl overflow-hidden group">
              <img
                src={profile.avatar}
                alt={profile.full_name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <div className="hidden w-full h-full absolute inset-0 bg-slate-100 flex items-center justify-center text-4xl font-bold text-slate-400">
                {profile.full_name.charAt(0)}
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight">
              Backend <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Developer</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 mb-10 max-w-2xl mx-auto font-light">
              {profile.title}
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href={profile.github} target="_blank" className="px-8 py-4 bg-slate-900 text-white font-bold rounded-full hover:bg-slate-800 transition-all hover:scale-105 flex items-center justify-center gap-2 shadow-lg">
                <Github size={20} /> GitHub
              </a>
              <a href={`mailto:${profile.email}`} className="px-8 py-4 bg-white text-slate-900 font-bold rounded-full border border-slate-200 hover:border-blue-500 hover:text-blue-600 transition-all hover:scale-105 flex items-center justify-center gap-2 shadow-lg">
                <Mail size={20} /> Contact Me
              </a>
            </div>

            <div className="mt-16 flex justify-center gap-8 text-slate-400 grayscale opacity-50">
              {/* Tech Icons Decoration */}
              <Database size={32} />
              <Server size={32} />
              <Cpu size={32} />
              <Globe size={32} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- ABOUT SECTION (BENTO GRID STYLE) --- */}
      <section id="about" className="py-24 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {/* 1. Bio Box */}
            <motion.div variants={fadeInUp} className="md:col-span-2 bg-white p-10 rounded-3xl border border-slate-100 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span className="w-1.5 h-8 bg-blue-600 rounded-full"></span> Về tôi
              </h2>
              <div className="prose prose-slate prose-lg max-w-none prose-strong:text-slate-900 prose-strong:font-bold prose-ul:list-disc prose-li:text-slate-600">
                <ReactMarkdown>{profile.bio}</ReactMarkdown>
              </div>
            </motion.div>

            {/* 2. Skills Box (Hardcoded for Visuals) */}
            <motion.div variants={fadeInUp} className="bg-gradient-to-br from-blue-600 to-purple-700 p-8 rounded-3xl text-white shadow-lg">
              <h2 className="text-2xl font-bold mb-6 border-b border-white/20 pb-4">Kỹ năng chính</h2>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-blue-100 mb-2 text-sm uppercase tracking-wider">Languages</h4>
                  <div className="flex flex-wrap gap-2">
                    {['Java', 'JavaScript', 'Golang', 'SQL'].map(s => (
                      <span key={s} className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">{s}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-100 mb-2 text-sm uppercase tracking-wider">Backend</h4>
                  <div className="flex flex-wrap gap-2">
                    {['Spring Boot', 'Node.js', 'Gin', 'REST API'].map(s => (
                      <span key={s} className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">{s}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-100 mb-2 text-sm uppercase tracking-wider">Tools</h4>
                  <div className="flex flex-wrap gap-2">
                    {['Docker', 'Git', 'Postman', 'Linux'].map(s => (
                      <span key={s} className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* 3. Stats / Info Box */}
            <motion.div variants={fadeInUp} className="md:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-6 rounded-2xl border border-slate-100 text-center">
                <div className="text-3xl font-bold text-blue-600 mb-1">1+</div>
                <div className="text-sm text-slate-500">Năm kinh nghiệm</div>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-100 text-center">
                <div className="text-3xl font-bold text-purple-600 mb-1">5+</div>
                <div className="text-sm text-slate-500">Dự án hoàn thành</div>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-100 text-center">
                <div className="text-3xl font-bold text-pink-600 mb-1">7+</div>
                <div className="text-sm text-slate-500">Chứng chỉ</div>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-100 text-center">
                <div className="text-3xl font-bold text-orange-600 mb-1">100%</div>
                <div className="text-sm text-slate-500">Đam mê</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <StatsSection />
      <Timeline />


      {/* --- PROJECTS SECTION --- */}
      <section id="projects" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Dự án nổi bật</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">Các dự án thực tế áp dụng kiến thức Lập trình mạng, AI và Backend Systems.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-10">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group bg-slate-50 rounded-3xl overflow-hidden border border-slate-100 hover:shadow-2xl transition-all duration-300"
              >
                <div className="h-64 overflow-hidden relative">
                  <img
                    src={project.image_url}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.src = 'https://placehold.co/800x600/f1f5f9/94a3b8?text=Project+Demo';
                    }}
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 backdrop-blur-sm">
                    <Link href={`/projects/${project.id}`} className="px-6 py-3 bg-white text-slate-900 rounded-full font-bold hover:scale-105 transition-transform">
                      Xem chi tiết
                    </Link>
                  </div>
                </div>

                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">{project.category}</span>
                  </div>
                  <h3 className="font-bold text-2xl text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">{project.title}</h3>
                  <p className="text-slate-600 mb-6 line-clamp-2">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech_stack.split(',').slice(0, 3).map((tech, i) => (
                      <span key={i} className="text-xs font-medium text-slate-500 bg-white border border-slate-200 px-2 py-1 rounded-md">
                        {tech.trim()}
                      </span>
                    ))}
                    <span className="text-xs font-medium text-slate-400 px-2 py-1">+more</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- BLOG SECTION --- */}
      <section id="blog" className="py-24 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-2">Bài viết mới nhất</h2>
              <p className="text-slate-600">Chia sẻ kiến thức về lập trình</p>
            </div>
            <Link href="#" className="hidden md:flex items-center text-blue-600 font-semibold hover:gap-2 transition-all">
              Xem tất cả <ExternalLink size={16} className="ml-1" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {blogPosts.slice(0, 3).map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:shadow-xl transition-all group"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={post.cover_image}
                    alt={post.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => { e.currentTarget.src = 'https://placehold.co/600x400/e2e8f0/64748b?text=Blog'; }}
                  />
                </div>
                <div className="p-6">
                  <div className="flex gap-2 mb-3">
                    <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md">{post.tags.split(',')[0]}</span>
                  </div>
                  <h3 className="font-bold text-lg text-slate-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-slate-500 text-sm mb-4 line-clamp-2">{post.summary}</p>
                  <Link href={`/blog/${post.id}`} className="text-sm font-bold text-slate-900 border-b-2 border-slate-200 hover:border-blue-600 transition-all pb-1">
                    Đọc tiếp
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CERTIFICATES & ACTIVITIES (GALLERY STYLE) --- */}
      <section id="certificates" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Chứng chỉ & Hoạt động</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Minh chứng cho quá trình học tập và rèn luyện không ngừng nghỉ.</p>
          </div>

          {/* Certificates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {certificates.map((cert) => (
              <motion.div
                key={cert.id}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all"
              >
                <div className="relative aspect-video bg-slate-100 border-b border-slate-100 group">
                  <img
                    src={cert.image_url}
                    alt={cert.name}
                    className="w-full h-full object-cover p-4 group-hover:p-0 transition-all duration-500"
                    onError={(e) => e.currentTarget.src = 'https://placehold.co/400x300?text=Certificate'}
                  />
                  {cert.url && (
                    <a href={cert.url} target="_blank" className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-bold">
                      <ExternalLink size={24} className="mr-2" /> Xem xác thực
                    </a>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-slate-900 line-clamp-1" title={cert.name}>{cert.name}</h3>
                  <p className="text-sm text-slate-500 mt-1">{cert.issuer}</p>
                  <p className="text-xs text-blue-600 font-medium mt-2 bg-blue-50 inline-block px-2 py-1 rounded">{cert.date}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Activities List */}
          <h3 className="text-2xl font-bold text-slate-900 mb-8 border-l-4 border-purple-600 pl-4">Hoạt động ngoại khóa</h3>
          <div className="space-y-6">
            {activities.map((act) => (
              <motion.div
                key={act.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex flex-col md:flex-row gap-6 bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:border-purple-200 transition-colors"
              >
                <div className="w-full md:w-48 h-32 flex-shrink-0 rounded-xl overflow-hidden">
                  <img
                    src={act.image_url}
                    alt={act.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    onError={(e) => e.currentTarget.src = 'https://placehold.co/300x200?text=Activity'}
                  />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-slate-900">{act.name}</h4>
                  <p className="text-purple-700 font-medium text-sm mb-3">{act.role} • {act.date}</p>
                  <p className="text-slate-600 leading-relaxed">{act.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CONTACT & FOOTER --- */}
      <section className="py-24 px-6 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600 rounded-full mix-blend-overlay filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600 rounded-full mix-blend-overlay filter blur-3xl opacity-20"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl font-bold mb-6">Sẵn sàng hợp tác?</h2>
          <p className="text-slate-400 mb-10 text-xl max-w-2xl mx-auto">
            Tôi đang tìm kiếm cơ hội thực tập Backend Developer. Hãy kết nối để cùng nhau tạo ra những sản phẩm giá trị.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href={`mailto:${profile.email}`}
              className="px-8 py-4 bg-white text-slate-900 font-bold rounded-full hover:bg-blue-50 transition-all flex items-center justify-center gap-2"
            >
              <Mail size={20} /> Gửi Email
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              className="px-8 py-4 bg-transparent border border-slate-600 text-white font-bold rounded-full hover:bg-slate-800 hover:border-slate-500 transition-all flex items-center justify-center gap-2"
            >
              <Linkedin size={20} /> LinkedIn
            </a>
          </div>
        </div>
      </section>

      <footer className="py-8 bg-slate-950 text-center text-slate-500 text-sm border-t border-slate-900">
        <p>© 2024 {profile.full_name}. Built with <span className="text-white">Next.js</span> & <span className="text-white">Tailwind CSS</span>.</p>
        {isScrolled && (
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="fixed bottom-8 right-8 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-all z-40 animate-bounce">
            <ArrowUp size={24} />
          </button>
        )}
      </footer>
    </main>
  );
}