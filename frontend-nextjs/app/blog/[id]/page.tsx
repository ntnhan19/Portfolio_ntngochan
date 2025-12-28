'use client';

import { blogPosts } from '../../../src/data/staticData';
import Link from 'next/link';
import { ArrowLeft, Calendar, Tag, Clock } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { notFound, useParams } from 'next/navigation';
import { motion } from 'framer-motion';

export default function BlogDetail() {
    const params = useParams();
    const id = params?.id;
    const post = blogPosts.find(p => p.id.toString() === id);

    if (!post) return notFound();

    return (
        <main className="min-h-screen bg-white selection:bg-blue-100 selection:text-blue-900">
            {/* Header / Cover Section */}
            <header className="relative h-[60vh] min-h-[400px] flex items-end pb-12 overflow-hidden">
                <motion.img
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5 }}
                    src={post.cover_image}
                    className="absolute inset-0 w-full h-full object-cover"
                    alt={post.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent"></div>

                <div className="relative max-w-4xl mx-auto px-6 w-full text-white">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <div className="flex flex-wrap gap-2 mb-6">
                            {post.tags.split(',').map((tag, i) => (
                                <span key={i} className="px-3 py-1 bg-blue-600/80 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-widest">
                                    {tag.trim()}
                                </span>
                            ))}
                        </div>
                        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-[1.1]">
                            {post.title}
                        </h1>
                        <div className="flex items-center gap-6 text-slate-300 text-sm font-medium">
                            <span className="flex items-center gap-2"><Calendar size={16} className="text-blue-400" /> {post.date}</span>
                            <span className="flex items-center gap-2"><Clock size={16} className="text-blue-400" /> 5 phút đọc</span>
                        </div>
                    </motion.div>
                </div>
            </header>

            {/* Content Section */}
            <section className="max-w-4xl mx-auto px-6 py-16">
                <Link href="/#blog" className="inline-flex items-center text-slate-500 hover:text-blue-600 mb-12 transition-all font-medium group">
                    <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                    Quay lại danh sách bài viết
                </Link>

                <article className="prose prose-slate prose-lg max-w-none 
                    prose-headings:text-slate-900 prose-headings:font-bold
                    prose-p:text-slate-600 prose-p:leading-relaxed
                    prose-strong:text-slate-900 prose-strong:font-bold
                    prose-code:text-blue-600 prose-code:bg-blue-50 prose-code:px-1 prose-code:rounded
                    prose-pre:bg-slate-900 prose-pre:rounded-2xl prose-pre:shadow-2xl">
                    <ReactMarkdown>{post.content}</ReactMarkdown>
                </article>

                <div className="mt-20 pt-10 border-t border-slate-100 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-slate-100 border border-slate-200"></div>
                        <div>
                            <p className="text-sm text-slate-500 italic">Tác giả</p>
                            <p className="font-bold text-slate-900">Nguyễn Trần Ngọc Hân</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}