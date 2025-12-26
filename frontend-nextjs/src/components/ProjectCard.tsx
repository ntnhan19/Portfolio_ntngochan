import Link from 'next/link';
import { Github, ExternalLink, Code, Users, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface ProjectCardProps {
    project: {
        id: number;
        title: string;
        description: string;
        tech_stack: string;
        category: string;
        repo_url?: string;
        demo_url?: string;
        image_url?: string;
        metrics?: string;
        highlights?: string;
        duration?: string;
        team_size?: string;
    };
    index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
    // Parse metrics JSON
    let metrics: Record<string, string> = {};
    try {
        if (project.metrics) {
            metrics = JSON.parse(project.metrics);
        }
    } catch (e) {
        console.error('Failed to parse metrics:', e);
    }

    const highlights = project.highlights?.split(',').map(h => h.trim()) || [];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="group relative flex flex-col h-full bg-gray-900/90 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-900/20"
        >
            {/* Ảnh bìa */}
            <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-blue-900 to-gray-900">
                {project.image_url ? (
                    <Image
                        src={project.image_url}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                ) : (
                    <div className="flex items-center justify-center h-full">
                        <Code className="text-white/20 w-16 h-16" />
                    </div>
                )}

                {/* Badges phía trên */}
                <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
                    <span className="px-3 py-1 text-xs font-bold text-white bg-black/60 backdrop-blur-md rounded-full border border-white/10">
                        {project.category}
                    </span>
                    {project.team_size && (
                        <span className="px-3 py-1 text-xs font-medium text-white bg-purple-600/80 backdrop-blur-md rounded-full flex items-center gap-1">
                            <Users size={12} />
                            {project.team_size}
                        </span>
                    )}
                </div>

                {/* Highlights tags */}
                <div className="absolute bottom-3 left-3 flex flex-wrap gap-2">
                    {highlights.slice(0, 3).map((tag, i) => (
                        <span
                            key={i}
                            className="px-2 py-1 text-[10px] font-semibold text-white bg-blue-500/80 backdrop-blur-sm rounded"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* Nội dung */}
            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors line-clamp-2 leading-tight">
                    {project.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4 flex-grow line-clamp-3 leading-relaxed">
                    {project.description}
                </p>

                {/* ⭐ METRICS GRID - Điểm nhấn quan trọng */}
                {Object.keys(metrics).length > 0 && (
                    <div className="grid grid-cols-3 gap-2 mb-4 p-3 bg-white/5 rounded-lg border border-white/5">
                        {Object.entries(metrics).slice(0, 3).map(([key, value]) => (
                            <div key={key} className="text-center">
                                <div className="text-blue-400 font-bold text-lg leading-tight">{value}</div>
                                <div className="text-gray-500 text-[10px] uppercase tracking-wider mt-0.5">
                                    {key.replace(/_/g, ' ')}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div className="mt-auto space-y-4">
                    {/* Tech stack */}
                    <div className="flex items-start text-gray-500 text-xs py-3 border-t border-white/5">
                        <Code size={14} className="mr-2 text-purple-400 flex-shrink-0 mt-0.5" />
                        <span className="line-clamp-2 leading-relaxed">{project.tech_stack}</span>
                    </div>

                    {/* Duration */}
                    {project.duration && (
                        <div className="flex items-center text-gray-400 text-xs">
                            <Clock size={12} className="mr-2" />
                            Duration: {project.duration}
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-3">
                        <Link
                            href={`/projects/${project.id}`}
                            className="flex-1 flex items-center justify-center py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-all hover:shadow-lg hover:shadow-blue-500/30"
                        >
                            Chi tiết
                        </Link>
                        {project.repo_url && (
                            <a
                                href={project.repo_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2.5 bg-white/5 hover:bg-white/10 rounded-lg text-gray-300 hover:text-white transition-colors"
                                title="Source Code"
                            >
                                <Github size={20} />
                            </a>
                        )}
                        {project.demo_url && (
                            <a
                                href={project.demo_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2.5 bg-white/5 hover:bg-white/10 rounded-lg text-gray-300 hover:text-white transition-colors"
                                title="Live Demo"
                            >
                                <ExternalLink size={20} />
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}