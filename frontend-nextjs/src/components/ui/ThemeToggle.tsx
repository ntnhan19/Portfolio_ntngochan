'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  theme: 'light' | 'dark';
  onToggle: () => void;
}

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  const isDark = theme === 'dark';

  return (
    <motion.button
      onClick={onToggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      whileTap={{ scale: 0.92 }}
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '2.25rem',
        height: '2.25rem',
        borderRadius: 'var(--radius-pill)',
        border: '1px solid var(--border)',
        background: 'var(--surface)',
        color: 'var(--text-secondary)',
        cursor: 'pointer',
        flexShrink: 0,
        overflow: 'hidden',
        transition: 'border-color 0.18s ease, background 0.18s ease',
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
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.span
            key="sun"
            initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <Sun size={16} strokeWidth={2} />
          </motion.span>
        ) : (
          <motion.span
            key="moon"
            initial={{ opacity: 0, rotate: 90, scale: 0.5 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: -90, scale: 0.5 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <Moon size={16} strokeWidth={2} />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
