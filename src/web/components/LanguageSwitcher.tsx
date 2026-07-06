import { useLanguage } from '../contexts/LanguageContext';

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <button
      onClick={() => setLanguage(language === 'de' ? 'ru' : 'de')}
      className="flex items-center justify-center w-10 h-10 hover:opacity-80 rounded-full transition-all"
      title={language === 'de' ? 'Переключить на русский' : 'Auf Deutsch umschalten'}
    >
      <svg viewBox="0 0 40 40" className="w-8 h-8" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Blue speech bubble (left) */}
        <path
          d="M4 6C4 3.8 5.8 2 8 2H24C26.2 2 28 3.8 28 6V22C28 24.2 26.2 26 24 26H14L8 32V26H8C5.8 26 4 24.2 4 22V6Z"
          fill="#38BDF8"
        />
        {/* Grey rounded rect (right) */}
        <rect x="18" y="10" width="20" height="20" rx="4" fill="#CBD5E1" />
        {/* A letter */}
        <text x="14" y="20" textAnchor="middle" fontSize="13" fontWeight="bold" fill="white" fontFamily="Arial, sans-serif">A</text>
        {/* 文 character */}
        <text x="28" y="25" textAnchor="middle" fontSize="11" fontWeight="600" fill="#475569" fontFamily="Arial, sans-serif">文</text>
      </svg>
    </button>
  );
}
