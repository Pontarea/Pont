import { useState, useEffect } from 'react';

type Translations = {
  [key: string]: any;
};

export function useTranslations(language: 'de' | 'ru') {
  const [translations, setTranslations] = useState<Translations>({});

  useEffect(() => {
    const saved = localStorage.getItem(`translations_${language}`);
    if (saved) {
      setTranslations(JSON.parse(saved));
    } else {
      // Load default translations
      import(`../locales/${language}.json`).then((module) => {
        setTranslations(module.default);
        localStorage.setItem(`translations_${language}`, JSON.stringify(module.default));
      });
    }
  }, [language]);

  const saveTranslations = (newTranslations: Translations) => {
    setTranslations(newTranslations);
    localStorage.setItem(`translations_${language}`, JSON.stringify(newTranslations));
  };

  return { translations, saveTranslations };
}
