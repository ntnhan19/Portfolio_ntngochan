'use client';

import { profile, certificates, activities, projects } from '../../src/data/staticData';
import Link from 'next/link';
import {
    ArrowLeft,
    Mail,
    Github,
    Linkedin,
    Award,
    Trophy,
    Calendar,
    ExternalLink,
    Download,
    GraduationCap,
    Code2,
    Database,
    Cpu,
    Globe,
    Zap,
    BookOpen,
    Gamepad2,
    Heart
} from 'lucide-react';
import { motion } from 'framer-motion';

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
};

const stagger = {
    visible: { transition: { staggerChildren: 0.12 } }
};

const skillCategories = [
    {
        title: "Backend Development",
        icon: Code2,
        color: "from-blue-500 to-cyan-500",
        skills: ["Go (Gin, Fiber, GORM)", "Node.js (Express, NestJS)", "FastAPI (Python)", "Java Spring Boot", "RESTful & GraphQL API"]
    },
    {
        title: "Database & Infrastructure",
        icon: Database,
        color: "from-green-500 to-emerald-500",
        skills: ["PostgreSQL & MySQL", "Redis (Caching & Pub/Sub)", "MongoDB", "Database Design & Query Optimization"]
    },
    {
        title: "AI & Modern Tech",
        icon: Cpu,
        color: "from-purple-500 to-pink-500",
        skills: ["LangChain & LlamaIndex", "RAG Pipeline", "Vector DB (Pinecone, Qdrant)", "Gemini / OpenAI / Groq API", "WebSocket & Real-time Systems"]
    },
    {
        title: "DevOps & Tools",
        icon: Globe,
        color: "from-orange-500 to-red-500",
        skills: ["Docker & Docker Compose", "Git & GitHub Actions", "Linux & Bash Scripting", "Postman & API Testing"]
    }
];

const hobbies = [
    { icon: Gamepad2, title: "Bóng đá nữ", desc: "Thành viên đội bóng đá nữ Khoa CNTT – Giải Nhì Hội thao HUTECH 2024" },
    { icon: Heart, title: "Tình nguyện", desc: "Tham gia gói quà Tết, hoạt động cộng đồng" },
    { icon: BookOpen, title: "Đọc sách", desc: "Thích sách về công nghệ, tâm lý và phát triển bản thân" }
];

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30">
            {/* Hero Section - 2 cột cân đối */}
            <section className="relative py-20 px-6 overflow-hidden lg:py-28">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-pink-600/5" />

                <div className="max-w-7xl mx-auto relative z-10">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <Link href="/" className="inline-flex items-center text-slate-600 hover:text-blue-600 mb-10 font-medium group text-base">
                            <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition" />
                            Quay lại trang chủ
                        </Link>

                        {/* 2 cột: Avatar trái - Nội dung phải */}
                        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                            <div className="relative flex justify-center lg:justify-end">
                                <div className="relative">
                                    <div className="w-80 h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-12 border-white shadow-3xl ring-8 ring-blue-200/60">
                                        <img
                                            src={profile.avatar || '/placeholder-avatar.png'}
                                            alt={profile.full_name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-green-500 rounded-full border-8 border-white flex items-center justify-center shadow-2xl animate-pulse">
                                        <div className="w-8 h-8 bg-white rounded-full" />
                                    </div>
                                    <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-5 py-2.5 rounded-2xl shadow-xl">
                                        <span className="text-base font-bold text-green-600">Online • Ready to collaborate</span>
                                    </div>
                                </div>
                            </div>

                            <div className="text-center lg:text-left">
                                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 leading-tight">
                                    {profile.full_name}
                                </h1>
                                <p className="text-xl md:text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-8">
                                    {profile.title}
                                </p>

                                <div className="text-base md:text-lg text-slate-700 leading-relaxed space-y-4 prose prose-slate max-w-none">
                                    <div dangerouslySetInnerHTML={{ __html: profile.bio.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                                </div>
                            </div>
                        </div>

                        {/* Quick Stats */}
                        <motion.div
                            variants={stagger}
                            initial="hidden"
                            animate="visible"
                            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-16"
                        >
                            {[
                                { label: "Dự án nổi bật", value: projects.length + "+", icon: Code2 },
                                { label: "Chứng chỉ", value: certificates.length, icon: Award },
                                { label: "Giải thưởng", value: "3", icon: Trophy },
                                { label: "Blog posts", value: "11", icon: Zap }
                            ].map((stat, i) => (
                                <motion.div
                                    key={i}
                                    variants={fadeInUp}
                                    className="bg-white/80 backdrop-blur-md rounded-2xl py-8 px-6 shadow-xl border border-slate-200 hover:shadow-2xl hover:-translate-y-2 transition-all text-center"
                                >
                                    <stat.icon className="w-10 h-10 mx-auto mb-3 text-blue-600" />
                                    <div className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</div>
                                    <div className="text-base font-medium text-slate-600">{stat.label}</div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Technologies / Skills */}
            <section className="py-20 px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-14"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Công nghệ & Kỹ năng</h2>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">Những công nghệ tôi đã và đang thành thạo</p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {skillCategories.map((category, i) => {
                            const Icon = category.icon;
                            return (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    viewport={{ once: true }}
                                    className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-3xl p-8 shadow-xl border border-slate-200 hover:shadow-2xl hover:scale-105 transition-all"
                                >
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className={`p-4 bg-gradient-to-br ${category.color} rounded-2xl shadow-lg`}>
                                            <Icon className="w-8 h-8 text-white" />
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-900">{category.title}</h3>
                                    </div>
                                    <ul className="space-y-3">
                                        {category.skills.map((skill, j) => (
                                            <li key={j} className="flex items-center gap-3 text-slate-700">
                                                <Zap size={16} className="text-blue-500 flex-shrink-0" />
                                                <span className="text-base">{skill}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Education */}
            <section className="py-20 px-6 bg-slate-50">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        variants={fadeInUp}
                        viewport={{ once: true }}
                        className="bg-white rounded-3xl shadow-2xl p-10 border border-slate-200"
                    >
                        <div className="flex flex-col md:flex-row items-center gap-8">
                            <div className="p-5 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-xl">
                                <GraduationCap className="w-12 h-12 text-white" />
                            </div>
                            <div className="text-center md:text-left">
                                <h3 className="text-3xl font-bold text-slate-900 mb-2">
                                    Đại học Công nghệ TP.HCM (HUTECH)
                                </h3>
                                <p className="text-xl text-slate-700 mb-4">
                                    Cử nhân Kỹ thuật Phần mềm • 2025 – Hiện tại
                                </p>
                                <div className="flex flex-wrap gap-6 justify-center md:justify-start text-slate-600 text-base">
                                    <span className="flex items-center gap-2"><Calendar size={18} /> Năm 4 (Dự kiến tốt nghiệp 2026)</span>
                                    <span className="flex items-center gap-2"><Award size={18} /> GPA: 3.4/4.0</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Certificates & Awards */}
            <section className="py-20 px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-14"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Chứng chỉ & Giải thưởng</h2>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            Những thành tựu và chứng nhận chính thức tôi đã đạt được
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {certificates.map((cert: any, i: number) => (
                            <motion.div
                                key={cert.id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="group bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200 hover:shadow-2xl hover:-translate-y-3 transition-all"
                            >
                                <div className="h-56 bg-gradient-to-br from-blue-50 to-purple-50 p-6 flex items-center justify-center">
                                    <img
                                        src={cert.image_url}
                                        alt={cert.name}
                                        className="max-h-full max-w-full object-contain rounded-2xl shadow-lg group-hover:scale-105 transition-transform"
                                    />
                                </div>
                                <div className="p-7">
                                    <div className="flex items-center gap-3 mb-3">
                                        {cert.type === "Award" ? (
                                            <Trophy className="w-7 h-7 text-yellow-500" />
                                        ) : (
                                            <Award className="w-7 h-7 text-blue-600" />
                                        )}
                                        <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">{cert.type}</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-2 leading-tight">{cert.name}</h3>
                                    <p className="text-slate-600 mb-3 text-base">{cert.issuer}</p>
                                    <div className="flex items-center gap-2 text-slate-500 mb-5">
                                        <Calendar size={16} />
                                        <span className="text-sm">{cert.date}</span>
                                    </div>
                                    {cert.url && (
                                        <a
                                            href={cert.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 text-blue-600 font-semibold text-base hover:gap-3 transition-all"
                                        >
                                            Xem chứng chỉ <ExternalLink size={18} />
                                        </a>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Activities & Hobbies */}
            <section className="py-20 px-6 bg-slate-50">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-14"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Sở thích & Hoạt động ngoại khóa</h2>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            Tôi tin rằng sự cân bằng giữa công việc và cuộc sống là rất quan trọng
                        </p>
                    </motion.div>

                    {/* Hoạt động ngoại khóa (có ảnh) */}
                    <div className="grid md:grid-cols-2 gap-10 mb-16">
                        {activities.map((act: any, i: number) => (
                            <motion.div
                                key={act.id}
                                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="group bg-gradient-to-br from-slate-50 to-blue-50 rounded-3xl shadow-xl overflow-hidden border border-slate-200 hover:shadow-2xl transition-all"
                            >
                                <div className="h-72 overflow-hidden">
                                    <img
                                        src={act.image_url}
                                        alt={act.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                </div>
                                <div className="p-8">
                                    <h3 className="text-2xl font-bold text-slate-900 mb-3">{act.name}</h3>
                                    <p className="text-base font-semibold text-blue-600 mb-3">{act.role}</p>
                                    <p className="text-slate-700 leading-relaxed text-base mb-4">{act.description}</p>
                                    <div className="flex items-center gap-2 text-slate-500 text-sm">
                                        <Calendar size={16} />
                                        <span>{act.date}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Sở thích cá nhân - dạng card nhỏ */}
                    <div className="grid md:grid-cols-3 gap-8">
                        {hobbies.map((hobby, i) => {
                            const Icon = hobby.icon;
                            return (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    viewport={{ once: true }}
                                    className="bg-white rounded-3xl p-8 shadow-xl border border-slate-200 text-center hover:shadow-2xl hover:-translate-y-2 transition-all"
                                >
                                    <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
                                        <Icon className="w-8 h-8 text-blue-600" />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-3">{hobby.title}</h3>
                                    <p className="text-slate-600 text-base">{hobby.desc}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CTA Final */}
            <section className="py-28 px-6 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white relative overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-overlay filter blur-3xl opacity-20" />
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-overlay filter blur-3xl opacity-20" />
                </div>

                <div className="max-w-5xl mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                            Sẵn sàng bắt đầu hành trình Intern cùng team!
                        </h2>
                        <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
                            Tôi đang tìm kiếm cơ hội <strong>Backend Developer Intern</strong> tại các startup công nghệ, đặc biệt trong lĩnh vực AI/ML, hệ thống real-time và microservices.
                        </p>

                        <div className="flex flex-wrap justify-center gap-6 mt-10">
                            <a
                                href={`mailto:${profile.email}`}
                                className="px-8 py-4 bg-white text-slate-900 font-bold text-lg rounded-2xl hover:bg-blue-50 transition-all shadow-2xl hover:scale-105 flex items-center gap-3"
                            >
                                <Mail size={24} /> Liên hệ ngay
                            </a>
                            <Link
                                href="/resume"
                                className="px-8 py-4 bg-white/20 backdrop-blur-md border-2 border-white text-white font-bold text-lg rounded-2xl hover:bg-white/30 transition-all shadow-2xl hover:scale-105 flex items-center gap-3"
                            >
                                <Download size={24} /> Tải CV
                            </Link>
                        </div>

                        <div className="flex justify-center gap-8 mt-12">
                            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="p-4 bg-white/10 rounded-2xl hover:bg-white/20 transition backdrop-blur-sm">
                                <Github size={32} />
                            </a>
                            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="p-4 bg-white/10 rounded-2xl hover:bg-white/20 transition backdrop-blur-sm">
                                <Linkedin size={32} />
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}