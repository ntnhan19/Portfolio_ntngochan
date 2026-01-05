import { projects } from '../../../src/data/staticData';
import { notFound } from 'next/navigation';
import ProjectDetailClient from './ProjectDetailClient';

// Server Component - generateStaticParams phải ở đây
export async function generateStaticParams() {
    return projects.map((project) => ({
        id: project.id.toString(),
    }));
}

// Server Component để handle params
export default async function ProjectDetail({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const project = projects.find(p => p.id.toString() === id);

    if (!project) {
        notFound();
    }

    return <ProjectDetailClient id={id} />;
}