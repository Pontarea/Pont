import { Button } from "@/components/ui/button";
import { useLanguage } from "../contexts/LanguageContext";
import { LanguageSwitcher } from "../components/LanguageSwitcher";
import { Link } from "wouter";

const ImpressumPage = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-blue-50 text-gray-800">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-100 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-100 rounded-full blur-3xl opacity-30" />
      </div>

      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b-2 border-sky-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <img src="/pontarea-logo.svg" alt="Pontarea Logo" className="h-6" />
            <span className="font-semibold text-lg bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">Pontarea</span>
          </Link>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <Link href="/">
              <Button variant="ghost" className="h-9 px-5 text-gray-700 hover:text-sky-600 hover:bg-sky-50 rounded-full text-sm font-medium">{t('legal.backButton')}</Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="relative z-10 max-w-4xl mx-auto px-6 pt-32 pb-20">
        <div className="text-center mb-20">
          <p className="text-sky-600 text-sm uppercase tracking-[0.3em] font-semibold mb-4">{t('legal.legalNotice')}</p>
          <h1 className="text-6xl font-bold bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent tracking-tight">{t('impressum.title')}</h1>
        </div>

        <div className="space-y-8">
          <div className="bg-white/80 backdrop-blur-xl border-2 border-sky-200 rounded-3xl p-8 lg:p-10 shadow-lg hover:shadow-xl transition-all">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">{t('impressum.section1Title')}</h2>
            <div className="text-gray-700 leading-relaxed space-y-1">
              <p className="font-semibold text-lg">{t('impressum.section1Name')}</p>
              <p>{t('impressum.section1Job')}</p>
              <p>Konstanzer Str. 46</p>
              <p>80809 München</p>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-xl border-2 border-sky-200 rounded-3xl p-8 lg:p-10 shadow-lg hover:shadow-xl transition-all">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">{t('impressum.section2Title')}</h2>
            <div className="text-gray-700 leading-relaxed space-y-2">
              <p>{t('impressum.section2Phone')}: <a href="tel:+4917644437667" className="text-sky-600 hover:underline">+49 176 444 37667</a></p>
              <p>{t('impressum.section2Email')}: <a href="mailto:info@pontarea.de" className="text-sky-600 hover:underline">info@pontarea.de</a></p>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-xl border-2 border-sky-200 rounded-3xl p-8 lg:p-10 shadow-lg hover:shadow-xl transition-all">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">{t('impressum.section3Title')}</h2>
            <div className="text-gray-700 leading-relaxed">
              <p>{t('impressum.section3Text')}</p>
              <p className="font-semibold mt-2">148/216/12285</p>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-xl border-2 border-sky-200 rounded-3xl p-8 lg:p-10 shadow-lg hover:shadow-xl transition-all">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">{t('impressum.section4Title')}</h2>
            <div className="text-gray-700 leading-relaxed">
              <p><strong>{t('impressum.section4Profession')}</strong> {t('impressum.section4Value')}</p>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-xl border-2 border-sky-200 rounded-3xl p-8 lg:p-10 shadow-lg hover:shadow-xl transition-all">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">{t('impressum.section5Title')}</h2>
            <div className="text-gray-700 leading-relaxed space-y-3">
              <p>{t('impressum.section5Para1')} <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-sky-600 hover:underline">https://ec.europa.eu/consumers/odr</a>.</p>
              <p>{t('impressum.section5Para2')}</p>
              <p>{t('impressum.section5Para3')}</p>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-xl border-2 border-sky-200 rounded-3xl p-8 lg:p-10 shadow-lg hover:shadow-xl transition-all">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">{t('impressum.section6Title')}</h2>
            <div className="text-gray-700 leading-relaxed space-y-6">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                <div key={n}>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{t(`impressum.cert${n}Title`)}</h3>
                  {t(`impressum.cert${n}Desc`) !== `impressum.cert${n}Desc` && <p>{t(`impressum.cert${n}Desc`)}</p>}
                  {n === 8 && (<><p>{t('impressum.cert8Desc1')}</p><p>{t('impressum.cert8Desc2')}</p></>)}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-xl border-2 border-sky-200 rounded-3xl p-8 lg:p-10 shadow-lg hover:shadow-xl transition-all">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">{t('impressum.section7Title')}</h2>
            <div className="text-gray-700 leading-relaxed space-y-3">
              <p>{t('impressum.section7Para1')}</p>
              <p>{t('impressum.section7Para2')}</p>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-xl border-2 border-sky-200 rounded-3xl p-8 lg:p-10 shadow-lg hover:shadow-xl transition-all">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">{t('impressum.section8Title')}</h2>
            <div className="text-gray-700 leading-relaxed space-y-3">
              <p>{t('impressum.section8Para1')}</p>
              <p>{t('impressum.section8Para2')}</p>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-xl border-2 border-sky-200 rounded-3xl p-8 lg:p-10 shadow-lg hover:shadow-xl transition-all">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">{t('impressum.section9Title')}</h2>
            <div className="text-gray-700 leading-relaxed space-y-3">
              <p>{t('impressum.section9Para1')}</p>
              <p>{t('impressum.section9Para2')}</p>
            </div>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t-2 border-sky-200 text-center">
          <p className="text-gray-600 text-sm">{t('footer.rights')}</p>
        </div>
      </div>
    </div>
  );
};

export default ImpressumPage;
