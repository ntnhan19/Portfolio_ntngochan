'use client';

import React, { createContext, useContext, useEffect, useCallback, useSyncExternalStore } from 'react';

// EN Namespaces
import navEn from '@/i18n/en/nav.json';
import heroEn from '@/i18n/en/hero.json';
import projectsEn from '@/i18n/en/projects.json';
import skillsEn from '@/i18n/en/skills.json';
import aboutEn from '@/i18n/en/about.json';
import contactEn from '@/i18n/en/contact.json';
import aboutPageEn from '@/i18n/en/aboutPage.json';
import footerEn from '@/i18n/en/footer.json';
import projectDetailEn from '@/i18n/en/projectDetail.json';
import projectDataEn from '@/i18n/en/projectData.json';
import aboutDataEn from '@/i18n/en/aboutData.json';

// VI Namespaces
import navVi from '@/i18n/vi/nav.json';
import heroVi from '@/i18n/vi/hero.json';
import projectsVi from '@/i18n/vi/projects.json';
import skillsVi from '@/i18n/vi/skills.json';
import aboutVi from '@/i18n/vi/about.json';
import contactVi from '@/i18n/vi/contact.json';
import aboutPageVi from '@/i18n/vi/aboutPage.json';
import footerVi from '@/i18n/vi/footer.json';
import projectDetailVi from '@/i18n/vi/projectDetail.json';
import projectDataVi from '@/i18n/vi/projectData.json';
import aboutDataVi from '@/i18n/vi/aboutData.json';

const en = {
  nav: navEn,
  hero: heroEn,
  projects: projectsEn,
  skills: skillsEn,
  about: aboutEn,
  contact: contactEn,
  aboutPage: aboutPageEn,
  footer: footerEn,
  projectDetail: projectDetailEn,
  projectData: projectDataEn,
  aboutData: aboutDataEn,
};

const vi = {
  nav: navVi,
  hero: heroVi,
  projects: projectsVi,
  skills: skillsVi,
  about: aboutVi,
  contact: contactVi,
  aboutPage: aboutPageVi,
  footer: footerVi,
  projectDetail: projectDetailVi,
  projectData: projectDataVi,
  aboutData: aboutDataVi,
};

/* ─── Types ─────────────────────────────────────────────── */
export type Locale = 'en' | 'vi';

type DeepPartial<T> = T extends object
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : T;

type Translations = typeof en;

/* ─── Helpers ────────────────────────────────────────────── */
const translations: Record<Locale, DeepPartial<Translations>> = { en, vi };

const LOCALE_STORAGE_KEY = 'portfolio-locale';
const LOCALE_CHANGE_EVENT = 'portfolio-locale-change';

function getServerLocaleSnapshot(): Locale {
  return 'en';
}

function getLocaleSnapshot(): Locale {
  try {
    const saved = localStorage.getItem(LOCALE_STORAGE_KEY);
    if (saved === 'en' || saved === 'vi') return saved;
  } catch {
    /* private browsing */
  }
  return 'en';
}

function subscribeLocale(onStoreChange: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key === LOCALE_STORAGE_KEY) onStoreChange();
  };

  window.addEventListener(LOCALE_CHANGE_EVENT, onStoreChange);
  window.addEventListener('storage', onStorage);

  return () => {
    window.removeEventListener(LOCALE_CHANGE_EVENT, onStoreChange);
    window.removeEventListener('storage', onStorage);
  };
}

/**
 * Get a nested translation value by dot-notation key.
 * e.g. t('hero.greeting') => "Hi, I'm"
 */
function getNestedValue(obj: unknown, key: string): string {
  // We treat translation JSON as a generic nested object.
  // Using unknown keeps this helper safe without leaking `any` through the codebase.
  return (
    key
      .split('.')
      .reduce<unknown>((acc, part) => (acc && typeof acc === 'object' ? (acc as Record<string, unknown>)[part] : undefined), obj) ??
    key
  ) as string;
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
  const locale = useSyncExternalStore(
    subscribeLocale,
    getLocaleSnapshot,
    getServerLocaleSnapshot
  );

  const setLocale = useCallback((next: Locale) => {
    try {
      localStorage.setItem(LOCALE_STORAGE_KEY, next);
    } catch {
      /* private browsing */
    }
    document.documentElement.lang = next;
    window.dispatchEvent(new Event(LOCALE_CHANGE_EVENT));
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const toggleLocale = useCallback(() => {
    setLocale(locale === 'en' ? 'vi' : 'en');
  }, [locale, setLocale]);

  const t = useCallback(
    (key: string, vars?: Record<string, string>): string => {
      const dict = translations[locale];
      let value = getNestedValue(dict, key);

      // Fallback to English if missing
      if (value === key) {
        value = getNestedValue(translations.en, key);
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
