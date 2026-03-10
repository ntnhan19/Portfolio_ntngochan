'use client';

import { profile, projects, certificates } from '../../src/data/staticData';
import Link from 'next/link';
import { ArrowLeft, Download, Mail, Phone, MapPin, Github, Linkedin, Globe, Calendar, Briefcase, GraduationCap, Award, Code2, Database, Server, Zap, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ResumePage() {
    const handlePrint = () => {
        window.print();
    };

    const education = {
        school: "Đại học Công nghệ TP.HCM (HUTECH)",
        degree: "Cử nhân Kỹ thuật Phần mềm",
        period: "2022 - 2026 (dự kiến)",
        gpa: "3.30/4.0",
        highlights: [
            "Chuyên ngành: Công Nghệ Phần Mềm",
            "Sinh viên 5 Tốt Cấp Khoa năm 2024",
            "Sinh viên Tiêu Biểu Cấp Khoa năm 2024",
            "Giải Ba Hackathon PIONE DREAM 2025"
        ]
    };

    const experience = [
        {
            title: "Backend Developer",
            company: "Personal & Academic Projects",
            period: "2025 - Hiện tại",
            description: "Phát triển các dự án thực tế để nâng cao kỹ năng Backend và AI, đạt điểm cao trong các môn đồ án",
            achievements: [
                "Xây dựng DHL Cinema - hệ thống booking với WebSocket, xử lý 100+ concurrent requests với Redis distributed lock",
                "Phát triển DocMentor - AI chatbot sử dụng RAG pipeline (LangChain + Pinecone + Gemini), đạt 9/10 điểm đồ án",
                "Tối ưu API response time từ 500ms xuống 120ms bằng Redis caching và query optimization",
                "Implement real-time seat locking với Socket.io, đạt zero double-booking trong load testing"
            ]
        },
        {
            title: "Tình nguyện viên IT",
            company: "Liên Chi Hội Khoa CNTT - HUTECH",
            period: "2024 - 2025",
            description: "Hỗ trợ kỹ thuật cho các sự kiện của khoa và hoạt động thiện nguyện",
            achievements: [
                "Tham gia tổ chức sự kiện Tết Đầy Đủ 2025 với 50+ tình nguyện viên",
                "Đạt giải Nhì Hội Thao bóng đá nữ toàn trường 2024"
            ]
        }
    ];

    const skills = {
        "Languages": ["JavaScript/TypeScript", "Go", "Java", "Python", "SQL"],
        "Backend Frameworks": ["Node.js (Express)", "Go (Gin, GORM)", "Java (Spring Boot)", "FastAPI"],
        "Database & Caching": ["PostgreSQL", "Redis", "Database Design", "Query Optimization"],
        "AI/ML": ["LangChain", "RAG Pipeline", "Vector Database (Pinecone)", "Google Gemini API"],
        "Real-time & Network": ["Socket.io", "WebSocket", "REST API", "Distributed Lock"],
        "Tools & DevOps": ["Git/GitHub", "Docker", "Postman", "Linux/Ubuntu"]
    };

    // Lấy 2 project chính từ data
    const topProjects = projects.slice(0, 2);

    // Lọc certificates theo type
    const awards = certificates.filter(cert => cert.type === 'Award' || cert.type === 'Title');
    const courses = certificates.filter(cert => cert.type === 'Course');

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header Navigation - Hidden in print */}
            <nav className="bg-white border-b border-slate-200 py-4 print:hidden">
                <div className="max-w-5xl mx-auto px-6 flex justify-between items-center">
                    <Link href="/" className="inline-flex items-center text-slate-600 hover:text-blue-600 transition-colors group">
                        <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                        Quay lại
                    </Link>
                    <button
                        onClick={handlePrint}
                        className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <Download size={18} />
                        Tải xuống PDF
                    </button>
                </div>
            </nav>

            {/* Resume Content - A4 style */}
            <div className="max-w-5xl mx-auto px-6 py-12 print:py-0">
                <div className="bg-white rounded-lg shadow-lg print:shadow-none print:rounded-none">
                    {/* Header Section */}
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-10 print:p-8">
                        <div className="flex items-start justify-between gap-6">
                            <div className="flex-1">
                                <h1 className="text-4xl font-bold mb-2 print:text-3xl">{profile.full_name}</h1>
                                <p className="text-xl text-blue-100 mb-4 print:text-lg">{profile.title}</p>

                                {/* Contact Info */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-blue-50">
                                    <a href={`mailto:${profile.email}`} className="flex items-center gap-2 hover:text-white transition-colors">
                                        <Mail size={16} />
                                        {profile.email}
                                    </a>
                                    <a href={profile.github} target="_blank" className="flex items-center gap-2 hover:text-white transition-colors">
                                        <Github size={16} />
                                        GitHub Profile
                                    </a>
                                    <a href={profile.linkedin} target="_blank" className="flex items-center gap-2 hover:text-white transition-colors">
                                        <Linkedin size={16} />
                                        LinkedIn Profile
                                    </a>
                                    <div className="flex items-center gap-2">
                                        <MapPin size={16} />
                                        TP. Hồ Chí Minh
                                    </div>
                                </div>
                            </div>

                            {/* Avatar - Hidden in print */}
                            <div className="hidden md:block print:hidden">
                                <div className="w-32 h-32 rounded-full border-4 border-white/30 overflow-hidden shadow-xl">
                                    <img
                                        src={profile.avatar}
                                        alt={profile.full_name}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.currentTarget.style.display = 'none';
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="p-10 print:p-8 space-y-8 print:space-y-6">
                        {/* Summary */}
                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b-2 border-blue-600 print:text-xl">
                                Mục tiêu nghề nghiệp
                            </h2>
                            <p className="text-slate-700 leading-relaxed text-justify">
                                Sinh viên năm 4 chuyên ngành Kỹ thuật Phần mềm tại HUTECH với nền tảng vững chắc về Backend Development.
                                Có kinh nghiệm xây dựng RESTful API với Go (Gin), Node.js (Express), Java (Spring Boot),
                                xử lý real-time với WebSocket, và tích hợp AI/ML với RAG pipeline.
                                Đang tìm kiếm cơ hội thực tập Backend Developer để học hỏi về hệ thống quy mô lớn,
                                microservices architecture và best practices từ đội ngũ senior developers.
                            </p>
                        </section>

                        {/* Education */}
                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b-2 border-blue-600 flex items-center gap-2 print:text-xl">
                                <GraduationCap size={24} className="text-blue-600" />
                                Học vấn
                            </h2>
                            <div className="space-y-2">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-900">{education.school}</h3>
                                        <p className="text-blue-600 font-medium">{education.degree}</p>
                                    </div>
                                    <span className="text-sm text-slate-500 font-medium">{education.period}</span>
                                </div>
                                <p className="text-slate-600">GPA: <span className="font-semibold">{education.gpa}</span></p>
                                <ul className="list-disc list-inside space-y-1 text-slate-700 ml-2">
                                    {education.highlights.map((item, i) => (
                                        <li key={i}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        </section>

                        {/* Experience */}
                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b-2 border-blue-600 flex items-center gap-2 print:text-xl">
                                <Briefcase size={24} className="text-blue-600" />
                                Kinh nghiệm
                            </h2>
                            <div className="space-y-6">
                                {experience.map((exp, i) => (
                                    <div key={i} className="space-y-2">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="text-lg font-bold text-slate-900">{exp.title}</h3>
                                                <p className="text-blue-600 font-medium">{exp.company}</p>
                                            </div>
                                            <span className="text-sm text-slate-500 font-medium">{exp.period}</span>
                                        </div>
                                        <p className="text-slate-600 italic">{exp.description}</p>
                                        <ul className="list-disc list-inside space-y-1 text-slate-700 ml-2">
                                            {exp.achievements.map((achievement, j) => (
                                                <li key={j}>{achievement}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Skills */}
                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b-2 border-blue-600 flex items-center gap-2 print:text-xl">
                                <Code2 size={24} className="text-blue-600" />
                                Kỹ năng
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {Object.entries(skills).map(([category, items]) => (
                                    <div key={category} className="space-y-2">
                                        <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wide">{category}</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {items.map((skill, i) => (
                                                <span key={i} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium border border-blue-100">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Projects */}
                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b-2 border-blue-600 flex items-center gap-2 print:text-xl">
                                <Zap size={24} className="text-blue-600" />
                                Dự án nổi bật
                            </h2>
                            <div className="space-y-5">
                                {topProjects.map((project, i) => (
                                    <div key={i} className="border-l-4 border-blue-600 pl-4 space-y-2">
                                        <div className="flex justify-between items-start gap-4">
                                            <h3 className="text-lg font-bold text-slate-900">{project.title}</h3>
                                            <div className="flex items-center gap-2 flex-shrink-0">
                                                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded font-semibold">
                                                    {project.category}
                                                </span>
                                            </div>
                                        </div>
                                        <p className="text-slate-600 text-sm italic">{project.duration} • {project.team_size}</p>
                                        <p className="text-slate-600 text-sm leading-relaxed">{project.description}</p>
                                        <div className="flex flex-wrap gap-1.5">
                                            {project.tech_stack.split(',').map((tech, j) => (
                                                <span key={j} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded font-medium">
                                                    {tech.trim()}
                                                </span>
                                            ))}
                                        </div>
                                        {project.highlights && (
                                            <div className="flex flex-wrap gap-2 pt-1">
                                                {project.highlights.split(',').map((highlight, j) => (
                                                    <span key={j} className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full font-medium">
                                                        ✓ {highlight.trim()}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                        {project.repo_url && (
                                            <div className="flex gap-4 text-sm pt-1">
                                                <a href={project.repo_url} target="_blank" className="text-blue-600 hover:underline flex items-center gap-1 print:text-blue-600">
                                                    <Github size={14} />
                                                    View Source Code
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Awards & Certifications */}
                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b-2 border-blue-600 flex items-center gap-2 print:text-xl">
                                <Award size={24} className="text-blue-600" />
                                Giải thưởng & Chứng chỉ
                            </h2>

                            {/* Awards */}
                            <div className="mb-4">
                                <h3 className="font-bold text-slate-800 mb-3">Giải thưởng & Danh hiệu</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {awards.map((cert, i) => (
                                        <div key={i} className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                                            <Award size={20} className="text-yellow-600 mt-0.5 flex-shrink-0" />
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-semibold text-slate-900 text-sm line-clamp-2">{cert.name}</h4>
                                                <p className="text-xs text-slate-600">{cert.issuer}</p>
                                                <p className="text-xs text-yellow-700 font-medium">{cert.date}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Courses */}
                            <div>
                                <h3 className="font-bold text-slate-800 mb-3">Chứng chỉ khóa học</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {courses.map((cert, i) => (
                                        <div key={i} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                                            <Award size={20} className="text-blue-600 mt-0.5 flex-shrink-0" />
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-semibold text-slate-900 text-sm line-clamp-2">{cert.name}</h4>
                                                <p className="text-xs text-slate-600">{cert.issuer}</p>
                                                <p className="text-xs text-blue-600 font-medium">{cert.date}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>

                        {/* Languages & Interests */}
                        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="font-bold text-slate-900 mb-3 text-lg">Ngôn ngữ</h3>
                                <ul className="space-y-2 text-slate-700">
                                    <li className="flex justify-between">
                                        <span>Tiếng Việt</span>
                                        <span className="font-semibold">Bản ngữ</span>
                                    </li>
                                    <li className="flex justify-between">
                                        <span>Tiếng Anh</span>
                                        <span className="font-semibold">Trung cấp (B1)</span>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900 mb-3 text-lg">Sở thích</h3>
                                <ul className="space-y-1 text-slate-700 list-disc list-inside">
                                    <li>Học công nghệ mới (Go, microservices)</li>
                                    <li>Đọc tech blog và documentation</li>
                                    <li>Tham gia cộng đồng developer</li>
                                    <li>Chơi thể thao (bóng đá)</li>
                                </ul>
                            </div>
                        </section>
                    </div>

                    {/* Footer */}
                    <div className="bg-slate-50 px-10 py-6 print:px-8 text-center border-t border-slate-200">
                        <p className="text-sm text-slate-600">
                            Portfolio: <a href="https://ntnhan19.github.io/Portfolio_ntngochan" className="text-blue-600 font-medium hover:underline">ntnhan19.github.io/Portfolio_ntngochan</a>
                            {" "} • {" "}
                            Cập nhật: <span className="font-medium">{new Date().toLocaleDateString('vi-VN')}</span>
                        </p>
                    </div>
                </div>
            </div>

            {/* Print Styles */}
            <style jsx global>{`
                @media print {
                    body {
                        print-color-adjust: exact;
                        -webkit-print-color-adjust: exact;
                    }
                    @page {
                        margin: 0.5cm;
                        size: A4;
                    }
                }
            `}</style>
        </div>
    );
}