'use client';

import { profile, blogPosts, projects, certificates } from '../src/data/staticData';
import { Mail, Github, Linkedin, ArrowUp, Menu, X, ExternalLink, ChevronRight, Sparkles, Code2, Award, BookOpen, Zap, ArrowRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect } from 'react';

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
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm py-3'
          : 'bg-transparent py-6'
        }`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <Link href="/" className={`font-bold text-xl tracking-tighter ${isScrolled ? 'text-slate-900' : 'text-slate-800'
            }`}>
            {profile.full_name.split(' ').pop()} <span className="text-blue-600">.</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {[
              { name: 'Home', href: '/' },
              { name: 'About', href: '/about' },
              { name: 'Projects', href: '/projects' },
              { name: 'Blog', href: '/blog' },
              { name: 'Resume', href: '/resume' }
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
            <Link
              href="/contact"
              className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-all text-sm shadow-lg shadow-blue-600/30 hover:scale-105"
            >
              Contact
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-slate-700"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t border-slate-100 p-4"
          >
            {['Home', 'About', 'Projects', 'Blog', 'Resume', 'Contact'].map((item) => (
              <Link
                key={item}
                href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-3 px-4 text-slate-700 hover:bg-slate-50 rounded-lg font-medium transition-colors"
              >
                {item}
              </Link>
            ))}
          </motion.div>
        )}
      </nav>

      {/* Hero Section - Avatar lớn + thông điệp mới */}
      <section className="relative min-h-screen flex flex-col justify-center pt-24 pb-16 px-6 overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
        {/* Animated background blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            {/* Avatar lớn hơn */}
            <motion.div variants={fadeInUp} className="relative w-64 h-64 mx-auto mb-12">
              <div className="relative w-full h-full rounded-full border-8 border-white shadow-2xl overflow-hidden group ring-4 ring-blue-100/50">
                <img
                  src={profile.avatar || '/placeholder-avatar.png'}
                  alt={profile.full_name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <div className="hidden absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-5xl font-bold text-white">
                  {profile.full_name.charAt(0)}
                </div>
              </div>
              <div className="absolute -top-2 -right-2 w-10 h-10 bg-green-500 rounded-full border-4 border-white animate-pulse" />
            </motion.div>

            {/* Heading & Description với thông điệp mới */}
            <motion.div variants={fadeInUp} className="mb-12">
              <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-4 tracking-tight">
                Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">Hân</span>
              </h1>
              <p className="text-2xl md:text-3xl font-bold text-slate-700 mb-6">
                Backend Developer
              </p>
              {/* Thông điệp mới - ngắn gọn, truyền cảm hứng */}
              <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto italic">
                “First, solve the problem. Then, write the code.” – John Johnson
              </p>
              <p className="text-base text-slate-500 mt-4">
                Đang tìm kiếm cơ hội thực tập Backend / AI để học hỏi và đóng góp.
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row justify-center gap-6 mb-12 px-4">
              <Link
                href="/projects"
                className="group px-8 py-4 bg-slate-900 text-white font-bold rounded-full hover:bg-slate-800 transition-all hover:scale-105 flex items-center justify-center gap-2 shadow-2xl"
              >
                Xem dự án
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/contact"
                className="px-8 py-4 bg-white text-slate-900 font-bold rounded-full border-2 border-slate-200 hover:border-blue-500 hover:text-blue-600 transition-all hover:scale-105 flex items-center justify-center gap-2 shadow-lg"
              >
                <Mail size={20} />
                Liên hệ
              </Link>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={fadeInUp} className="flex justify-center gap-6 mb-16">
              <a href={profile.github} target="_blank" rel="noopener noreferrer"
                className="p-4 bg-white rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 hover:bg-slate-900 hover:text-white group">
                <Github size={24} />
              </a>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer"
                className="p-4 bg-white rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 hover:bg-blue-600 hover:text-white group">
                <Linkedin size={24} />
              </a>
              <a href={`mailto:${profile.email}`}
                className="p-4 bg-white rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 hover:bg-red-500 hover:text-white group">
                <Mail size={24} />
              </a>
            </motion.div>

            {/* Quick Stats */}
            <motion.div variants={fadeInUp} className="grid grid-cols-3 gap-6 max-w-md mx-auto">
              {stats.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <div key={i} className="bg-white/80 backdrop-blur-sm rounded-2xl py-6 px-4 shadow-lg border border-slate-200">
                    <Icon className={`w-8 h-8 mx-auto mb-3 text-${stat.color}-600`} />
                    <div className="text-3xl font-bold text-slate-900">{stat.value}+</div>
                    <div className="text-sm text-slate-600 mt-1">{stat.label}</div>
                  </div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, repeat: Infinity, duration: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-slate-400 rounded-full flex justify-center">
            <div className="w-1.5 h-3 bg-slate-400 rounded-full mt-2 animate-bounce" />
          </div>
        </motion.div>
      </section>

      {/* Các section còn lại giữ nguyên như trước */}
      {/* Featured Projects */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full font-semibold text-sm mb-4">
              <Sparkles size={16} />
              Featured Work
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Dự án nổi bật</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Các dự án thực tế về Backend Development và AI
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {projects.slice(0, 2).map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className="group bg-slate-50 rounded-3xl overflow-hidden border border-slate-200 hover:shadow-2xl hover:border-blue-300 transition-all duration-500"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={project.image_url}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                      e.currentTarget.src = 'https://placehold.co/800x600/e2e8f0/64748b?text=Project';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                      {project.category}
                    </span>
                  </div>
                </div>

                <div className="p-8">
                  <h3 className="font-bold text-2xl text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-600 mb-6 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech_stack.split(',').slice(0, 4).map((tech, i) => (
                      <span key={i} className="text-xs font-medium text-slate-600 bg-white border border-slate-200 px-3 py-1.5 rounded-lg">
                        {tech.trim()}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={`/projects/${project.id}`}
                    className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all group/link"
                  >
                    Xem chi tiết
                    <ChevronRight size={18} className="group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white font-bold rounded-full hover:bg-slate-800 transition-all hover:scale-105 shadow-xl"
            >
              Xem tất cả {projects.length} dự án
              <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Latest Blog Posts */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 text-purple-600 rounded-full font-semibold text-sm mb-4">
              <BookOpen size={16} />
              Latest Posts
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Bài viết mới nhất</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Chia sẻ kiến thức về Backend Development và AI
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {blogPosts.slice(0, 3).map((post, i) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:shadow-xl hover:border-purple-300 transition-all group"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={post.cover_image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      e.currentTarget.src = 'https://placehold.co/600x400/e2e8f0/64748b?text=Blog';
                    }}
                  />
                </div>
                <div className="p-6">
                  <div className="flex gap-2 mb-3">
                    <span className="text-xs font-bold text-purple-600 bg-purple-50 px-2 py-1 rounded-md">
                      {post.tags.split(',')[0]}
                    </span>
                  </div>
                  <h3 className="font-bold text-lg text-slate-900 mb-3 line-clamp-2 group-hover:text-purple-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                    {post.summary}
                  </p>
                  <Link
                    href={`/blog/${post.id}`}
                    className="inline-flex items-center gap-2 text-purple-600 font-semibold text-sm hover:gap-3 transition-all"
                  >
                    Đọc tiếp
                    <ChevronRight size={16} />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-8 py-4 bg-purple-600 text-white font-bold rounded-full hover:bg-purple-700 transition-all hover:scale-105 shadow-xl"
            >
              Đọc {blogPosts.length} bài viết
              <ArrowRight size={20} />
            </Link>
          </motion.div>
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