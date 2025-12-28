'use client';

import { profile } from '../../src/data/staticData';
import Link from 'next/link';
import { ArrowLeft, Mail, Github, Linkedin, Target, Lightbulb, Rocket, Heart } from 'lucide-react';

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-20">
                <div className="max-w-4xl mx-auto px-6">
                    <Link href="/" className="inline-flex items-center text-white/80 hover:text-white mb-8">
                        <ArrowLeft size={20} className="mr-2" /> Quay lại trang chủ
                    </Link>
                    <h1 className="text-5xl font-bold mb-4">Về tôi</h1>
                    <p className="text-xl text-purple-100">
                        Hành trình trở thành Backend Developer
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-6 py-16">

                {/* Bio Section */}
                <section className="mb-16">
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                <Target className="text-purple-600" size={24} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900 mb-2">Giới thiệu</h2>
                                <p className="text-slate-600">Về tôi và hành trình học lập trình</p>
                            </div>
                        </div>

                        <div className="prose prose-slate max-w-none">
                            <p className="text-slate-700 leading-relaxed whitespace-pre-line text-lg">
                                {profile.bio}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Skills Grid */}
                <section className="mb-16">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                            <Lightbulb className="text-blue-600" size={24} />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900">Kỹ năng chuyên môn</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {[
                            {
                                title: "Backend Development",
                                skills: ["Go (Gin, GORM)", "Node.js (Express)", "RESTful API", "Microservices"],
                                color: "blue"
                            },
                            {
                                title: "Database & Storage",
                                skills: ["PostgreSQL", "Redis", "SQL Optimization", "Database Design"],
                                color: "green"
                            },
                            {
                                title: "AI & Machine Learning",
                                skills: ["LangChain", "RAG Pipeline", "Vector Database", "Gemini API"],
                                color: "purple"
                            },
                            {
                                title: "Tools & DevOps",
                                skills: ["Git & GitHub", "Docker", "Linux", "CI/CD Basics"],
                                color: "orange"
                            }
                        ].map((category, i) => (
                            <div key={i} className="bg-white p-6 rounded-xl border border-slate-200 hover:shadow-lg transition-shadow">
                                <h3 className="font-bold text-lg text-slate-900 mb-4">{category.title}</h3>
                                <ul className="space-y-2">
                                    {category.skills.map((skill, j) => (
                                        <li key={j} className="flex items-center text-slate-700">
                                            <span className={`w-2 h-2 bg-${category.color}-500 rounded-full mr-3`}></span>
                                            {skill}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Timeline */}
                <section className="mb-16">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                            <Rocket className="text-green-600" size={24} />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900">Hành trình học tập</h2>
                    </div>

                    <div className="space-y-8 relative before:absolute before:left-6 before:top-0 before:bottom-0 before:w-0.5 before:bg-slate-200">
                        {[
                            {
                                year: "2022",
                                title: "Bắt đầu học tại HUTECH",
                                desc: "Chọn chuyên ngành Kỹ thuật Phần mềm. Bắt đầu học Java và C# như các môn cơ bản."
                            },
                            {
                                year: "2023",
                                title: "Khám phá Backend Development",
                                desc: "Tìm hiểu về Node.js và Express. Xây dựng REST API đầu tiên. Học về database và SQL."
                            },
                            {
                                year: "2024",
                                title: "Chuyển sang Go & AI",
                                desc: "Học Golang để hiểu về performance. Tham gia dự án AI với LangChain và RAG. Đạt giải Hackathon."
                            },
                            {
                                year: "2025",
                                title: "Sẵn sàng đi làm",
                                desc: "Hoàn thành các đồ án lớn. Tìm kiếm cơ hội thực tập Backend Developer."
                            }
                        ].map((item, i) => (
                            <div key={i} className="relative pl-16">
                                <div className="absolute left-0 w-12 h-12 bg-white border-4 border-blue-500 rounded-full flex items-center justify-center font-bold text-blue-600 text-sm">
                                    {item.year}
                                </div>
                                <div className="bg-white p-6 rounded-xl border border-slate-200">
                                    <h3 className="font-bold text-lg text-slate-900 mb-2">{item.title}</h3>
                                    <p className="text-slate-600">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Values */}
                <section className="mb-16">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center">
                            <Heart className="text-pink-600" size={24} />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900">Giá trị cốt lõi</h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            {
                                title: "Học hỏi liên tục",
                                desc: "Công nghệ thay đổi nhanh, tôi luôn cập nhật kiến thức mới mỗi ngày."
                            },
                            {
                                title: "Code chất lượng",
                                desc: "Ưu tiên code clean, dễ maintain hơn là code nhanh nhưng khó đọc."
                            },
                            {
                                title: "Làm việc nhóm",
                                desc: "Tin rằng team work tạo ra sản phẩm tốt hơn làm việc một mình."
                            }
                        ].map((value, i) => (
                            <div key={i} className="bg-gradient-to-br from-slate-50 to-white p-6 rounded-xl border border-slate-200">
                                <h3 className="font-bold text-lg text-slate-900 mb-2">{value.title}</h3>
                                <p className="text-slate-600 text-sm">{value.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTA */}
                <section className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white">
                    <h2 className="text-2xl font-bold mb-4">Bạn muốn làm việc cùng tôi?</h2>
                    <p className="text-blue-100 mb-6">
                        Tôi đang tìm kiếm cơ hội thực tập Backend Developer. Hãy liên hệ!
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <a href={`mailto:${profile.email}`} className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-all inline-flex items-center gap-2">
                            <Mail size={18} />
                            Gửi Email
                        </a>
                        <a href={profile.github} target="_blank" className="px-6 py-3 bg-white/10 backdrop-blur text-white font-semibold rounded-lg hover:bg-white/20 transition-all inline-flex items-center gap-2 border border-white/20">
                            <Github size={18} />
                            GitHub
                        </a>
                        <a href={profile.linkedin} target="_blank" className="px-6 py-3 bg-white/10 backdrop-blur text-white font-semibold rounded-lg hover:bg-white/20 transition-all inline-flex items-center gap-2 border border-white/20">
                            <Linkedin size={18} />
                            LinkedIn
                        </a>
                    </div>
                </section>

            </div>
        </div>
    );
}