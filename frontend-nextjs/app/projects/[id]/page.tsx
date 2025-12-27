import { projects } from '../../../src/data/staticData';
import Link from 'next/link';
import { ArrowLeft, Github, Calendar, ExternalLink } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export async function generateStaticParams() {
    return projects.map((project) => ({
        id: project.id.toString(),
    }));
}

export default async function ProjectDetail({ params }: { params: Promise<{ id: string }> }) {
    
    const { id } = await params; 
    
    const project = projects.find(p => p.id.toString() === id);

    if (!project) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-slate-900 mb-4">Không tìm thấy dự án</h1>
                    <Link href="/" className="text-blue-600 hover:underline">
                        ← Quay lại trang chủ
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">{project.title}</h1>
                    <p className="text-blue-100 text-lg">{project.description}</p>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-6 py-12 -mt-8">
                <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl border border-slate-200">

                    <Link
                        href="/"
                        className="inline-flex items-center text-slate-600 hover:text-slate-900 mb-8 font-medium"
                    >
                        <ArrowLeft size={16} className="mr-2" /> Quay lại trang chủ
                    </Link>

                    {/* Meta Info */}
                    <div className="flex flex-wrap items-center gap-4 mb-8 pb-6 border-b border-slate-200">
                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                            {project.category}
                        </span>

                        {project.team_size && (
                            <span className="text-sm text-slate-600">
                                👥 {project.team_size}
                            </span>
                        )}

                        {project.duration && (
                            <span className="text-sm text-slate-600">
                                ⏱️ {project.duration}
                            </span>
                        )}
                    </div>

                    {/* Tech Stack */}
                    <div className="mb-8 p-4 bg-slate-50 rounded-lg border border-slate-200">
                        <h3 className="text-sm font-semibold text-slate-700 mb-2">Công nghệ sử dụng:</h3>
                        <p className="text-slate-900 font-medium">{project.tech_stack}</p>
                    </div>

                    {/* Highlights */}
                    {project.highlights && (
                        <div className="mb-8">
                            <h3 className="text-sm font-semibold text-slate-700 mb-3">Điểm nổi bật:</h3>
                            <div className="flex flex-wrap gap-2">
                                {project.highlights.split(',').map((tag, i) => (
                                    <span
                                        key={i}
                                        className="bg-purple-50 text-purple-700 px-3 py-1 rounded-md text-sm font-medium border border-purple-200"
                                    >
                                        {tag.trim()}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Content */}
                    <div className="prose prose-slate prose-lg max-w-none mt-8">
                        <ReactMarkdown
                            components={{
                                h2: ({ node, ...props }) => <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4" {...props} />,
                                h3: ({ node, ...props }) => <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3" {...props} />,
                                p: ({ node, ...props }) => <p className="text-slate-700 leading-relaxed mb-4" {...props} />,
                                code: ({ node, inline, ...props }: any) =>
                                    inline ?
                                        <code className="bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded text-sm font-mono" {...props} /> :
                                        <code className="block bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-sm font-mono my-4" {...props} />,
                                ul: ({ node, ...props }) => <ul className="list-disc list-inside space-y-2 mb-4 text-slate-700" {...props} />,
                                ol: ({ node, ...props }) => <ol className="list-decimal list-inside space-y-2 mb-4 text-slate-700" {...props} />,
                                li: ({ node, ...props }) => <li className="leading-relaxed" {...props} />,
                                a: ({ node, ...props }) => <a className="text-blue-600 hover:text-blue-800 underline" {...props} />,
                                blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-blue-500 pl-4 italic text-slate-600 my-4" {...props} />,
                            }}
                        >
                            {project.content}
                        </ReactMarkdown>
                    </div>

                    {/* Links */}
                    <div className="mt-12 pt-8 border-t border-slate-200 flex gap-4">
                        {project.repo_url && (
                            <a
                                href={project.repo_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800 transition-all"
                            >
                                <Github size={18} />
                                Xem Source Code
                            </a>
                        )}

                        {project.demo_url && (
                            <a
                                href={project.demo_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all"
                            >
                                <ExternalLink size={18} />
                                Live Demo
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}