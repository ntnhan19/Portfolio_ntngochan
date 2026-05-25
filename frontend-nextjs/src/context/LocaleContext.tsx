'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import en from '@/i18n/en.json';
import vi from '@/i18n/vi.json';

/* ─── Types ─────────────────────────────────────────────── */
export type Locale = 'en' | 'vi';

type DeepPartial<T> = T extends object
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : T;

type Translations = typeof en;

/* ─── Helpers ────────────────────────────────────────────── */
const translations: Record<Locale, DeepPartial<Translations>> = { en, vi };

/**
 * Get a nested translation value by dot-notation key.
 * e.g. t('hero.greeting') => "Hi, I'm"
 */
function getNestedValue(obj: any, key: string): string {
  return key.split('.').reduce((acc, part) => acc?.[part], obj) ?? key;
}

/* ─── Context ────────────────────────────────────────────── */
interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  /** Translate a dot-notation key with optional variable replacement */
  t: (key: string, vars?: Record<string, string>) => string;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

/* ─── Provider ───────────────────────────────────────────── */
export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en');

  /* Read persisted locale on mount */
  useEffect(() => {
    const saved = localStorage.getItem('portfolio-locale') as Locale | null;
    if (saved === 'en' || saved === 'vi') {
      setLocaleState(saved);
    }
  }, []);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    localStorage.setItem('portfolio-locale', next);
    // Update html lang attribute
    document.documentElement.lang = next;
  }, []);

  const toggleLocale = useCallback(() => {
    setLocale(locale === 'en' ? 'vi' : 'en');
  }, [locale, setLocale]);

  const t = useCallback(
    (key: string, vars?: Record<string, string>): string => {
      const dict = translations[locale] as any;
      let value = getNestedValue(dict, key);

      // Fallback to English if missing
      if (value === key) {
        value = getNestedValue(translations.en as any, key);
      }

      // Replace {variable} placeholders
      if (vars && typeof value === 'string') {
        Object.entries(vars).forEach(([k, v]) => {
          value = value.replace(new RegExp(`\\{${k}\\}`, 'g'), v);
        });
      }

      return typeof value === 'string' ? value : key;
    },
    [locale]
  );

  return (
    <LocaleContext.Provider value={{ locale, setLocale, toggleLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
}

/* ─── Hook ───────────────────────────────────────────────── */
export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return ctx;
}
