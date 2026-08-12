'use client';

import { projects } from '../../../src/data/staticData';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useLocale } from '../../../src/context/LocaleContext';
import { LanguageToggle } from '@/src/components/ui/LanguageToggle';
import { ThemeToggle } from '@/src/components/ui/ThemeToggle';
import { usePortfolioTheme } from '@/src/hooks/usePortfolioTheme';
import { useState, useEffect } from 'react';
import { parseProjectMarkdown } from '@/src/utils/markdownParser';

import ProjectHero from '@/src/components/projects/ProjectHero';
import ProjectBackground from '@/src/components/projects/ProjectBackground';
import ProjectFeatures from '@/src/components/projects/ProjectFeatures';
import ProjectContribution from '@/src/components/projects/ProjectContribution';
import ProjectArchitecture from '@/src/components/projects/ProjectArchitecture';
import ProjectChallenges from '@/src/components/projects/ProjectChallenges';
import ProjectDecisions from '@/src/components/projects/ProjectDecisions';
import ProjectResults from '@/src/components/projects/ProjectResults';

export default function ProjectDetailClient({ slug, contentEn, contentVi }: { slug: string, contentEn: string, contentVi: string }) {
    const { t, locale } = useLocale();
    const { theme, toggleTheme } = usePortfolioTheme();
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            setIsScrolled(window.scrollY > 40);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const project = projects.find(
        (p) => p.slug === slug || p.id.toString() === slug
    );

    if (!project) {
        return (
            <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-base)', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
                project not found
            </main>
        );
    }

    const markdownContent = locale === 'vi' ? contentVi : contentEn;
    const { background, features, contribution, challenges, architecture, decisions, results } = parseProjectMarkdown(markdownContent);

    return (
        <main style={{ background: 'var(--bg-base)', color: 'var(--text-primary)', minHeight: '100vh', overflowX: 'hidden' }}>
            
            {/* ── NAVBAR ── */}
            <header
                style={{
                    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
                    transition: 'all 0.3s ease',
                    background: isScrolled ? 'var(--bg-overlay)' : 'transparent',
                    backdropFilter: isScrolled ? 'blur(16px)' : 'none',
                    borderBottom: isScrolled ? '1px solid var(--border)' : 'none',
                    height: '64px',
                    display: 'flex',
                    alignItems: 'center'
                }}
            >
                <div style={{ maxWidth: '72rem', margin: '0 auto', width: '100%', padding: '0 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Link href="/#projects"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)', textDecoration: 'none' }}>
                        <ArrowLeft size={16} /> {t('projectDetail.back')}
                    </Link>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <LanguageToggle />
                        <ThemeToggle theme={theme} onToggle={toggleTheme} />
                    </div>
                </div>
            </header>

            {/* ── SECTIONS ── */}
            <ProjectHero project={project} t={t} />
            <ProjectBackground project={project} backgroundText={background} locale={locale} t={t} />
            <ProjectFeatures features={features} locale={locale} />
            <ProjectContribution contribution={contribution} locale={locale} />
            <ProjectArchitecture architectureText={architecture} locale={locale} slug={slug} />
            <ProjectChallenges challenges={challenges} locale={locale} />
            <ProjectDecisions decisions={decisions} locale={locale} />
            <ProjectResults resultsText={results} locale={locale} />
            
        </main>
    );
}
