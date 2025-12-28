'use client';

import { blogPosts } from '../../src/data/staticData';
import Link from 'next/link';
import { ArrowLeft, Calendar, Tag, BookOpen } from 'lucide-react';

export default function BlogListPage() {
    // Group blogs by tags
    const allTags = Array.from(new Set(blogPosts.flatMap(post => post.tags.split(',').map(t => t.trim()))));

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-20">
                <div className="max-w-6xl mx-auto px-6">
                    <Link href="/" className="inline-flex items-center text-white/80 hover:text-white mb-8">
                        <ArrowLeft size={20} className="mr-2" /> Quay lại trang chủ
                    </Link>

                    <div className="flex items-center gap-4 mb-4">
                        <BookOpen size={48} />
                        <div>
                            <h1 className="text-5xl font-bold">Blog</h1>
                            <p className="text-xl text-green-100 mt-2">
                                {blogPosts.length} bài viết về Java, JavaScript và Lập trình
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-6xl mx-auto px-6 py-16">

                {/* Tags Filter */}
                <div className="mb-12">
                    <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Chủ đề</h2>
                    <div className="flex flex-wrap gap-2">
                        <Link
                            href="/blog"
                            className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-medium hover:bg-blue-700 transition-colors"
                        >
                            Tất cả ({blogPosts.length})
                        </Link>
                        {allTags.map(tag => {
                            const count = blogPosts.filter(p => p.tags.includes(tag)).length;
                            return (
                                <button
                                    key={tag}
                                    className="px-4 py-2 bg-white text-slate-700 rounded-full text-sm font-medium hover:bg-slate-100 border border-slate-200 transition-colors"
                                >
                                    {tag} ({count})
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Blog Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPosts.map((post) => (
                        <article
                            key={post.id}
                            className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:shadow-2xl hover:border-blue-300 transition-all duration-300 flex flex-col group"
                        >
                            {/* Cover Image */}
                            <div className="relative h-48 overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
                                <img
                                    src={post.cover_image}
                                    alt={post.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    onError={(e) => {
                                        e.currentTarget.src = 'https://placehold.co/600x400/e2e8f0/64748b?text=Blog+Post';
                                    }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>

                            {/* Content */}
                            <div className="p-6 flex flex-col flex-grow">
                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 mb-3">
                                    {post.tags.split(',').slice(0, 2).map((tag, i) => (
                                        <span
                                            key={i}
                                            className="inline-flex items-center gap-1 text-xs font-semibold bg-blue-50 text-blue-600 px-2.5 py-1 rounded-md"
                                        >
                                            <Tag size={10} />
                                            {tag.trim()}
                                        </span>
                                    ))}
                                </div>

                                {/* Title */}
                                <h2 className="font-bold text-xl text-slate-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors leading-tight">
                                    {post.title}
                                </h2>

                                {/* Summary */}
                                <p className="text-slate-600 text-sm mb-4 line-clamp-3 flex-grow leading-relaxed">
                                    {post.summary}
                                </p>

                                {/* Meta */}
                                <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
                                    <span className="flex items-center text-xs text-slate-500 gap-1">
                                        <Calendar size={12} />
                                        {post.date}
                                    </span>
                                    <Link
                                        href={`/blog/${post.id}`}
                                        className="text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors"
                                    >
                                        Đọc tiếp →
                                    </Link>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                {/* Stats */}
                <div className="mt-16 grid md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-xl border border-slate-200 text-center">
                        <div className="text-3xl font-bold text-blue-600 mb-2">{blogPosts.length}</div>
                        <div className="text-slate-600 text-sm">Tổng số bài viết</div>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-slate-200 text-center">
                        <div className="text-3xl font-bold text-green-600 mb-2">{allTags.length}</div>
                        <div className="text-slate-600 text-sm">Chủ đề</div>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-slate-200 text-center">
                        <div className="text-3xl font-bold text-purple-600 mb-2">2</div>
                        <div className="text-slate-600 text-sm">Ngôn ngữ chính</div>
                    </div>
                </div>

            </div>
        </div>
    );
}