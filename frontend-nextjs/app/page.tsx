'use client';

import { profile, blogPosts, projects, certificates, activities } from '../src/data/staticData';
import { Mail, Github, Linkedin, MapPin, BookOpen, Code2, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50">

      {/* HERO */}
      <section className="relative pt-20 pb-16 px-6 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="w-32 h-32 mx-auto rounded-full border-4 border-white shadow-2xl overflow-hidden bg-slate-200 mb-6">
              <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-slate-600">
                {profile.full_name.charAt(0)}
              </div>
            </div>

            <h1 className="text-5xl font-bold text-slate-900 mb-3">{profile.full_name}</h1>
            <p className="text-xl text-slate-600 mb-6">{profile.title}</p>

            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <span className="flex items-center gap-1 bg-white px-3 py-1.5 rounded-lg shadow-sm text-sm">
                <MapPin size={14} /> TP. Hồ Chí Minh
              </span>
              <span className="bg-green-100 text-green-700 px-3 py-1.5 rounded-lg shadow-sm text-sm font-medium">
                Đang tìm cơ hội thực tập
              </span>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              <a href={profile.github} target="_blank" className="px-5 py-2.5 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800 transition-all flex items-center gap-2">
                <Github size={18} /> GitHub
              </a>
              <a href={profile.linkedin} target="_blank" className="px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all flex items-center gap-2">
                <Linkedin size={18} /> LinkedIn
              </a>
              <a href={`mailto:${profile.email}`} className="px-5 py-2.5 bg-white text-slate-900 font-medium rounded-lg border-2 border-slate-200 hover:border-blue-500 transition-all flex items-center gap-2">
                <Mail size={18} /> Email
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* GIỚI THIỆU */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">Về tôi</h2>
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
            <p className="text-slate-700 leading-relaxed whitespace-pre-line">
              {profile.bio}
            </p>
          </div>
        </div>
      </section>

      {/* BLOG POSTS */}
      <section className="py-16 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-3 text-center flex items-center justify-center gap-2">
            <BookOpen className="text-blue-600" />
            Bài viết về Java & JavaScript
          </h2>
          <p className="text-center text-slate-600 mb-12">
            Chia sẻ kiến thức và kinh nghiệm học tập lập trình
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl overflow-hidden border border-slate-200 hover:border-blue-300 hover:shadow-xl transition-all"
              >
                <div className="relative h-48 bg-gradient-to-br from-blue-100 to-purple-100">
                  <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                    <BookOpen size={48} />
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex gap-2 mb-3">
                    {post.tags.split(',').map((tag, i) => (
                      <span key={i} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2 text-lg line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-slate-600 text-sm mb-4 line-clamp-3">
                    {post.summary}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-500">{post.date}</span>
                    <Link href={`/blog/${post.id}`} className="text-blue-600 font-medium text-sm hover:underline">
                      Đọc thêm →
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-3 text-center flex items-center justify-center gap-2">
            <Code2 className="text-purple-600" />
            Dự án
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mt-12">
            {projects.map((project) => (
              <div key={project.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all">
                <div className="h-48 bg-gradient-to-br from-purple-100 to-blue-100"></div>
                <div className="p-6">
                  <h3 className="font-bold text-xl text-slate-900 mb-2">{project.title}</h3>
                  <p className="text-slate-600 text-sm mb-4">{project.description}</p>
                  <div className="text-xs text-slate-500 mb-4">
                    <strong>Tech:</strong> {project.tech_stack}
                  </div>
                  <a href={project.repo_url} target="_blank" className="text-blue-600 font-medium text-sm hover:underline">
                    Xem trên GitHub →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CERTIFICATES */}
      <section className="py-16 px-6 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center flex items-center justify-center gap-2">
            <Award className="text-yellow-500" />
            Chứng chỉ
          </h2>

          <div className="space-y-4">
            {certificates.map((cert) => (
              <div key={cert.id} className="bg-white p-6 rounded-xl border border-slate-200 flex items-center gap-4">
                <Award className="text-blue-600" size={32} />
                <div className="flex-grow">
                  <h3 className="font-bold text-slate-900">{cert.name}</h3>
                  <p className="text-sm text-slate-600">{cert.issuer} • {cert.date}</p>
                </div>
                {cert.url && (
                  <a href={cert.url} target="_blank" className="text-blue-600 text-sm hover:underline">
                    Xác thực →
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="py-16 px-6 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Liên hệ</h2>
          <p className="text-blue-100 mb-8">
            Nếu bạn muốn trao đổi về lập trình Java/JavaScript, hãy liên hệ với tôi!
          </p>
          <a href={`mailto:${profile.email}`} className="inline-flex items-center px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-all">
            <Mail size={18} className="mr-2" />
            {profile.email}
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 px-6 bg-slate-900 text-center text-slate-400 text-sm">
        <p>© 2024 {profile.full_name}. Website tĩnh xây dựng bằng Next.js</p>
      </footer>
    </main>
  );
}