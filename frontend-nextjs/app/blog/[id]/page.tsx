import { blogPosts } from '../../../src/data/staticData';
import { notFound } from 'next/navigation';
import BlogDetailClient from './BlogDetailClient';

// Server Component - generateStaticParams phải ở đây
export async function generateStaticParams() {
    return blogPosts.map((post) => ({
        id: post.id.toString(),
    }));
}

// Server Component để handle params
export default async function BlogDetail({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const post = blogPosts.find(p => p.id.toString() === id);

    if (!post) {
        notFound();
    }

    return <BlogDetailClient id={id} />;
}