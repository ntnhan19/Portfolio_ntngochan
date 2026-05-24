// app/projects/[id]/page.tsx
import { projects } from '../../../src/data/staticData';
import { notFound } from 'next/navigation';
import ProjectDetailClient from './ProjectDetailClient';

export async function generateStaticParams() {
    // Dùng slug thay vì id — URL đẹp hơn: /projects/docmentor
    return projects.map((project) => ({
        id: project.slug,
    }));
}

export default async function ProjectDetail({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    // Tìm theo slug, fallback id (backward compat)
    const project = projects.find(
        (p) => p.slug === id || p.id.toString() === id
    );
    if (!project) notFound();
    return <ProjectDetailClient slug={id} />;
}