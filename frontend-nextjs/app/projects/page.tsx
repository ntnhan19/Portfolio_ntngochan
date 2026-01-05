'use client';

import { projects } from '../../src/data/staticData';
import Link from 'next/link';
import { ArrowLeft, Code2, Zap, Filter, Search, ExternalLink, Github, Calendar, Tag, ChevronRight } from 'lucide-react';
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';

export default function ProjectsPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedTech, setSelectedTech] = useState<string | null>(null);

    // Get unique categories and technologies
    const categories = Array.from(new Set(projects.map(p => p.category)));
    const allTechs = Array.from(new Set(projects.flatMap(p => p.tech_stack.split(',').map(t => t.trim()))));

    // Filter projects
    const filteredProjects = useMemo(() => {
        return projects.filter(project => {
            const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                project.description.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = !selectedCategory || project.category === selectedCategory;
            const matchesTech = !selectedTech || project.tech_stack.includes(selectedTech);
            return matchesSearch && matchesCategory && matchesTech;
        });
    }, [searchTerm, selectedCategory, selectedTech]);

    // Featured project (first one)
    const featuredProject = projects[0];

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white py-24 overflow-hidden">
                {/* Animated background */}
                <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <Link href="/" className="inline-flex items-center text-white/80 hover:text-white mb-8 transition-colors group">
                        <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                        Quay lại trang chủ
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-start gap-6 mb-8"
                    >
                        <div className="p-4 bg-white/10 backdrop-blur-sm rounded-2xl">
                            <Code2 size={48} className="text-blue-300" />
                        </div>
                        <div>
                            <h1 className="text-5xl md:text-6xl font-bold mb-4">
                                Dự án <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Nổi bật</span>
                            </h1>
                            <p className="text-xl text-blue-100 max-w-2xl">
                                {projects.length} dự án thực tế về Backend Development, AI và Lập trình mạng
                            </p>
                        </div>
                    </motion.div>

                    {/* Search Bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="max-w-2xl"
                    >
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                            <input
                                type="text"
                                placeholder="Tìm kiếm dự án..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                            />
                        </div>
                    </motion.div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-16">
                {/* Featured Project */}
                {!searchTerm && !selectedCategory && !selectedTech && (
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-16"
                    >
                        <div className="flex items-center gap-2 mb-6">
                            <Zap className="text-yellow-500" size={24} />
                            <h2 className="text-2xl font-bold text-slate-900">Dự án nổi bật</h2>
                        </div>

                        <Link href={`/projects/${featuredProject.id}`}>
                            <div className="relative group bg-white rounded-3xl overflow-hidden border border-slate-200 hover:shadow-2xl transition-all duration-500">
                                <div className="grid md:grid-cols-2 gap-0">
                                    {/* Image */}
                                    <div className="relative h-80 md:h-auto overflow-hidden">
                                        <img
                                            src={featuredProject.image_url}
                                            alt={featuredProject.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            onError={(e) => {
                                                e.currentTarget.src = 'https://placehold.co/800x600/e2e8f0/64748b?text=Featured+Project';
                                            }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                        <div className="absolute top-4 left-4">
                                            <span className="bg-yellow-500 text-slate-900 px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2">
                                                <Zap size={14} />
                                                Mới nhất
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-8 md:p-12 flex flex-col justify-center">
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                                                {featuredProject.category}
                                            </span>
                                        </div>

                                        <h3 className="font-bold text-3xl text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">
                                            {featuredProject.title}
                                        </h3>

                                        <p className="text-slate-600 mb-6 leading-relaxed text-lg">
                                            {featuredProject.description}
                                        </p>

                                        <div className="flex flex-wrap gap-2 mb-6">
                                            {featuredProject.tech_stack.split(',').slice(0, 5).map((tech, i) => (
                                                <span
                                                    key={i}
                                                    className="text-xs font-medium text-slate-500 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg"
                                                >
                                                    {tech.trim()}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="flex gap-3">
                                            {featuredProject.demo_url && (
                                                <span className="inline-flex items-center gap-2 text-blue-600 font-medium text-sm">
                                                    <ExternalLink size={16} />
                                                    Live Demo
                                                </span>
                                            )}
                                            {featuredProject.repo_url && (
                                                <span className="inline-flex items-center gap-2 text-slate-600 font-medium text-sm">
                                                    <Github size={16} />
                                                    Source Code
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </motion.section>
                )}

                {/* Filters */}
                <div className="mb-12 space-y-6">
                    {/* Category Filter */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <Filter size={18} className="text-slate-500" />
                            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Danh mục</h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => setSelectedCategory(null)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${!selectedCategory
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                                    : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
                                    }`}
                            >
                                Tất cả ({projects.length})
                            </button>
                            {categories.map(cat => {
                                const count = projects.filter(p => p.category === cat).length;
                                return (
                                    <button
                                        key={cat}
                                        onClick={() => setSelectedCategory(cat === selectedCategory ? null : cat)}
                                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === cat
                                            ? 'bg-purple-600 text-white shadow-lg shadow-purple-200'
                                            : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
                                            }`}
                                    >
                                        {cat} ({count})
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Tech Filter */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <Tag size={18} className="text-slate-500" />
                            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Công nghệ</h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {selectedTech && (
                                <button
                                    onClick={() => setSelectedTech(null)}
                                    className="px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200 transition-colors"
                                >
                                    ✕ {selectedTech}
                                </button>
                            )}
                            {allTechs.slice(0, 10).map(tech => (
                                <button
                                    key={tech}
                                    onClick={() => setSelectedTech(tech === selectedTech ? null : tech)}
                                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${selectedTech === tech
                                        ? 'bg-green-600 text-white'
                                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                        }`}
                                >
                                    {tech}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Results Count */}
                {(searchTerm || selectedCategory || selectedTech) && (
                    <div className="mb-6 text-slate-600">
                        Tìm thấy <span className="font-bold text-blue-600">{filteredProjects.length}</span> dự án
                        {selectedCategory && <span> trong danh mục <span className="font-bold">"{selectedCategory}"</span></span>}
                        {selectedTech && <span> sử dụng <span className="font-bold">"{selectedTech}"</span></span>}
                        {searchTerm && <span> cho từ khóa <span className="font-bold">"{searchTerm}"</span></span>}
                    </div>
                )}

                {/* Projects Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProjects.map((project, index) => (
                        <motion.article
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:shadow-2xl hover:border-blue-300 transition-all duration-300 flex flex-col group"
                        >
                            {/* Image */}
                            <div className="relative h-48 overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
                                <img
                                    src={project.image_url}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    onError={(e) => {
                                        e.currentTarget.src = 'https://placehold.co/600x400/e2e8f0/64748b?text=Project';
                                    }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                                {/* Overlay Buttons */}
                                <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                    {project.demo_url && (
                                        <a
                                            href={project.demo_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={(e) => e.stopPropagation()}
                                            className="p-3 bg-white rounded-full hover:bg-blue-50 transition-colors shadow-lg"
                                        >
                                            <ExternalLink size={18} className="text-slate-900" />
                                        </a>
                                    )}
                                    {project.repo_url && (
                                        <a
                                            href={project.repo_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={(e) => e.stopPropagation()}
                                            className="p-3 bg-white rounded-full hover:bg-blue-50 transition-colors shadow-lg"
                                        >
                                            <Github size={18} className="text-slate-900" />
                                        </a>
                                    )}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6 flex flex-col flex-grow">
                                {/* Category */}
                                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide mb-4 self-start">
                                    {project.category}
                                </span>

                                {/* Title */}
                                <h2 className="font-bold text-xl text-slate-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors leading-tight">
                                    {project.title}
                                </h2>

                                {/* Description */}
                                <p className="text-slate-600 text-sm mb-4 line-clamp-3 flex-grow leading-relaxed">
                                    {project.description}
                                </p>

                                {/* Tech Stack */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.tech_stack.split(',').slice(0, 3).map((tech, i) => (
                                        <span
                                            key={i}
                                            className="text-xs font-medium text-slate-500 bg-slate-50 border border-slate-200 px-2 py-1 rounded-md"
                                        >
                                            {tech.trim()}
                                        </span>
                                    ))}
                                    {project.tech_stack.split(',').length > 3 && (
                                        <span className="text-xs font-medium text-slate-400 px-2 py-1">
                                            +{project.tech_stack.split(',').length - 3}
                                        </span>
                                    )}
                                </div>

                                {/* Footer */}
                                <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
                                    <span className="flex items-center text-xs text-slate-500 gap-1">
                                        <Calendar size={12} />
                                        {project.duration || '2024'}
                                    </span>
                                    <Link
                                        href={`/projects/${project.id}`}
                                        className="text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1 hover:gap-2"
                                    >
                                        Chi tiết
                                        <ChevronRight size={16} />
                                    </Link>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>

                {/* Empty State */}
                {filteredProjects.length === 0 && (
                    <div className="text-center py-16">
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">Không tìm thấy dự án</h3>
                        <p className="text-slate-600 mb-6">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
                        <button
                            onClick={() => {
                                setSearchTerm('');
                                setSelectedCategory(null);
                                setSelectedTech(null);
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
                        <div className="text-4xl font-bold mb-2">{projects.length}</div>
                        <div className="text-blue-100">Tổng số dự án</div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-8 rounded-2xl text-white text-center shadow-lg">
                        <div className="text-4xl font-bold mb-2">{categories.length}</div>
                        <div className="text-purple-100">Danh mục</div>
                    </div>
                    <div className="bg-gradient-to-br from-green-500 to-green-600 p-8 rounded-2xl text-white text-center shadow-lg">
                        <div className="text-4xl font-bold mb-2">{allTechs.length}</div>
                        <div className="text-green-100">Công nghệ</div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}