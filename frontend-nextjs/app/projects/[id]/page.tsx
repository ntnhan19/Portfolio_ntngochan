'use client';

import { projects } from '../../../src/data/staticData';
import Link from 'next/link';
import { ArrowLeft, Github, ExternalLink, Calendar, Users, Clock, Layout, Terminal } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { notFound, useParams } from 'next/navigation';
import { motion } from 'framer-motion';

export default function ProjectDetail() {
    const params = useParams();
    const id = params?.id;
    const project = projects.find(p => p.id.toString() === id);

    if (!project) return notFound();

    return (
        <main className="min-h-screen bg-slate-50">
            {/* Project Header */}
            <section className="bg-white border-b border-slate-200 pt-32 pb-16">
                <div className="max-w-6xl mx-auto px-6">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <Link href="/#projects" className="inline-flex items-center text-slate-500 hover:text-blue-600 mb-8 transition-all font-medium group">
                            <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                            Quay lại các dự án
                        </Link>

                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                            <div className="max-w-3xl">
                                <span className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4 inline-block">
                                    {project.category}
                                </span>
                                <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
                                    {project.title}
                                </h1>
                                <p className="text-xl text-slate-600 font-light leading-relaxed">
                                    {project.description}
                                </p>
                            </div>

                            <div className="flex gap-4">
                                {project.repo_url && (
                                    <a href={project.repo_url} target="_blank" className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20">
                                        <Github size={20} /> GitHub
                                    </a>
                                )}
                                {project.demo_url && (
                                    <a href={project.demo_url} target="_blank" className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20">
                                        <ExternalLink size={20} /> Live Demo
                                    </a>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Content & Specs Grid */}
            <section className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Left Side: Markdown Content */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-sm">
                        <article className="prose prose-slate prose-lg max-w-none 
                            prose-headings:text-slate-900 prose-headings:flex prose-headings:items-center prose-headings:gap-3
                            prose-h2:before:content-[''] prose-h2:before:w-1.5 prose-h2:before:h-8 prose-h2:before:bg-blue-600 prose-h2:before:rounded-full">
                            <ReactMarkdown>{project.content}</ReactMarkdown>
                        </article>
                    </div>
                </div>

                {/* Right Side: Specs Sticky Sidebar */}
                <aside className="space-y-6">
                    <div className="sticky top-24 space-y-6">
                        {/* Info Card */}
                        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
                            <h3 className="font-bold text-slate-900 flex items-center gap-2 uppercase text-xs tracking-widest border-b border-slate-100 pb-4">
                                <Layout size={16} className="text-blue-600" /> Thông tin dự án
                            </h3>
                            <div className="grid grid-cols-1 gap-6">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-slate-50 text-slate-600 rounded-xl"><Clock size={20} /></div>
                                    <div>
                                        <p className="text-[10px] uppercase text-slate-400 font-bold">Thời gian</p>
                                        <p className="font-bold text-slate-900 text-sm">{project.duration}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-slate-50 text-slate-600 rounded-xl"><Users size={20} /></div>
                                    <div>
                                        <p className="text-[10px] uppercase text-slate-400 font-bold">Quy mô</p>
                                        <p className="font-bold text-slate-900 text-sm">{project.team_size}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Tech Card */}
                        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                            <h3 className="font-bold text-slate-900 flex items-center gap-2 uppercase text-xs tracking-widest border-b border-slate-100 pb-4 mb-4">
                                <Terminal size={16} className="text-blue-600" /> Technologies
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {project.tech_stack.split(',').map((tech, i) => (
                                    <span key={i} className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-xs font-bold border border-blue-100">
                                        {tech.trim()}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </aside>
            </section>
        </main>
    );
}