import React, { createContext, useContext, useState, useEffect } from 'react';
import deTranslations from '../locales/de.json';
import ruTranslations from '../locales/ru.json';

type Language = 'de' | 'ru';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  getTranslations: (lang?: Language) => Record<string, any>;
  setTranslationOverride: (lang: Language, translations: Record<string, any>) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const baseTranslationsMap: Record<Language, Record<string, any>> = {
  de: deTranslations as Record<string, any>,
  ru: ruTranslations as Record<string, any>,
};

function deepMerge(base: Record<string, any>, override: Record<string, any>): Record<string, any> {
  const result = { ...base };
  for (const key in override) {
    if (
      override[key] !== null &&
      typeof override[key] === 'object' &&
      !Array.isArray(override[key]) &&
      base[key] !== null &&
      typeof base[key] === 'object' &&
      !Array.isArray(base[key])
    ) {
      result[key] = deepMerge(base[key] as Record<string, any>, override[key] as Record<string, any>);
    } else {
      result[key] = override[key];
    }
  }
  return result;
}

function loadOverrides(lang: Language): Record<string, any> | null {
  if (typeof window === 'undefined') return null;
  try {
    const saved = localStorage.getItem(`translations_${lang}`);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error('Error loading translation overrides:', e);
  }
  return null;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const savedLang = localStorage.getItem('language') as Language;
      if (savedLang && (savedLang === 'de' || savedLang === 'ru')) {
        return savedLang;
      }
    }
    return 'de';
  });

  const [overrides, setOverrides] = useState<Record<Language, Record<string, any> | null>>(() => {
    return {
      de: loadOverrides('de'),
      ru: loadOverrides('ru'),
    };
  });

  // Listen for storage events (including same-tab dispatched events from admin)
  useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.key === 'translations_de') {
        try {
          setOverrides(prev => ({ ...prev, de: e.newValue ? JSON.parse(e.newValue) : null }));
        } catch {}
      } else if (e.key === 'translations_ru') {
        try {
          setOverrides(prev => ({ ...prev, ru: e.newValue ? JSON.parse(e.newValue) : null }));
        } catch {}
      }
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', lang);
    }
  };

  const setTranslationOverride = (lang: Language, translations: Record<string, any>) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(`translations_${lang}`, JSON.stringify(translations));
    }
    setOverrides(prev => ({ ...prev, [lang]: translations }));
  };

  const getTranslations = (lang?: Language): Record<string, any> => {
    const l = lang || language;
    const base = baseTranslationsMap[l];
    const override = overrides[l];
    if (override) {
      return deepMerge(base, override);
    }
    return base;
  };

  const t = (key: string): string => {
    const translations = getTranslations(language);
    const keys = key.split('.');
    let value: any = translations;
    
    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        console.warn(`Translation key not found: ${key}`);
        return key;
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, getTranslations, setTranslationOverride }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
