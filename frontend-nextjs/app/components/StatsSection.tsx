'use client';
import { motion } from 'framer-motion';
import { Code2, BookOpen, Award, Briefcase } from 'lucide-react';

const stats = [
    {
        label: "Dự án hoàn thành",
        value: "2+",
        icon: Code2,
        color: "from-blue-500 to-blue-600",
        description: "Production-ready projects"
    },
    {
        label: "Bài blog kỹ thuật",
        value: "12+",
        icon: BookOpen,
        color: "from-purple-500 to-purple-600",
        description: "Technical deep-dives"
    },
    {
        label: "Giải thưởng",
        value: "3",
        icon: Award,
        color: "from-yellow-500 to-orange-600",
        description: "Competition awards"
    },
    {
        label: "Chứng chỉ",
        value: "7",
        icon: Briefcase,
        color: "from-green-500 to-green-600",
        description: "Professional certifications"
    }
];

export default function StatsSection() {
    return (
        <section className="py-20 px-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-3">Thành tích nổi bật</h2>
                    <p className="text-slate-300">Hành trình phát triển của tôi qua con số</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="relative group"
                            >
                                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105">
                                    {/* Icon với gradient background */}
                                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
                                        <Icon size={24} className="text-white" />
                                    </div>

                                    {/* Số liệu lớn */}
                                    <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                                        {stat.value}
                                    </div>

                                    {/* Label */}
                                    <div className="text-sm font-semibold text-slate-200 mb-1">
                                        {stat.label}
                                    </div>

                                    {/* Description */}
                                    <div className="text-xs text-slate-400">
                                        {stat.description}
                                    </div>
                                </div>

                                {/* Glow effect on hover */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300 -z-10 rounded-2xl`}></div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}