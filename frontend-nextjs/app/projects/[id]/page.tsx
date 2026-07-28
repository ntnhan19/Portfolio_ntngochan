// app/projects/[id]/page.tsx
import { projects } from '../../../src/data/staticData';
import { notFound } from 'next/navigation';
import ProjectDetailClient from './ProjectDetailClient';
import { promises as fs } from 'fs';
import path from 'path';

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

    // Read both EN and VI markdown files
    const enPath = path.join(process.cwd(), 'src', 'content', 'projects', 'en', `${project.slug}.md`);
    const viPath = path.join(process.cwd(), 'src', 'content', 'projects', 'vi', `${project.slug}.md`);
    
    let contentEn = '';
    let contentVi = '';
    
    try {
        contentEn = await fs.readFile(enPath, 'utf8');
    } catch (e) {
        console.warn(`Could not load EN content for ${project.slug}`);
    }
    
    try {
        contentVi = await fs.readFile(viPath, 'utf8');
    } catch (e) {
        console.warn(`Could not load VI content for ${project.slug}`);
    }

    return <ProjectDetailClient slug={id} contentEn={contentEn} contentVi={contentVi} />;
}