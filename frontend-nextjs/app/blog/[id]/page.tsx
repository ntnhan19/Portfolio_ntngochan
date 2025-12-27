import { blogPosts } from '../../../src/data/staticData';
import Link from 'next/link';
import { ArrowLeft, Calendar, Tag } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export async function generateStaticParams() {
    return blogPosts.map((post) => ({
        id: post.id.toString(),
    }));
}

export default async function BlogDetail({ params }: { params: Promise<{ id: string }> }) {
    // Await params để lấy id
    const { id } = await params;

    const post = blogPosts.find(p => p.id.toString() === id);

    if (!post) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-slate-900 mb-4">Không tìm thấy bài viết</h1>
                    <Link href="/" className="text-blue-600 hover:underline">← Quay lại trang chủ</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="max-w-4xl mx-auto px-6 py-12">
                <Link href="/" className="inline-flex items-center text-slate-600 hover:text-slate-900 mb-8 font-medium">
                    <ArrowLeft size={16} className="mr-2" /> Quay lại trang chủ
                </Link>

                <article className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-slate-200">
                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags.split(',').map((tag, i) => (
                                <span key={i} className="inline-flex items-center gap-1 text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-medium">
                                    <Tag size={12} />
                                    {tag.trim()}
                                </span>
                            ))}
                        </div>

                        <h1 className="text-4xl font-bold text-slate-900 mb-4">
                            {post.title}
                        </h1>

                        <div className="flex items-center gap-4 text-sm text-slate-600">
                            <span className="flex items-center gap-1">
                                <Calendar size={14} />
                                {post.date}
                            </span>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="prose prose-slate prose-lg max-w-none">
                        <ReactMarkdown
                            components={{
                                h2: ({ node, ...props }) => <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4" {...props} />,
                                h3: ({ node, ...props }) => <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3" {...props} />,
                                p: ({ node, ...props }) => <p className="text-slate-700 leading-relaxed mb-4" {...props} />,
                                code: ({ node, inline, ...props }: any) =>
                                    inline ?
                                        <code className="bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded text-sm font-mono" {...props} /> :
                                        <code className="block bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-sm font-mono" {...props} />,
                                ul: ({ node, ...props }) => <ul className="list-disc list-inside space-y-2 mb-4 text-slate-700" {...props} />,
                                ol: ({ node, ...props }) => <ol className="list-decimal list-inside space-y-2 mb-4 text-slate-700" {...props} />,
                                li: ({ node, ...props }) => <li className="leading-relaxed" {...props} />,
                                a: ({ node, ...props }) => <a className="text-blue-600 hover:text-blue-800 underline" {...props} />,
                                blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-blue-500 pl-4 italic text-slate-600 my-4" {...props} />,
                                table: ({ node, ...props }) => <div className="overflow-x-auto my-6"><table className="min-w-full divide-y divide-slate-200 border border-slate-200" {...props} /></div>,
                                th: ({ node, ...props }) => <th className="px-4 py-2 bg-slate-50 text-left text-sm font-semibold text-slate-900" {...props} />,
                                td: ({ node, ...props }) => <td className="px-4 py-2 text-sm text-slate-700 border-t border-slate-200" {...props} />,
                            }}
                        >
                            {post.content}
                        </ReactMarkdown>
                    </div>

                    {/* Footer */}
                    <div className="mt-12 pt-8 border-t border-slate-200">
                        <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium">
                            <ArrowLeft size={16} className="mr-2" />
                            Xem thêm bài viết khác
                        </Link>
                    </div>
                </article>
            </div>
        </div>
    );
}