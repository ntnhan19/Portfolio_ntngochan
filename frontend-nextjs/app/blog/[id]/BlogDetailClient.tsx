// app/blog/[id]/BlogDetailClient.tsx
'use client';

import { blogPosts } from '../../../src/data/staticData';
import Link from 'next/link';
import { ArrowLeft, Calendar, Tag, Clock, Share2, Bookmark, ChevronRight } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface BlogDetailClientProps {
    id: string;
}

export default function BlogDetailClient({ id }: BlogDetailClientProps) {
    const post = blogPosts.find(p => p.id.toString() === id);

    if (!post) {
        return <div>Post not found</div>;
    }

    const tags = post.tags.split(',');
    const currentIndex = blogPosts.findIndex(p => p.id === post.id);
    const nextPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
    const prevPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;

    return (
        <main className="min-h-screen bg-slate-50">
            {/* Hero với ảnh cover - Cải thiện */}
            <section className="relative h-[500px] md:h-[600px] overflow-hidden">
                <img
                    src={post.cover_image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                />
                {/* Gradient overlay mạnh hơn */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>

                {/* Content overlay */}
                <div className="absolute inset-0 flex items-end">
                    <div className="w-full p-8 md:p-12 pb-16">
                        <div className="max-w-4xl mx-auto">
                            {/* Breadcrumb */}
                            <div className="flex items-center gap-2 text-white/70 text-sm mb-6">
                                <Link href="/" className="hover:text-white transition-colors">Trang chủ</Link>
                                <ChevronRight size={16} />
                                <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
                                <ChevronRight size={16} />
                                <span className="text-white">Chi tiết</span>
                            </div>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-3 mb-6">
                                {tags.map((tag, i) => (
                                    <span key={i} className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-sm font-medium text-white border border-white/30">
                                        {tag.trim()}
                                    </span>
                                ))}
                            </div>

                            {/* Title */}
                            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight text-white leading-tight">
                                {post.title}
                            </h1>

                            {/* Meta info */}
                            <div className="flex flex-wrap items-center gap-6 text-white/90">
                                <div className="flex items-center gap-2">
                                    <Calendar size={18} />
                                    <span className="font-medium">{post.date}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock size={18} />
                                    <span>5 phút đọc</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content với sidebar */}
            <section className="px-6 py-16">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-12 gap-12">
                        {/* Main Content */}
                        <div className="lg:col-span-8">
                            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-12">
                                {/* Back button */}
                                <Link
                                    href="/blog"
                                    className="inline-flex items-center text-slate-600 hover:text-blue-600 font-medium mb-10 transition-colors group"
                                >
                                    <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                                    Quay lại danh sách
                                </Link>

                                {/* Article content */}
                                <article className="prose prose-lg max-w-none prose-slate
                                    prose-headings:scroll-mt-20
                                    prose-h1:text-4xl prose-h1:font-bold prose-h1:text-slate-900 prose-h1:mt-12 prose-h1:mb-6
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
                                        {post.content}
                                    </ReactMarkdown>
                                </article>

                                {/* Share section */}
                                <div className="mt-16 pt-8 border-t border-slate-200">
                                    <div className="flex items-center justify-between">
                                        <span className="text-slate-600 font-medium">Chia sẻ bài viết:</span>
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

                            {/* Navigation to prev/next posts */}
                            <div className="mt-12 grid md:grid-cols-2 gap-6">
                                {prevPost && (
                                    <Link href={`/blog/${prevPost.id}`} className="group bg-white p-6 rounded-2xl border border-slate-200 hover:shadow-xl transition-all">
                                        <div className="text-sm text-slate-500 mb-2 flex items-center gap-2">
                                            <ArrowLeft size={14} /> Bài trước
                                        </div>
                                        <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                                            {prevPost.title}
                                        </h3>
                                    </Link>
                                )}
                                {nextPost && (
                                    <Link href={`/blog/${nextPost.id}`} className="group bg-white p-6 rounded-2xl border border-slate-200 hover:shadow-xl transition-all md:text-right">
                                        <div className="text-sm text-slate-500 mb-2 flex items-center justify-end gap-2">
                                            Bài sau <ChevronRight size={14} />
                                        </div>
                                        <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                                            {nextPost.title}
                                        </h3>
                                    </Link>
                                )}
                            </div>
                        </div>

                        {/* Sidebar */}
                        <aside className="lg:col-span-4">
                            <div className="sticky top-24 space-y-6">
                                {/* About author */}
                                <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-8 rounded-3xl text-white shadow-xl">
                                    <h3 className="text-2xl font-bold mb-4">Về tác giả</h3>
                                    <p className="text-blue-100 mb-6 leading-relaxed">
                                        Backend Developer đam mê công nghệ, chuyên về Java, Golang và Node.js
                                    </p>
                                    <Link href="/" className="inline-flex items-center text-white font-medium hover:gap-3 transition-all">
                                        Xem portfolio <ChevronRight size={16} className="ml-1" />
                                    </Link>
                                </div>

                                {/* Related posts */}
                                <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-lg">
                                    <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                        <Tag className="text-blue-600" size={20} />
                                        Bài viết liên quan
                                    </h3>
                                    <div className="space-y-4">
                                        {blogPosts
                                            .filter(p => p.id !== post.id && p.tags.split(',').some(t => tags.includes(t)))
                                            .slice(0, 3)
                                            .map(relatedPost => (
                                                <Link
                                                    key={relatedPost.id}
                                                    href={`/blog/${relatedPost.id}`}
                                                    className="block p-4 rounded-xl hover:bg-slate-50 transition-colors group"
                                                >
                                                    <h4 className="font-semibold text-slate-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                                                        {relatedPost.title}
                                                    </h4>
                                                    <span className="text-xs text-slate-500">{relatedPost.date}</span>
                                                </Link>
                                            ))
                                        }
                                    </div>
                                </div>

                                {/* Tags cloud */}
                                <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-lg">
                                    <h3 className="text-xl font-bold text-slate-900 mb-6">Tags</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {tags.map((tag, i) => (
                                            <span key={i} className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors cursor-pointer">
                                                #{tag.trim()}
                                            </span>
                                        ))}
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