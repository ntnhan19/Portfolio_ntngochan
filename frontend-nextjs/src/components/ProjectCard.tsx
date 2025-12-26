'use client';

import Link from 'next/link';
import { Project } from '../types/index';
import { Github, ExternalLink, Code, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="group relative flex flex-col h-full bg-gray-900/90 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden hover:border-blue-500/30 transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-900/20"
        >
            {/* 1. Phần Ảnh Bìa (Mới) */}
            <div className="relative h-48 w-full overflow-hidden bg-gray-800">
                {project.image_url ? (
                    <Image
                        src={project.image_url}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                ) : (
                    // Fallback nếu không có ảnh thì hiện gradient
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-gray-900 flex items-center justify-center">
                        <Code className="text-white/20 w-16 h-16" />
                    </div>
                )}
                {/* Badge Category */}
                <div className="absolute top-3 right-3">
                    <span className="px-3 py-1 text-xs font-bold text-white bg-black/60 backdrop-blur-md rounded-full border border-white/10">
                        {project.category}
                    </span>
                </div>
            </div>

            {/* 2. Nội dung */}
            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors line-clamp-1">
                    {project.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4 flex-grow line-clamp-3 leading-relaxed">
                    {project.description}
                </p>

                <div className="mt-auto space-y-4">
                    <div className="flex items-center text-gray-500 text-xs py-3 border-t border-white/5">
                        <Code size={14} className="mr-2 text-purple-400" />
                        <span className="truncate">{project.tech_stack}</span>
                    </div>

                    <div className="flex gap-3">
                        <Link
                            href={`/projects/${project.id}`}
                            className="flex-1 flex items-center justify-center py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
                        >
                            Chi tiết
                        </Link>
                        {project.repo_url && (
                            <a href={project.repo_url} target="_blank" className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-gray-300 hover:text-white transition-colors" title="Source Code">
                                <Github size={20} />
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}