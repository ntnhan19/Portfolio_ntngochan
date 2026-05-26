'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Filter, Search, Tag } from 'lucide-react';

import { projects } from '../../src/data/staticData';
import { ProjectCard } from '@/src/components/projects/ProjectCard';

export default function ProjectsPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedTech, setSelectedTech] = useState<string | null>(null);

    const categories = Array.from(new Set(projects.map((project) => project.category)));
    const allTechs = Array.from(new Set(projects.flatMap((project) => project.tech_stack)));

    const filteredProjects = useMemo(() => {
        return projects.filter((project) => {
            const matchesSearch =
                project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                project.description.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = !selectedCategory || project.category === selectedCategory;
            const matchesTech = !selectedTech || project.tech_stack.includes(selectedTech);

            return matchesSearch && matchesCategory && matchesTech;
        });
    }, [searchTerm, selectedCategory, selectedTech]);

    const clearFilters = () => {
        setSearchTerm('');
        setSelectedCategory(null);
        setSelectedTech(null);
    };

    return (
        <div className="min-h-screen" style={{ background: 'var(--cream)', color: 'var(--ink)' }}>
            <section
                className="relative overflow-hidden"
                style={{ borderBottom: '1px solid var(--parchment)', background: 'var(--warm-white)' }}
            >
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background:
                            'radial-gradient(circle at top left, rgba(181, 116, 93, 0.12), transparent 34%), radial-gradient(circle at bottom right, rgba(157, 180, 160, 0.16), transparent 30%)',
                    }}
                />

                <div className="max-w-6xl mx-auto px-6 py-20 relative z-10">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 mb-8 text-sm font-semibold transition-colors"
                        style={{ color: 'var(--ink-soft)' }}
                    >
                        <ArrowLeft size={18} />
                        Back to home
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-3xl"
                    >
                        <span className="section-label block mb-3">Projects Archive</span>
                        <h1
                            className="text-5xl md:text-6xl mb-5"
                            style={{ fontFamily: 'var(--font-display)', color: 'var(--ink)' }}
                        >
                            Work that reflects how I build.
                        </h1>
                        <p className="text-lg leading-relaxed max-w-2xl" style={{ color: 'var(--ink-soft)' }}>
                            Browse projects by keyword, category, or tech stack. The filtering stays as the
                            collection grows, but the presentation now stays aligned with the rest of the site.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="mt-10 max-w-2xl"
                    >
                        <div className="relative">
                            <Search
                                className="absolute left-4 top-1/2 -translate-y-1/2"
                                size={18}
                                style={{ color: 'var(--ink-faint)' }}
                            />
                            <input
                                type="text"
                                placeholder="Search projects..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 rounded-2xl transition-all focus:outline-none"
                                style={{
                                    background: 'var(--cream)',
                                    border: '1px solid var(--parchment)',
                                    color: 'var(--ink)',
                                    boxShadow: '0 10px 30px rgba(44,40,37,0.05)',
                                }}
                            />
                        </div>
                    </motion.div>
                </div>
            </section>

            <div className="max-w-6xl mx-auto px-6 py-14">
                <div className="mb-12 space-y-6">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <Filter size={18} style={{ color: 'var(--ink-faint)' }} />
                            <h2
                                className="text-sm font-semibold uppercase tracking-wider"
                                style={{ color: 'var(--ink-faint)' }}
                            >
                                Category
                            </h2>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => setSelectedCategory(null)}
                                className="px-4 py-2 rounded-full text-sm font-medium transition-all"
                                style={{
                                    background: !selectedCategory ? 'var(--rose)' : 'var(--warm-white)',
                                    color: !selectedCategory ? 'var(--warm-white)' : 'var(--ink-soft)',
                                    border: !selectedCategory ? '1px solid var(--rose)' : '1px solid var(--parchment)',
                                }}
                            >
                                All ({projects.length})
                            </button>
                            {categories.map((category) => {
                                const count = projects.filter((project) => project.category === category).length;

                                return (
                                    <button
                                        key={category}
                                        onClick={() =>
                                            setSelectedCategory(category === selectedCategory ? null : category)
                                        }
                                        className="px-4 py-2 rounded-full text-sm font-medium transition-all"
                                        style={{
                                            background:
                                                selectedCategory === category ? 'var(--ink)' : 'var(--warm-white)',
                                            color:
                                                selectedCategory === category
                                                    ? 'var(--warm-white)'
                                                    : 'var(--ink-soft)',
                                            border:
                                                selectedCategory === category
                                                    ? '1px solid var(--ink)'
                                                    : '1px solid var(--parchment)',
                                        }}
                                    >
                                        {category} ({count})
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <Tag size={18} style={{ color: 'var(--ink-faint)' }} />
                            <h2
                                className="text-sm font-semibold uppercase tracking-wider"
                                style={{ color: 'var(--ink-faint)' }}
                            >
                                Technology
                            </h2>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {selectedTech && (
                                <button
                                    onClick={() => setSelectedTech(null)}
                                    className="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
                                    style={{
                                        background: 'var(--accent-bg)',
                                        color: 'var(--rose)',
                                        border: '1px solid var(--rose)',
                                    }}
                                >
                                    Clear {selectedTech}
                                </button>
                            )}
                            {allTechs.slice(0, 10).map((tech) => (
                                <button
                                    key={tech}
                                    onClick={() => setSelectedTech(tech === selectedTech ? null : tech)}
                                    className="px-3 py-1.5 rounded-lg text-sm font-medium transition-all"
                                    style={{
                                        background: selectedTech === tech ? 'var(--sage)' : 'var(--warm-white)',
                                        color: selectedTech === tech ? 'var(--warm-white)' : 'var(--ink-soft)',
                                        border:
                                            selectedTech === tech
                                                ? '1px solid var(--sage)'
                                                : '1px solid var(--parchment)',
                                    }}
                                >
                                    {tech}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {(searchTerm || selectedCategory || selectedTech) && (
                    <div className="mb-6 text-sm" style={{ color: 'var(--ink-soft)' }}>
                        Found <span style={{ color: 'var(--rose)', fontWeight: 700 }}>{filteredProjects.length}</span>{' '}
                        project{filteredProjects.length !== 1 ? 's' : ''}
                        {selectedCategory && (
                            <span>
                                {' '}
                                in <strong>{selectedCategory}</strong>
                            </span>
                        )}
                        {selectedTech && (
                            <span>
                                {' '}
                                using <strong>{selectedTech}</strong>
                            </span>
                        )}
                        {searchTerm && (
                            <span>
                                {' '}
                                for <strong>&quot;{searchTerm}&quot;</strong>
                            </span>
                        )}
                    </div>
                )}

                {filteredProjects.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProjects.map((project, index) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                index={index}
                                variant="default"
                            />
                        ))}
                    </div>
                ) : (
                    <div
                        className="text-center py-16 px-6 rounded-3xl"
                        style={{ background: 'var(--warm-white)', border: '1px solid var(--parchment)' }}
                    >
                        <h3
                            className="text-2xl mb-2"
                            style={{ fontFamily: 'var(--font-display)', color: 'var(--ink)' }}
                        >
                            No projects found
                        </h3>
                        <p className="mb-6" style={{ color: 'var(--ink-soft)' }}>
                            Try adjusting the filters or search term.
                        </p>
                        <button
                            onClick={clearFilters}
                            className="btn btn-primary"
                        >
                            Clear filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
