'use client';

import { profile, blogPosts, projects, certificates, activities } from '../src/data/staticData';
import { Mail, Github, Linkedin, MapPin, BookOpen, Code2, Award, ArrowUp, Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Home() {
  // State cho menu mobile và hiệu ứng scroll
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Xử lý hiệu ứng khi cuộn trang
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hàm cuộn đến section
  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false); // Đóng menu mobile nếu đang mở
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 font-sans">

      {/* --- 1. NAVIGATION MENU (YÊU CẦU BẮT BUỘC) --- */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-5'
          }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          {/* Logo / Tên */}
          <span
            onClick={() => scrollToSection('home')}
            className={`font-bold text-xl cursor-pointer ${isScrolled ? 'text-slate-900' : 'text-slate-800'}`}
          >
            {profile.full_name}
          </span>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8">
            {['Home', 'About', 'Blog', 'Projects', 'Certificates'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className={`font-medium text-sm transition-colors hover:text-blue-600 ${isScrolled ? 'text-slate-600' : 'text-slate-700'
                  }`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-slate-700"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t border-slate-100 p-4 flex flex-col gap-4">
            {['Home', 'About', 'Blog', 'Projects', 'Certificates'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-left font-medium text-slate-700 py-2 border-b border-slate-50 last:border-0"
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* --- 2. HERO SECTION --- */}
      <section id="home" className="relative pt-32 pb-20 px-6 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Avatar Image */}
            <div className="w-32 h-32 mx-auto rounded-full border-4 border-white shadow-xl overflow-hidden bg-slate-200 mb-6 relative">
              <img
                src={profile.avatar}
                alt={profile.full_name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Nếu ảnh lỗi hoặc chưa load được thì hiện fallback màu xám
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
              {/* Fallback hiển thị chữ cái đầu nếu ảnh lỗi */}
              <div className="hidden w-full h-full absolute inset-0 bg-slate-200 flex items-center justify-center">
                <span className="text-4xl font-bold text-slate-500">{profile.full_name.charAt(0)}</span>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
              {profile.full_name}
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
              {profile.title}
            </p>

            {/* Status & Location */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <span className="flex items-center gap-1 bg-white px-3 py-1.5 rounded-full shadow-sm text-sm text-slate-600 border border-slate-100">
                <MapPin size={14} /> TP. Hồ Chí Minh
              </span>
              <span className="bg-green-100 text-green-700 px-3 py-1.5 rounded-full shadow-sm text-sm font-medium border border-green-200">
                Open to work
              </span>
            </div>

            {/* Social Links */}
            <div className="flex flex-wrap justify-center gap-4">
              <a href={profile.github} target="_blank" className="px-6 py-3 bg-slate-900 text-white font-medium rounded-xl hover:bg-slate-800 transition-all flex items-center gap-2 shadow-lg shadow-slate-200">
                <Github size={20} /> GitHub
              </a>
              <a href={profile.linkedin} target="_blank" className="px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-all flex items-center gap-2 shadow-lg shadow-blue-200">
                <Linkedin size={20} /> LinkedIn
              </a>
              <a href={`mailto:${profile.email}`} className="px-6 py-3 bg-white text-slate-900 font-medium rounded-xl border border-slate-200 hover:border-blue-500 hover:text-blue-600 transition-all flex items-center gap-2 shadow-sm">
                <Mail size={20} /> Email
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- 3. ABOUT SECTION --- */}
      <section id="about" className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-900">Về tôi</h2>
            <div className="w-16 h-1 bg-blue-600 mx-auto mt-2 rounded-full"></div>
          </div>

          <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 shadow-sm">
            <p className="text-slate-700 leading-relaxed whitespace-pre-line text-lg">
              {profile.bio}
            </p>
          </div>
        </div>
      </section>

      {/* --- 4. BLOG POSTS (QUAN TRỌNG: YÊU CẦU 9+ BÀI) --- */}
      <section id="blog" className="py-20 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 flex items-center justify-center gap-3">
              <BookOpen className="text-blue-600" /> Blog chia sẻ
            </h2>
            <p className="text-slate-600 mt-2">Kiến thức về Java, JavaScript và Lập trình mạng</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group bg-white rounded-2xl overflow-hidden border border-slate-200 hover:shadow-xl hover:border-blue-200 transition-all duration-300 flex flex-col"
              >
                {/* Image Cover */}
                <div className="relative h-48 overflow-hidden bg-slate-200">
                  {/* Sử dụng thẻ img thường để tương thích tốt nhất với đường dẫn đã xử lý */}
                  <img
                    src={post.cover_image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      // Fallback nếu ảnh lỗi
                      e.currentTarget.src = 'https://placehold.co/600x400/e2e8f0/64748b?text=Blog';
                    }}
                  />
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.tags.split(',').map((tag, i) => (
                      <span key={i} className="text-xs font-semibold bg-blue-50 text-blue-600 px-2 py-1 rounded-md">
                        {tag.trim()}
                      </span>
                    ))}
                  </div>

                  <h3 className="font-bold text-xl text-slate-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-slate-600 text-sm mb-4 line-clamp-3 flex-grow">
                    {post.summary}
                  </p>

                  <div className="flex justify-between items-center pt-4 border-t border-slate-100 mt-auto">
                    <span className="text-xs text-slate-400 font-medium">{post.date}</span>
                    <Link
                      href={`/blog/${post.id}`}
                      className="text-sm font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
                    >
                      Đọc tiếp →
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 5. PROJECTS SECTION --- */}
      <section id="projects" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 flex items-center justify-center gap-3">
              <Code2 className="text-purple-600" /> Dự án tiêu biểu
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {projects.map((project) => (
              <div key={project.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col">
                <div className="h-56 overflow-hidden bg-slate-100 relative group">
                  <img
                    src={project.image_url}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.src = 'https://placehold.co/800x400/f1f5f9/94a3b8?text=Project+Demo';
                    }}
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    <Link
                      href={`/projects/${project.id}`}
                      className="px-4 py-2 bg-white text-slate-900 rounded-lg font-bold text-sm hover:bg-blue-50"
                    >
                      Xem chi tiết
                    </Link>
                  </div>
                </div>

                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="font-bold text-2xl text-slate-900 mb-2">{project.title}</h3>
                  <p className="text-slate-600 mb-6 flex-grow">{project.description}</p>

                  <div className="mb-6">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Công nghệ</h4>
                    <p className="text-sm font-medium text-slate-800 bg-slate-100 p-3 rounded-lg">
                      {project.tech_stack}
                    </p>
                  </div>

                  <div className="flex gap-4 mt-auto">
                    <Link
                      href={`/projects/${project.id}`}
                      className="flex-1 text-center px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    >
                      Chi tiết
                    </Link>
                    {project.repo_url && (
                      <a
                        href={project.repo_url}
                        target="_blank"
                        className="flex-1 text-center px-4 py-2 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors"
                      >
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 6. CERTIFICATES & ACTIVITIES --- */}
      <section id="certificates" className="py-20 px-6 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center flex items-center justify-center gap-3">
            <Award className="text-yellow-500" /> Chứng chỉ & Hoạt động
          </h2>

          <div className="space-y-6">
            {/* Render Certificates */}
            {certificates.map((cert) => (
              <div key={`cert-${cert.id}`} className="bg-white p-6 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center gap-4 hover:border-blue-400 transition-colors">
                <div className="w-16 h-16 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0 text-blue-600">
                  <Award size={32} />
                </div>
                <div className="flex-grow">
                  <h3 className="font-bold text-lg text-slate-900">{cert.name}</h3>
                  <p className="text-slate-600">{cert.issuer} • <span className="text-slate-400 text-sm">{cert.date}</span></p>
                </div>
                {cert.url && (
                  <a href={cert.url} target="_blank" className="text-blue-600 font-medium text-sm hover:underline whitespace-nowrap">
                    Xác thực →
                  </a>
                )}
              </div>
            ))}

            {/* Render Activities (Optional Separator) */}
            <div className="py-4 text-center">
              <span className="text-slate-400 text-sm font-medium uppercase tracking-widest">Hoạt động ngoại khóa</span>
            </div>

            {activities.map((act) => (
              <div key={`act-${act.id}`} className="bg-white p-6 rounded-xl border border-slate-200 flex flex-col sm:flex-row gap-6 hover:shadow-md transition-shadow">
                <div className="w-full sm:w-32 h-24 bg-slate-100 rounded-lg overflow-hidden flex-shrink-0">
                  <img src={act.image_url} alt={act.name} className="w-full h-full object-cover"
                    onError={(e) => e.currentTarget.src = 'https://placehold.co/200x150?text=Activity'}
                  />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-900">{act.name}</h3>
                  <p className="text-blue-600 font-medium text-sm mb-2">{act.role} • {act.date}</p>
                  <p className="text-slate-600 text-sm">{act.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 7. CONTACT & FOOTER --- */}
      <section id="contact" className="py-20 px-6 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Liên hệ</h2>
          <p className="text-slate-300 mb-10 text-lg">
            Sẵn sàng cho các cơ hội thực tập và cộng tác trong các dự án Backend.
          </p>
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-500 hover:scale-105 transition-all shadow-lg shadow-blue-900/50"
          >
            <Mail size={20} className="mr-2" />
            Gửi Email cho tôi
          </a>
        </div>
      </section>

      <footer className="py-8 bg-slate-950 text-center text-slate-500 text-sm border-t border-slate-800">
        <p>© 2024 {profile.full_name}. Built with Next.js & Tailwind CSS.</p>
        <div className="flex justify-center gap-4 mt-4">
          <button onClick={() => scrollToSection('home')} className="hover:text-white transition-colors">Về đầu trang</button>
        </div>
      </footer>

      {/* Nút quay về đầu trang */}
      {isScrolled && (
        <button
          onClick={() => scrollToSection('home')}
          className="fixed bottom-8 right-8 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-all z-40 animate-bounce"
        >
          <ArrowUp size={24} />
        </button>
      )}

    </main>
  );
}