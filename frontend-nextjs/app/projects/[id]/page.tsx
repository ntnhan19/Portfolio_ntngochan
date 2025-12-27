import { projects } from '../../../src/data/staticData';
import Link from 'next/link';
import { ArrowLeft, Github, ExternalLink, Calendar, Users, Clock } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
    return projects.map((project) => ({
        id: project.id.toString(),
    }));
}

export default async function ProjectDetail({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const project = projects.find(p => p.id.toString() === id);

    if (!project) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-slate-50">
            {/* Hero Section - Gradient Background giống Home */}
            <section className="relative py-24 px-6 overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative max-w-5xl mx-auto text-center z-10">
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
                        {project.title}
                    </h1>
                    <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto font-light">
                        {project.description}
                    </p>
                </div>
            </section>

            {/* Main Content - White Card với shadow giống About section */}
            <section className="px-6 -mt-12 pb-24">
                <div className="max-w-5xl mx-auto">
                    <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
                        <div className="p-8 md:p-12">
                            {/* Back Button */}
                            <Link
                                href="/#projects"
                                className="inline-flex items-center text-slate-600 hover:text-blue-600 font-medium mb-10 transition-colors"
                            >
                                <ArrowLeft size={20} className="mr-2" />
                                Quay lại dự án
                            </Link>

                            {/* Meta Info - Style giống stats box */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                                <div className="bg-slate-50 rounded-2xl p-5 text-center border border-slate-100">
                                    <Calendar className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                                    <p className="text-sm text-slate-500">Thời gian</p>
                                    <p className="font-bold text-slate-900">{project.duration || 'Không xác định'}</p>
                                </div>
                                <div className="bg-slate-50 rounded-2xl p-5 text-center border border-slate-100">
                                    <Users className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                                    <p className="text-sm text-slate-500">Thành viên</p>
                                    <p className="font-bold text-slate-900">{project.team_size || 'Cá nhân'}</p>
                                </div>
                                <div className="bg-slate-50 rounded-2xl p-5 text-center border border-slate-100">
                                    <span className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-bold">
                                        {project.category}
                                    </span>
                                </div>
                            </div>

                            {/* Tech Stack */}
                            <div className="mb-10">
                                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                                    <span className="w-2 h-6 bg-blue-600 rounded-full"></span>
                                    Công nghệ sử dụng
                                </h3>
                                <div className="flex flex-wrap gap-3">
                                    {project.tech_stack.split(',').map((tech, i) => (
                                        <span
                                            key={i}
                                            className="bg-gradient-to-r from-blue-50 to-purple-50 text-slate-700 px-4 py-2 rounded-full text-sm font-medium border border-slate-200"
                                        >
                                            {tech.trim()}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Highlights */}
                            {project.highlights && (
                                <div className="mb-10">
                                    <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                                        <span className="w-2 h-6 bg-purple-600 rounded-full"></span>
                                        Điểm nổi bật
                                    </h3>
                                    <div className="flex flex-wrap gap-3">
                                        {project.highlights.split(',').map((tag, i) => (
                                            <span
                                                key={i}
                                                className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-bold"
                                            >
                                                {tag.trim()}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Main Content - Prose đẹp như Home */}
                            <div className="prose prose-lg max-w-none prose-slate">
                                <ReactMarkdown
                                    components={{
                                        h2: ({ children }) => <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6 flex items-center gap-3"><span className="w-2 h-8 bg-blue-600 rounded-full"></span>{children}</h2>,
                                        h3: ({ children }) => <h3 className="text-2xl font-bold text-slate-900 mt-10 mb-4">{children}</h3>,
                                        p: ({ children }) => <p className="text-slate-600 leading-relaxed mb-6 text-lg">{children}</p>,
                                        ul: ({ children }) => <ul className="list-disc list-inside space-y-3 mb-6 text-slate-600">{children}</ul>,
                                        li: ({ children }) => <li className="leading-relaxed">{children}</li>,
                                        code: ({ node, className, children, ...props }) => {
                                            const match = /language-(\w+)/.exec(className || '');
                                            return !match ? (
                                                <code className="bg-slate-100 text-slate-800 px-2 py-1 rounded text-sm font-mono" {...props}>
                                                    {children}
                                                </code>
                                            ) : (
                                                <pre className="bg-slate-900 text-slate-100 p-6 rounded-2xl overflow-x-auto my-8 text-sm font-mono">
                                                    <code className={className} {...props}>
                                                        {children}
                                                    </code>
                                                </pre>
                                            );
                                        },
                                        blockquote: ({ children }) => (
                                            <blockquote className="border-l-4 border-blue-500 pl-6 italic text-slate-600 my-8 text-lg">
                                                {children}
                                            </blockquote>
                                        ),
                                    }}
                                >
                                    {project.content}
                                </ReactMarkdown>
                            </div>

                            {/* Action Buttons */}
                            <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col sm:flex-row gap-4">
                                {project.repo_url && (
                                    <a
                                        href={project.repo_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-3 px-8 py-4 bg-slate-900 text-white font-bold rounded-full hover:bg-slate-800 transition-all hover:scale-105 shadow-lg"
                                    >
                                        <Github size={22} />
                                        Xem Source Code
                                    </a>
                                )}
                                {project.demo_url && (
                                    <a
                                        href={project.demo_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-3 px-8 py-4 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-all hover:scale-105 shadow-lg"
                                    >
                                        <ExternalLink size={22} />
                                        Live Demo
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}