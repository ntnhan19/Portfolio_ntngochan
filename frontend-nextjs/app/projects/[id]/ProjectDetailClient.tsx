// app/projects/[id]/ProjectDetailClient.tsx
'use client';

import { projects } from '../../../src/data/staticData';
import Link from 'next/link';
import { ArrowLeft, Github, ExternalLink, Calendar, Users, Tag, Code2, Zap, Target, ChevronRight, Share2, Bookmark } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface ProjectDetailClientProps {
    id: string;
}

export default function ProjectDetailClient({ id }: ProjectDetailClientProps) {
    const project = projects.find(p => p.id.toString() === id);

    if (!project) {
        return <div>Project not found</div>;
    }

    const techStack = project.tech_stack.split(',').map(t => t.trim());
    const highlights = project.highlights?.split(',').map(h => h.trim()) || [];

    // Related projects
    const relatedProjects = projects
        .filter(p => p.id !== project.id && p.category === project.category)
        .slice(0, 2);

    return (
        <main className="min-h-screen bg-slate-50">
            {/* Hero Section với Image Cover */}
            <section className="relative h-[500px] md:h-[600px] overflow-hidden bg-slate-900">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0">
                    <img
                        src={project.image_url}
                        alt={project.title}
                        className="w-full h-full object-cover opacity-40"
                        onError={(e) => {
                            e.currentTarget.style.display = 'none';
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-slate-900/60"></div>
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 flex items-end">
                    <div className="w-full p-8 md:p-12 pb-16">
                        <div className="max-w-6xl mx-auto">
                            {/* Breadcrumb */}
                            <div className="flex items-center gap-2 text-white/70 text-sm mb-6">
                                <Link href="/" className="hover:text-white transition-colors">Trang chủ</Link>
                                <ChevronRight size={16} />
                                <Link href="/#projects" className="hover:text-white transition-colors">Dự án</Link>
                                <ChevronRight size={16} />
                                <span className="text-white">{project.title}</span>
                            </div>

                            {/* Category Badge */}
                            <div className="inline-flex items-center gap-2 bg-blue-500/20 backdrop-blur-md border border-blue-400/30 px-4 py-2 rounded-full text-blue-300 font-semibold text-sm mb-6">
                                <Tag size={14} />
                                {project.category}
                            </div>

                            {/* Title */}
                            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight leading-tight">
                                {project.title}
                            </h1>

                            {/* Description */}
                            <p className="text-xl text-slate-300 max-w-3xl mb-8 leading-relaxed">
                                {project.description}
                            </p>

                            {/* Action Buttons */}
                            <div className="flex flex-wrap gap-4">
                                {project.repo_url && (
                                    <a
                                        href={project.repo_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-900 font-bold rounded-full hover:bg-slate-100 transition-all shadow-lg hover:scale-105"
                                    >
                                        <Github size={20} />
                                        Source Code
                                    </a>
                                )}
                                {project.demo_url && (
                                    <a
                                        href={project.demo_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-all shadow-lg hover:scale-105"
                                    >
                                        <ExternalLink size={20} />
                                        Live Demo
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content with Sidebar */}
            <section className="px-6 py-16">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-12 gap-12">
                        {/* Main Content - 8 cols */}
                        <div className="lg:col-span-8">
                            {/* Back Button */}
                            <Link
                                href="/#projects"
                                className="inline-flex items-center text-slate-600 hover:text-blue-600 font-medium mb-8 transition-colors group"
                            >
                                <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                                Quay lại danh sách dự án
                            </Link>

                            {/* Project Stats */}
                            <div className="grid grid-cols-3 gap-4 mb-12">
                                <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-2xl text-white text-center shadow-lg">
                                    <Calendar className="w-8 h-8 mx-auto mb-2" />
                                    <p className="text-sm text-blue-100 mb-1">Thời gian</p>
                                    <p className="font-bold text-lg">{project.duration || '3 tháng'}</p>
                                </div>
                                <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-2xl text-white text-center shadow-lg">
                                    <Users className="w-8 h-8 mx-auto mb-2" />
                                    <p className="text-sm text-purple-100 mb-1">Team</p>
                                    <p className="font-bold text-lg">{project.team_size || 'Solo'}</p>
                                </div>
                                <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-2xl text-white text-center shadow-lg">
                                    <Code2 className="w-8 h-8 mx-auto mb-2" />
                                    <p className="text-sm text-green-100 mb-1">Tech Stack</p>
                                    <p className="font-bold text-lg">{techStack.length}</p>
                                </div>
                            </div>

                            {/* Main Article Content */}
                            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-12">
                                <article className="prose prose-lg max-w-none prose-slate
                                    prose-headings:scroll-mt-20
                                    prose-h2:text-3xl prose-h2:font-bold prose-h2:text-slate-900 prose-h2:mt-12 prose-h2:mb-6 prose-h2:border-l-4 prose-h2:border-blue-600 prose-h2:pl-6
                                    prose-h3:text-2xl prose-h3:font-bold prose-h3:text-slate-900 prose-h3:mt-10 prose-h3:mb-4
                                    prose-p:text-slate-600 prose-p:leading-relaxed prose-p:mb-6 prose-p:text-lg
                                    prose-a:text-blue-600 prose-a:font-medium prose-a:no-underline hover:prose-a:underline
                                    prose-strong:text-slate-900 prose-strong:font-bold
                                    prose-code:text-slate-800 prose-code:bg-slate-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-code:before:content-none prose-code:after:content-none
                                    prose-pre:bg-slate-900 prose-pre:text-slate-100 prose-pre:p-6 prose-pre:rounded-2xl prose-pre:overflow-x-auto prose-pre:my-8 prose-pre:text-sm prose-pre:font-mono prose-pre:shadow-xl
                                    prose-ul:list-disc prose-ul:list-inside prose-ul:space-y-2 prose-ul:mb-6 prose-ul:text-slate-600
                                    prose-ol:list-decimal prose-ol:list-inside prose-ol:space-y-2 prose-ol:mb-6 prose-ol:text-slate-600
                                    prose-li:text-slate-600
                                    prose-blockquote:border-l-4 prose-blockquote:border-purple-500 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-slate-600 prose-blockquote:my-8 prose-blockquote:text-lg prose-blockquote:bg-purple-50/50 prose-blockquote:p-6 prose-blockquote:rounded-r-xl
                                    prose-img:rounded-2xl prose-img:shadow-lg prose-img:my-8
                                ">
                                    <ReactMarkdown>
                                        {project.content}
                                    </ReactMarkdown>
                                </article>

                                {/* Share Section */}
                                <div className="mt-16 pt-8 border-t border-slate-200">
                                    <div className="flex items-center justify-between">
                                        <span className="text-slate-600 font-medium">Chia sẻ dự án:</span>
                                        <div className="flex gap-3">
                                            <button className="p-3 bg-slate-100 rounded-full hover:bg-blue-100 hover:text-blue-600 transition-colors">
                                                <Share2 size={20} />
                                            </button>
                                            <button className="p-3 bg-slate-100 rounded-full hover:bg-yellow-100 hover:text-yellow-600 transition-colors">
                                                <Bookmark size={20} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Related Projects */}
                            {relatedProjects.length > 0 && (
                                <div className="mt-12">
                                    <h3 className="text-2xl font-bold text-slate-900 mb-6">Dự án liên quan</h3>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        {relatedProjects.map(related => (
                                            <Link
                                                key={related.id}
                                                href={`/projects/${related.id}`}
                                                className="group bg-white rounded-2xl overflow-hidden border border-slate-200 hover:shadow-xl transition-all"
                                            >
                                                <div className="h-48 overflow-hidden bg-slate-100">
                                                    <img
                                                        src={related.image_url}
                                                        alt={related.title}
                                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                        onError={(e) => {
                                                            e.currentTarget.src = 'https://placehold.co/600x400/e2e8f0/64748b?text=Project';
                                                        }}
                                                    />
                                                </div>
                                                <div className="p-6">
                                                    <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md">
                                                        {related.category}
                                                    </span>
                                                    <h4 className="font-bold text-lg text-slate-900 mt-3 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                                                        {related.title}
                                                    </h4>
                                                    <p className="text-slate-600 text-sm line-clamp-2">
                                                        {related.description}
                                                    </p>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Sidebar - 4 cols */}
                        <aside className="lg:col-span-4">
                            <div className="sticky top-24 space-y-6">
                                {/* Tech Stack Card */}
                                <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-lg">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-2 bg-blue-100 rounded-xl">
                                            <Code2 className="text-blue-600" size={24} />
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-900">Tech Stack</h3>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {techStack.map((tech, i) => (
                                            <span
                                                key={i}
                                                className="bg-gradient-to-r from-blue-50 to-purple-50 text-slate-700 px-3 py-2 rounded-lg text-sm font-medium border border-slate-200 hover:border-blue-300 transition-colors"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Highlights Card */}
                                {highlights.length > 0 && (
                                    <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-3xl p-8 text-white shadow-xl">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="p-2 bg-white/20 backdrop-blur-sm rounded-xl">
                                                <Zap size={24} />
                                            </div>
                                            <h3 className="text-xl font-bold">Điểm nổi bật</h3>
                                        </div>
                                        <ul className="space-y-3">
                                            {highlights.map((highlight, i) => (
                                                <li key={i} className="flex items-start gap-3">
                                                    <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                                                    <span className="text-purple-50 leading-relaxed">{highlight}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Quick Actions */}
                                <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-lg">
                                    <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                        <Target className="text-green-600" size={24} />
                                        Links
                                    </h3>
                                    <div className="space-y-3">
                                        {project.repo_url && (
                                            <a
                                                href={project.repo_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors group"
                                            >
                                                <Github className="text-slate-700 group-hover:text-blue-600 transition-colors" size={20} />
                                                <span className="font-medium text-slate-700 group-hover:text-blue-600 transition-colors">
                                                    View Repository
                                                </span>
                                            </a>
                                        )}
                                        {project.demo_url && (
                                            <a
                                                href={project.demo_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors group"
                                            >
                                                <ExternalLink className="text-slate-700 group-hover:text-blue-600 transition-colors" size={20} />
                                                <span className="font-medium text-slate-700 group-hover:text-blue-600 transition-colors">
                                                    Live Demo
                                                </span>
                                            </a>
                                        )}
                                    </div>
                                </div>

                                {/* Project Info */}
                                <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200">
                                    <h3 className="text-lg font-bold text-slate-900 mb-4">Thông tin dự án</h3>
                                    <div className="space-y-4 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-slate-600">Danh mục:</span>
                                            <span className="font-bold text-slate-900">{project.category}</span>
                                        </div>
                                        {project.duration && (
                                            <div className="flex justify-between">
                                                <span className="text-slate-600">Thời gian:</span>
                                                <span className="font-bold text-slate-900">{project.duration}</span>
                                            </div>
                                        )}
                                        {project.team_size && (
                                            <div className="flex justify-between">
                                                <span className="text-slate-600">Team size:</span>
                                                <span className="font-bold text-slate-900">{project.team_size}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>
        </main>
    );
}