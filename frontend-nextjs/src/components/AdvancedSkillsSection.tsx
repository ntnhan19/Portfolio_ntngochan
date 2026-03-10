'use client';
import { motion } from 'framer-motion';
import { Server, Database, Brain, Globe, Code2, Cpu } from 'lucide-react';

const skillGroups = [
    {
        title: "Backend Core",
        icon: <Server className="text-blue-500" />,
        skills: ["Node.js", "Express.js", "RESTful APIs", "Python"],
        className: "md:col-span-2",
    },
    {
        title: "Databases",
        icon: <Database className="text-emerald-500" />,
        skills: ["PostgreSQL", "Prisma ORM", "SQL Server"],
        className: "md:col-span-1",
    },
    {
        title: "AI & LLM",
        icon: <Brain className="text-purple-500" />,
        skills: ["LangChain", "Pinecone", "Google Gemini API", "RAG Pipeline", "Vector DB"],
        className: "md:col-span-1",
    },
    {
        title: "Real-time",
        icon: <Globe className="text-orange-500" />,
        skills: ["Socket.io", "Real-time Updates"],
        className: "md:col-span-2",
    },
];

export default function AdvancedSkillsSection() {
    return (
        <section className="py-20 px-6 max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-12 flex items-center gap-3">
                <Cpu className="text-blue-600" /> Hệ sinh thái Kỹ thuật
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {skillGroups.map((group, i) => (
                    <motion.div
                        key={i}
                        whileHover={{ y: -5 }}
                        className={`${group.className} p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all`}
                    >
                        <div className="flex items-center gap-3 mb-4">
                            {group.icon}
                            <h3 className="font-bold text-slate-800 dark:text-slate-100">{group.title}</h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {group.skills.map(skill => (
                                <span key={skill} className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg text-sm font-medium">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}