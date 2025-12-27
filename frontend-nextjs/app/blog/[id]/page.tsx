import { blogPosts } from '../../../src/data/staticData';
import Link from 'next/link';
import { ArrowLeft, Calendar, Tag } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
    return blogPosts.map((post) => ({
        id: post.id.toString(),
    }));
}

export default async function BlogDetail({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const post = blogPosts.find(p => p.id.toString() === id);

    if (!post) {
        notFound();
    }

    const tags = post.tags.split(',');

    return (
        <main className="min-h-screen bg-slate-50">
            {/* Hero với ảnh cover */}
            <section className="relative h-96 md:h-[500px] overflow-hidden">
                <img
                    src={post.cover_image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-white">
                    <div className="max-w-5xl mx-auto">
                        <div className="flex flex-wrap gap-3 mb-4">
                            {tags.map((tag, i) => (
                                <span key={i} className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
                                    {tag.trim()}
                                </span>
                            ))}
                        </div>
                        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight">
                            {post.title}
                        </h1>
                        <div className="flex items-center gap-2 text-white/80">
                            <Calendar size={18} />
                            <span>{post.date}</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="px-6 py-12">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-12">
                        <Link
                            href="/#blog"
                            className="inline-flex items-center text-slate-600 hover:text-blue-600 font-medium mb-10 transition-colors"
                        >
                            <ArrowLeft size={20} className="mr-2" />
                            Quay lại bài viết
                        </Link>

                        <div className="prose prose-lg max-w-none prose-slate">
                            <ReactMarkdown
                                components={{
                                    h1: ({ children }) => <h1 className="text-4xl font-bold text-slate-900 mt-12 mb-6">{children}</h1>,
                                    h2: ({ children }) => <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6 flex items-center gap-3"><span className="w-2 h-8 bg-blue-600 rounded-full"></span>{children}</h2>,
                                    h3: ({ children }) => <h3 className="text-2xl font-bold text-slate-900 mt-10 mb-4">{children}</h3>,
                                    p: ({ children }) => <p className="text-slate-600 leading-relaxed mb-6 text-lg">{children}</p>,
                                    ul: ({ children }) => <ul className="list-disc list-inside space-y-3 mb-6 text-slate-600">{children}</ul>,
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
                                        <blockquote className="border-l-4 border-purple-500 pl-6 italic text-slate-600 my-8 text-lg bg-purple-50/50 p-4 rounded-r-lg">
                                            {children}
                                        </blockquote>
                                    ),
                                }}
                            >
                                {post.content}
                            </ReactMarkdown>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}