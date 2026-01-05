'use client';

import { blogPosts } from '../../src/data/staticData';
import Link from 'next/link';
import { ArrowLeft, Calendar, Tag, BookOpen, Search, TrendingUp, Clock, Sparkles, ChevronLeft, ChevronRight, Grid, List } from 'lucide-react';
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BlogListPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTag, setSelectedTag] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const postsPerPage = 6;

    // Get unique tags
    const allTags = Array.from(new Set(blogPosts.flatMap(post => post.tags.split(',').map(t => t.trim()))));

    // Filter blogs
    const filteredBlogs = useMemo(() => {
        return blogPosts.filter(post => {
            const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                post.summary.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesTag = !selectedTag || post.tags.includes(selectedTag);
            return matchesSearch && matchesTag;
        });
    }, [searchTerm, selectedTag]);

    // Pagination
    const totalPages = Math.ceil(filteredBlogs.length / postsPerPage);
    const currentPosts = filteredBlogs.slice(
        (currentPage - 1) * postsPerPage,
        currentPage * postsPerPage
    );

    // Reset to page 1 when filters change
    useMemo(() => {
        setCurrentPage(1);
    }, [searchTerm, selectedTag]);

    const featuredBlog = blogPosts[0];

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white py-24 overflow-hidden">
                <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

                <div className="max-w-6xl mx-auto px-6 relative z-10">
                    <Link href="/" className="inline-flex items-center text-white/80 hover:text-white mb-8 transition-colors group">
                        <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                        Quay lại trang chủ
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6">
                            <BookOpen size={20} />
                            <span className="font-semibold">{blogPosts.length} Articles</span>
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold mb-4">
                            Tech <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Blog</span>
                        </h1>
                        <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
                            Backend Development, AI/ML và những kiến thức về lập trình
                        </p>

                        {/* Search Bar */}
                        <div className="max-w-2xl mx-auto">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm bài viết..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                                />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 py-16">
                {/* Filters & View Toggle */}
                <div className="mb-12 space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Tag size={18} className="text-slate-500" />
                            <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Chủ đề</h2>
                        </div>
                        
                        {/* View Mode Toggle */}
                        <div className="flex gap-2 bg-white rounded-lg p-1 border border-slate-200">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-2 rounded-md transition-all ${
                                    viewMode === 'grid' 
                                        ? 'bg-blue-600 text-white' 
                                        : 'text-slate-600 hover:bg-slate-100'
                                }`}
                            >
                                <Grid size={18} />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-2 rounded-md transition-all ${
                                    viewMode === 'list' 
                                        ? 'bg-blue-600 text-white' 
                                        : 'text-slate-600 hover:bg-slate-100'
                                }`}
                            >
                                <List size={18} />
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={() => setSelectedTag(null)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                                !selectedTag
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                                    : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
                            }`}
                        >
                            Tất cả ({blogPosts.length})
                        </button>
                        {allTags.map(tag => {
                            const count = blogPosts.filter(p => p.tags.includes(tag)).length;
                            return (
                                <button
                                    key={tag}
                                    onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                                        selectedTag === tag
                                            ? 'bg-purple-600 text-white shadow-lg shadow-purple-200'
                                            : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
                                    }`}
                                >
                                    {tag} ({count})
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Results count */}
                {(searchTerm || selectedTag) && (
                    <div className="mb-6 text-slate-600 text-center">
                        Tìm thấy <span className="font-bold text-blue-600">{filteredBlogs.length}</span> bài viết
                        {selectedTag && <span> trong chủ đề <span className="font-bold">"{selectedTag}"</span></span>}
                        {searchTerm && <span> cho từ khóa <span className="font-bold">"{searchTerm}"</span></span>}
                    </div>
                )}

                {/* Blog Grid/List */}
                <AnimatePresence mode="wait">
                    {viewMode === 'grid' ? (
                        <motion.div
                            key="grid"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
                        >
                            {currentPosts.map((post, index) => (
                                <motion.article
                                    key={post.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:shadow-2xl hover:border-blue-300 transition-all duration-300 flex flex-col group"
                                >
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

                                    <div className="p-6 flex flex-col flex-grow">
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

                                        <h2 className="font-bold text-xl text-slate-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors leading-tight">
                                            {post.title}
                                        </h2>

                                        <p className="text-slate-600 text-sm mb-4 line-clamp-3 flex-grow leading-relaxed">
                                            {post.summary}
                                        </p>

                                        <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
                                            <span className="flex items-center text-xs text-slate-500 gap-1">
                                                <Calendar size={12} />
                                                {post.date}
                                            </span>
                                            <Link
                                                href={`/blog/${post.id}`}
                                                className="text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors hover:gap-2 flex items-center"
                                            >
                                                Đọc tiếp →
                                            </Link>
                                        </div>
                                    </div>
                                </motion.article>
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="list"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="space-y-6 mb-12"
                        >
                            {currentPosts.map((post, index) => (
                                <motion.article
                                    key={post.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:shadow-xl hover:border-blue-300 transition-all group"
                                >
                                    <div className="grid md:grid-cols-3 gap-6 p-6">
                                        <div className="relative h-48 md:h-auto overflow-hidden rounded-xl">
                                            <img
                                                src={post.cover_image}
                                                alt={post.title}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                onError={(e) => {
                                                    e.currentTarget.src = 'https://placehold.co/600x400/e2e8f0/64748b?text=Blog';
                                                }}
                                            />
                                        </div>

                                        <div className="md:col-span-2 flex flex-col justify-center">
                                            <div className="flex flex-wrap gap-2 mb-3">
                                                {post.tags.split(',').slice(0, 3).map((tag, i) => (
                                                    <span
                                                        key={i}
                                                        className="text-xs font-semibold bg-blue-50 text-blue-600 px-2.5 py-1 rounded-md"
                                                    >
                                                        {tag.trim()}
                                                    </span>
                                                ))}
                                            </div>

                                            <h2 className="font-bold text-2xl text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                                                {post.title}
                                            </h2>

                                            <p className="text-slate-600 mb-4 line-clamp-2 leading-relaxed">
                                                {post.summary}
                                            </p>

                                            <div className="flex items-center justify-between">
                                                <span className="flex items-center text-sm text-slate-500 gap-2">
                                                    <Calendar size={14} />
                                                    {post.date}
                                                    <span className="mx-2">•</span>
                                                    <Clock size={14} />
                                                    5 phút đọc
                                                </span>
                                                <Link
                                                    href={`/blog/${post.id}`}
                                                    className="text-blue-600 font-bold hover:gap-2 flex items-center transition-all"
                                                >
                                                    Đọc tiếp →
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </motion.article>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="p-3 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            <ChevronLeft size={20} />
                        </button>

                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                                    currentPage === page
                                        ? 'bg-blue-600 text-white shadow-lg'
                                        : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                                }`}
                            >
                                {page}
                            </button>
                        ))}

                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="p-3 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                )}

                {/* Empty state */}
                {filteredBlogs.length === 0 && (
                    <div className="text-center py-16">
                        <div className="text-6xl mb-4">📝</div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">Không tìm thấy bài viết</h3>
                        <p className="text-slate-600 mb-6">Thử thay đổi từ khóa hoặc bộ lọc của bạn</p>
                        <button
                            onClick={() => {
                                setSearchTerm('');
                                setSelectedTag(null);
                            }}
                            className="px-6 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors"
                        >
                            Xóa bộ lọc
                        </button>
                    </div>
                )}

                {/* Stats Summary */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-16 grid md:grid-cols-3 gap-6"
                >
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-8 rounded-2xl text-white text-center shadow-lg">
                        <div className="text-4xl font-bold mb-2">{blogPosts.length}</div>
                        <div className="text-blue-100">Tổng số bài viết</div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-8 rounded-2xl text-white text-center shadow-lg">
                        <div className="text-4xl font-bold mb-2">{allTags.length}</div>
                        <div className="text-purple-100">Chủ đề</div>
                    </div>
                    <div className="bg-gradient-to-br from-green-500 to-green-600 p-8 rounded-2xl text-white text-center shadow-lg">
                        <div className="text-4xl font-bold mb-2">2024</div>
                        <div className="text-green-100">Năm bắt đầu viết</div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}