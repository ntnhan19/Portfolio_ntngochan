import React from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, Download } from 'lucide-react';

export default function BrightChampsCv() {
    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Print Button */}
            <div className="fixed top-4 right-4 print:hidden">
                <button
                    onClick={handlePrint}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
                >
                    <Download size={18} />
                    Download PDF
                </button>
            </div>

            {/* A4 Container */}
            <div className="max-w-[21cm] mx-auto bg-white shadow-lg print:shadow-none">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8 print:p-6">
                    <h1 className="text-3xl font-bold mb-2">NGUYEN TRAN NGOC HAN</h1>
                    <p className="text-xl text-blue-100 mb-4">Coding Online Teacher</p>

                    <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center gap-2">
                            <Mail size={14} />
                            <span>ngochanpt2018@gmail.com</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Phone size={14} />
                            <span>0845065676</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin size={14} />
                            <span>Binh Thanh District, HCMC</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Github size={14} />
                            <span>github.com/ntnhan19</span>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="p-8 print:p-6 space-y-6">

                    {/* Professional Summary */}
                    <section>
                        <h2 className="text-xl font-bold text-gray-900 border-b-2 border-blue-600 pb-2 mb-3">
                            PROFESSIONAL SUMMARY
                        </h2>
                        <p className="text-gray-700 text-sm leading-relaxed text-justify">
                            Passionate 4th-year Software Engineering student with strong foundation in programming languages
                            (Python, Java, JavaScript, HTML/CSS) and hands-on experience building educational technology projects.
                            Demonstrated ability to explain complex technical concepts through team collaboration and peer mentoring.
                            Enthusiastic about inspiring young learners and making coding accessible through creative, interactive teaching methods.
                            Flexible schedule with commitment to student success and continuous learning.
                        </p>
                    </section>

                    {/* Education */}
                    <section>
                        <h2 className="text-xl font-bold text-gray-900 border-b-2 border-blue-600 pb-2 mb-3">
                            EDUCATION
                        </h2>
                        <div className="space-y-2">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-bold text-gray-900">HUTECH - Ho Chi Minh City University of Technology</h3>
                                    <p className="text-blue-600 font-semibold">Bachelor of Engineering in Software Engineering</p>
                                </div>
                                <span className="text-sm text-gray-600 font-medium">2022 - 2026 (Expected)</span>
                            </div>
                            <p className="text-gray-700 text-sm">GPA: <span className="font-semibold">3.4/4.0</span></p>
                            <ul className="list-disc list-inside text-gray-700 text-sm space-y-1 ml-2">
                                <li>Outstanding Student at Faculty Level (2024)</li>
                                <li>5-Excellence Student Award at Faculty Level (2024)</li>
                                <li>Third Prize - PIONE DREAM Hackathon 2025</li>
                                <li>Second Prize - Women's Football Tournament 2024</li>
                            </ul>
                        </div>
                    </section>

                    {/* Technical Skills */}
                    <section>
                        <h2 className="text-xl font-bold text-gray-900 border-b-2 border-blue-600 pb-2 mb-3">
                            TECHNICAL SKILLS
                        </h2>
                        <div className="space-y-3">
                            <div>
                                <h3 className="font-semibold text-gray-900 text-sm mb-2">Programming Languages:</h3>
                                <div className="flex flex-wrap gap-2">
                                    {['Python', 'Java', 'JavaScript', 'HTML/CSS', 'C#', 'Go', 'SQL'].map(skill => (
                                        <span key={skill} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-md text-xs font-medium border border-blue-200">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 text-sm mb-2">Frameworks & Technologies:</h3>
                                <div className="flex flex-wrap gap-2">
                                    {['Node.js', 'Express.js', 'React.js', 'ASP.NET Core', 'Spring Boot', 'FastAPI'].map(skill => (
                                        <span key={skill} className="px-3 py-1 bg-green-50 text-green-700 rounded-md text-xs font-medium border border-green-200">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 text-sm mb-2">Tools & Platforms:</h3>
                                <div className="flex flex-wrap gap-2">
                                    {['Git/GitHub', 'VS Code', 'Visual Studio', 'Zoom', 'PostgreSQL', 'SQL Server'].map(skill => (
                                        <span key={skill} className="px-3 py-1 bg-purple-50 text-purple-700 rounded-md text-xs font-medium border border-purple-200">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Relevant Experience */}
                    <section>
                        <h2 className="text-xl font-bold text-gray-900 border-b-2 border-blue-600 pb-2 mb-3">
                            RELEVANT EXPERIENCE
                        </h2>

                        <div className="space-y-4">
                            {/* Project Lead Experience */}
                            <div>
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h3 className="font-bold text-gray-900">Project Team Leader & Developer</h3>
                                        <p className="text-blue-600 text-sm font-semibold">Academic Projects - HUTECH</p>
                                    </div>
                                    <span className="text-sm text-gray-600">2024 - Present</span>
                                </div>
                                <ul className="list-disc list-inside text-gray-700 text-sm space-y-1 ml-2">
                                    <li>Led development teams of 3-4 members in building educational web applications (IELTS Learning System, Movie Booking Platform)</li>
                                    <li>Explained programming concepts and best practices to team members during code reviews and pair programming sessions</li>
                                    <li>Mentored junior team members on debugging techniques, clean code principles, and problem-solving approaches</li>
                                    <li>Presented technical solutions and project demonstrations to professors and peers, achieving high grades (9/10)</li>
                                    <li>Coordinated team workflow using Agile methodology and Git version control</li>
                                </ul>
                            </div>

                            {/* Volunteer Experience */}
                            <div>
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h3 className="font-bold text-gray-900">IT Volunteer</h3>
                                        <p className="text-blue-600 text-sm font-semibold">IT Faculty Association - HUTECH</p>
                                    </div>
                                    <span className="text-sm text-gray-600">2024 - 2025</span>
                                </div>
                                <ul className="list-disc list-inside text-gray-700 text-sm space-y-1 ml-2">
                                    <li>Provided technical support and guidance to 50+ students during faculty events and workshops</li>
                                    <li>Collaborated with diverse teams to organize community service activities (Tết Đầy Đủ 2025)</li>
                                    <li>Demonstrated strong interpersonal skills through effective communication with students and event participants</li>
                                    <li>Developed patience and adaptability while assisting people with varying technical backgrounds</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Key Projects */}
                    <section>
                        <h2 className="text-xl font-bold text-gray-900 border-b-2 border-blue-600 pb-2 mb-3">
                            SELECTED PROJECTS
                        </h2>

                        <div className="space-y-4">
                            <div className="border-l-4 border-blue-600 pl-3">
                                <h3 className="font-bold text-gray-900">IELTS Learning Management System</h3>
                                <p className="text-xs text-gray-600 mb-1">ASP.NET Core, C#, Razor Pages, SQL Server | Apr - Jun 2025</p>
                                <p className="text-sm text-gray-700 mb-1">Educational platform for IELTS test preparation with interactive learning features</p>
                                <ul className="list-disc list-inside text-gray-700 text-xs space-y-0.5 ml-2">
                                    <li>Designed user-friendly interface for students to practice IELTS tests with real-time feedback</li>
                                    <li>Implemented countdown timer and progress tracking features to enhance learning experience</li>
                                </ul>
                            </div>

                            <div className="border-l-4 border-blue-600 pl-3">
                                <h3 className="font-bold text-gray-900">Movie Ticket Booking Website</h3>
                                <p className="text-xs text-gray-600 mb-1">React.js, Node.js, PostgreSQL, Socket.io | Mar - Jun 2025</p>
                                <p className="text-sm text-gray-700 mb-1">Full-stack web application with real-time seat selection and payment integration</p>
                                <ul className="list-disc list-inside text-gray-700 text-xs space-y-0.5 ml-2">
                                    <li>Built interactive frontend with smooth user experience and responsive design</li>
                                    <li>Developed RESTful API backend with real-time communication features</li>
                                </ul>
                            </div>

                            <div className="border-l-4 border-blue-600 pl-3">
                                <h3 className="font-bold text-gray-900">AI-Powered Document Assistant (DocMentor)</h3>
                                <p className="text-xs text-gray-600 mb-1">Python, LangChain, FastAPI, RAG Pipeline | 2025</p>
                                <p className="text-sm text-gray-700 mb-1">Intelligent chatbot using AI to answer questions from uploaded documents</p>
                                <ul className="list-disc list-inside text-gray-700 text-xs space-y-0.5 ml-2">
                                    <li>Integrated Google Gemini API for natural language processing capabilities</li>
                                    <li>Achieved 9/10 grade for innovative application of AI in education technology</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Teaching-Related Competencies */}
                    <section>
                        <h2 className="text-xl font-bold text-gray-900 border-b-2 border-blue-600 pb-2 mb-3">
                            KEY COMPETENCIES FOR TEACHING
                        </h2>
                        <ul className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                            <li className="flex items-start gap-2">
                                <span className="text-blue-600 font-bold">✓</span>
                                <span><strong>Clear Communication:</strong> Ability to break down complex programming concepts into simple, understandable explanations</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-blue-600 font-bold">✓</span>
                                <span><strong>Patience & Empathy:</strong> Experience working with diverse groups and adapting teaching style to individual needs</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-blue-600 font-bold">✓</span>
                                <span><strong>Creative Problem-Solving:</strong> Strong analytical skills with ability to make learning engaging through practical examples</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-blue-600 font-bold">✓</span>
                                <span><strong>Team Collaboration:</strong> Proven track record of working effectively in multicultural environments</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-blue-600 font-bold">✓</span>
                                <span><strong>Continuous Learning:</strong> Proactive in staying updated with new technologies and teaching methodologies</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-blue-600 font-bold">✓</span>
                                <span><strong>Time Management:</strong> Flexible schedule with ability to commit 20-40 hours/week including evenings and weekends</span>
                            </li>
                        </ul>
                    </section>

                    {/* Additional Information */}
                    <section>
                        <h2 className="text-xl font-bold text-gray-900 border-b-2 border-blue-600 pb-2 mb-3">
                            ADDITIONAL INFORMATION
                        </h2>
                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-1">Languages:</h3>
                                <ul className="space-y-0.5 ml-4">
                                    <li>• Vietnamese (Native)</li>
                                    <li>• English (Intermediate - B1)</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-1">Availability:</h3>
                                <ul className="space-y-0.5 ml-4">
                                    <li>• Flexible schedule</li>
                                    <li>• Available Mon-Fri: 17:30-21:30</li>
                                    <li>• Available Sat-Sun: All day</li>
                                    <li>• Can commit 20-40 hours/week</li>
                                </ul>
                            </div>
                        </div>
                        <div className="mt-3">
                            <h3 className="font-semibold text-gray-900 mb-1">Why Teaching with BrightChamps:</h3>
                            <p className="text-sm text-gray-700 leading-relaxed">
                                I am passionate about inspiring young minds and believe that early exposure to coding can unlock incredible
                                potential. Having experienced the joy of problem-solving through programming, I want to share that excitement
                                with students aged 6-16. BrightChamps' mission to bridge the education gap through life skills aligns perfectly
                                with my values, and I am eager to contribute to making quality coding education accessible globally.
                            </p>
                        </div>
                    </section>

                </div>

                {/* Footer */}
                <div className="bg-gray-50 px-8 py-4 print:px-6 text-center border-t">
                    <p className="text-xs text-gray-600">
                        Portfolio: <span className="text-blue-600 font-medium">ntnhan19.github.io/Portfolio_ntngochan</span>
                        {" • "}
                        References available upon request
                    </p>
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
          .print\\:hidden {
            display: none !important;
          }
        }
      `}</style>
        </div>
    );
}