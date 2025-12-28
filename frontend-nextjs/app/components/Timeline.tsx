'use client';
import { motion } from 'framer-motion';
import { Calendar, Zap } from 'lucide-react';

const timelineData = [
    {
        quarter: "Q1 2024",
        title: "Nền tảng Backend với Java Spring Boot",
        description: "Học Spring Boot, JPA, RESTful API design. Xây dựng CRUD applications.",
        icon: "☕",
        color: "blue"
    },
    {
        quarter: "Q2 2024",
        title: "Dự án Cinema Booking System",
        description: "Node.js + Socket.io + Redis. Xử lý race condition với distributed lock.",
        icon: "🎬",
        color: "purple",
        highlight: true
    },
    {
        quarter: "Q3 2024",
        title: "Chuyển sang Golang",
        description: "Học Go fundamentals, Gin framework, goroutines. Performance-focused mindset.",
        icon: "🚀",
        color: "cyan"
    },
    {
        quarter: "Q4 2024",
        title: "RAG + AI Projects",
        description: "DocMentor với LangChain, Pinecone, Gemini API. Hiểu về vector embeddings.",
        icon: "🤖",
        color: "green",
        highlight: true
    },
    {
        quarter: "Q1 2025",
        title: "Microservices Architecture",
        description: "Đang học: Docker, Kubernetes, gRPC, message queues (dự kiến).",
        icon: "🏗️",
        color: "orange",
        future: true
    }
];

export default function Timeline() {
    return (
        <section className="py-20 px-6 bg-white">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-slate-900 flex items-center justify-center gap-3">
                        <Calendar className="text-blue-600" />
                        Lộ trình phát triển
                    </h2>
                    <p className="text-slate-600 mt-2">Hành trình học tập và trưởng thành</p>
                </div>

                <div className="relative">
                    {/* Vertical line */}
                    <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-200 via-purple-200 to-green-200"></div>

                    <div className="space-y-8">
                        {timelineData.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="relative pl-20"
                            >
                                {/* Icon bullet point */}
                                <div className={`absolute left-4 w-8 h-8 rounded-full flex items-center justify-center text-lg
                  ${item.future ? 'bg-slate-200 opacity-50' : 'bg-white shadow-lg'}
                  border-2 ${item.color === 'blue' ? 'border-blue-500' :
                                        item.color === 'purple' ? 'border-purple-500' :
                                            item.color === 'cyan' ? 'border-cyan-500' :
                                                item.color === 'green' ? 'border-green-500' :
                                                    'border-orange-500'
                                    }`}
                                >
                                    {item.icon}
                                </div>

                                {/* Content card */}
                                <div className={`p-6 rounded-xl border-2 transition-all hover:shadow-lg
                  ${item.highlight ? 'bg-gradient-to-br from-blue-50 to-purple-50 border-purple-300' :
                                        item.future ? 'bg-slate-50 border-slate-200 opacity-60' :
                                            'bg-white border-slate-200'}`}
                                >
                                    <div className="flex items-start justify-between mb-2">
                                        <span className={`text-xs font-bold px-3 py-1 rounded-full
                      ${item.future ? 'bg-slate-200 text-slate-600' : 'bg-blue-100 text-blue-700'}`}>
                                            {item.quarter}
                                        </span>
                                        {item.highlight && (
                                            <Zap size={16} className="text-yellow-500 animate-pulse" />
                                        )}
                                    </div>

                                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm text-slate-600 leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}