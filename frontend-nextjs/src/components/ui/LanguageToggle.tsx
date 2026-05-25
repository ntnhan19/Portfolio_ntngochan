'use client';

import { motion } from 'framer-motion';
import { useLocale } from '@/src/context/LocaleContext';

export function LanguageToggle() {
  const { locale, toggleLocale } = useLocale();
  const isVI = locale === 'vi';

  return (
    <motion.button
      onClick={toggleLocale}
      aria-label={isVI ? 'Switch to English' : 'Chuyển sang tiếng Việt'}
      title={isVI ? 'Switch to English' : 'Chuyển sang tiếng Việt'}
      whileTap={{ scale: 0.92 }}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.3rem',
        padding: '0 0.65rem',
        height: '2.25rem',
        borderRadius: 'var(--radius-pill)',
        border: '1px solid var(--border)',
        background: 'var(--surface)',
        color: 'var(--text-secondary)',
        cursor: 'pointer',
        flexShrink: 0,
        fontFamily: 'var(--font-mono)',
        fontSize: '0.72rem',
        fontWeight: 600,
        letterSpacing: '0.04em',
        transition: 'border-color 0.18s ease, background 0.18s ease, color 0.18s ease',
        textTransform: 'uppercase',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-strong)';
        (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)';
        (e.currentTarget as HTMLElement).style.background = 'var(--surface-hover)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
        (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)';
        (e.currentTarget as HTMLElement).style.background = 'var(--surface)';
      }}
    >
      {/* Globe icon */}
      <svg
        width="13"
        height="13"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>

      <motion.span
        key={locale}
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 6 }}
        transition={{ duration: 0.15 }}
      >
        {isVI ? 'VI' : 'EN'}
      </motion.span>

      <span style={{ opacity: 0.4, fontSize: '0.65rem' }}>
        {isVI ? '→ EN' : '→ VI'}
      </span>
    </motion.button>
  );
}
