import { Button } from "@/components/ui/button";
import { useLanguage } from "../contexts/LanguageContext";
import { LanguageSwitcher } from "../components/LanguageSwitcher";
import { Link } from "wouter";
import deTranslations from "../locales/de.json";
import ruTranslations from "../locales/ru.json";

const LegalPageLayout = ({ title, subtitle, children }: any) => {
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
        <div className="text-center mb-16">
          <p className="text-sky-600 text-sm uppercase tracking-[0.3em] font-semibold mb-4">{t('legal.legalNotice')}</p>
          <h1 className="text-6xl font-bold bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent tracking-tight mb-2">{title}</h1>
          {subtitle && <p className="text-gray-600 text-lg">{subtitle}</p>}
        </div>
        <div className="space-y-6">{children}</div>
        <div className="mt-20 pt-8 border-t-2 border-sky-200 text-center">
          <p className="text-gray-600 text-sm">{t('footer.rights')}</p>
        </div>
      </div>
    </div>
  );
};

const SectionCard = ({ title, icon, children }: any) => (
  <div className="bg-white/80 backdrop-blur-xl border-2 border-sky-200 rounded-3xl p-8 lg:p-10 shadow-lg hover:shadow-xl transition-all">
    <div className="flex items-center gap-4 mb-6">
      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-100 to-blue-100 border-2 border-sky-300 flex items-center justify-center">
        <span className="text-xl">{icon}</span>
      </div>
      <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
    </div>
    {children}
  </div>
);

export const AGBPageStyled = () => {
  const { t, language } = useLanguage();

  // Get array items directly from imported JSON (avoids require() in production)
  const getItems = (key: string): string[] => {
    const translations: any = language === "de" ? deTranslations : ruTranslations;
    const keys = key.split(".");
    let result: any = translations;
    for (const k of keys) {
      result = result?.[k];
    }
    return Array.isArray(result) ? result : [];
  };

  return (
    <LegalPageLayout title={t('agb.title')} subtitle={t('agb.subtitle')}>

      {/* 1. Geltungsbereich */}
      <SectionCard title={t('agb.section1Title')} icon={t('agb.section1Icon')}>
        <p className="text-gray-700 leading-relaxed">{t('agb.section1Text')}</p>
      </SectionCard>

      {/* 2. Kursbeschreibung */}
      <SectionCard title={t('agb.section2Title')} icon={t('agb.section2Icon')}>
        <p className="text-gray-700 leading-relaxed mb-4">{t('agb.section2Intro')}</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>{t('agb.section2Course1')}</li>
          <li>{t('agb.section2Course2')}</li>
        </ul>
        <p className="text-gray-700 leading-relaxed mt-4">{t('agb.section2Outro')}</p>
      </SectionCard>

      {/* 3. Anmeldung */}
      <SectionCard title={t('agb.section3Title')} icon={t('agb.section3Icon')}>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>{t('agb.section3Item1')}</li>
          <li>{t('agb.section3Item2')}</li>
          <li>{t('agb.section3Item3')}</li>
        </ul>
      </SectionCard>

      {/* 4. Preise */}
      <SectionCard title={t('agb.section4Title')} icon={t('agb.section4Icon')}>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          {getItems('agb.section4Items').map((item, idx) => <li key={idx}>{item}</li>)}
        </ul>
      </SectionCard>

      {/* 5. Zusatzkosten */}
      <SectionCard title={t('agb.section5Title')} icon={t('agb.section5Icon')}>
        <p className="text-gray-700 leading-relaxed mb-4">{t('agb.section5Intro')}</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          {getItems('agb.section5Items').map((item, idx) => <li key={idx}>{item}</li>)}
        </ul>
      </SectionCard>

      {/* 6. Stornierung */}
      <SectionCard title={t('agb.section6Title')} icon={t('agb.section6Icon')}>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          {getItems('agb.section6Items').map((item, idx) => <li key={idx}>{item}</li>)}
        </ul>
      </SectionCard>

      {/* 7. Wetter */}
      <SectionCard title={t('agb.section7Title')} icon={t('agb.section7Icon')}>
        <p className="text-gray-700 leading-relaxed">{t('agb.section7Text')}</p>
      </SectionCard>

      {/* 8. Kaution */}
      <SectionCard title={t('agb.section8Title')} icon={t('agb.section8Icon')}>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          {getItems('agb.section8Items').map((item, idx) => <li key={idx}>{item}</li>)}
        </ul>
      </SectionCard>

      {/* 9. Haftung */}
      <SectionCard title={t('agb.section9Title')} icon={t('agb.section9Icon')}>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          {getItems('agb.section9Items').map((item, idx) => <li key={idx}>{item}</li>)}
        </ul>
      </SectionCard>

      {/* 10. Datenschutz */}
      <SectionCard title={t('agb.section10Title')} icon={t('agb.section10Icon')}>
        <p className="text-gray-700 leading-relaxed">
          {t('agb.section10Text')}{" "}
          <Link href="/datenschutz" className="text-sky-600 hover:underline">{t('agb.section10Link')}</Link>
        </p>
      </SectionCard>

      {/* 11. Salvatorische Klausel */}
      <SectionCard title={t('agb.section11Title')} icon={t('agb.section11Icon')}>
        <p className="text-gray-700 leading-relaxed">{t('agb.section11Text')}</p>
      </SectionCard>

      {/* 12. Gerichtsstand */}
      <SectionCard title={t('agb.section12Title')} icon={t('agb.section12Icon')}>
        <p className="text-gray-700 leading-relaxed">{t('agb.section12Text')}</p>
      </SectionCard>

      {/* 13. Kontakt */}
      <SectionCard title={t('agb.section13Title')} icon={t('agb.section13Icon')}>
        <p className="text-gray-700 leading-relaxed">
          {t('agb.section13Text')}<br />
          <strong>Pontarea – Bogdan Zambrovskij</strong><br />
          E-Mail:{" "}
          <a href="mailto:info@pontarea.de" className="text-sky-600 hover:underline">info@pontarea.de</a><br />
          Telefon:{" "}
          <a href="tel:+491764443667" className="text-sky-600 hover:underline">+49 176 44437667</a>
        </p>
      </SectionCard>

    </LegalPageLayout>
  );
};

// ─── Datenschutz – nur auf Deutsch ───────────────────────────────────────────

export const DatenschutzPageStyled = () => {
  const { t } = useLanguage();

  const sections = [
    {
      title: "1. Verantwortlicher",
      icon: "👤",
      content: (
        <div className="text-gray-700 space-y-1">
          <p className="font-semibold">Bogdan Zambrovskij</p>
          <p>Pontarea – Segelkurse</p>
          <p>Konstanzer Str. 46, 80809 München</p>
          <p className="mt-3">
            <strong>E-Mail:</strong>{" "}
            <a href="mailto:info@pontarea.de" className="text-sky-600 hover:underline">info@pontarea.de</a>
          </p>
          <p>
            <strong>Telefon:</strong>{" "}
            <a href="tel:+491764443667" className="text-sky-600 hover:underline">+49 176 44437667</a>
          </p>
        </div>
      ),
    },
    {
      title: "2. Allgemeine Hinweise",
      icon: "ℹ️",
      content: (
        <p className="text-gray-700 leading-relaxed">
          Diese Datenschutzerklärung informiert Sie über Art, Umfang und Zweck der Verarbeitung personenbezogener Daten auf unserer Website pontarea.de sowie im Rahmen unserer Segelkurse. Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst und behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.
        </p>
      ),
    },
    {
      title: "3. Rechtsgrundlagen der Verarbeitung",
      icon: "⚖️",
      content: (
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li><strong>Art. 6 Abs. 1 lit. a DSGVO</strong> – Einwilligung der betroffenen Person</li>
          <li><strong>Art. 6 Abs. 1 lit. b DSGVO</strong> – Vertragsabwicklung (Kursanmeldung und -durchführung)</li>
          <li><strong>Art. 6 Abs. 1 lit. c DSGVO</strong> – Erfüllung rechtlicher Verpflichtungen</li>
          <li><strong>Art. 6 Abs. 1 lit. f DSGVO</strong> – Wahrung berechtigter Interessen (z. B. Kommunikation, Sicherheit)</li>
        </ul>
      ),
    },
    {
      title: "4. Erhobene personenbezogene Daten",
      icon: "📋",
      content: (
        <div className="text-gray-700 space-y-4">
          <p className="font-semibold">Bei Nutzung des Kontaktformulars erfassen wir:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Vorname</li>
            <li>Telefonnummer / WhatsApp</li>
            <li>E-Mail-Adresse (optional)</li>
            <li>Wunschtermin (optional)</li>
            <li>Kurswahl (optional)</li>
            <li>Nachrichtentext (optional)</li>
          </ul>
          <p className="font-semibold mt-2">Bei Kursbuchung zusätzlich:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Vollständiger Name</li>
            <li>Geburtsdatum</li>
            <li>Nationalität / Reisepassdaten (für Prüfungsanmeldung)</li>
            <li>Zahlungsdaten</li>
          </ul>
        </div>
      ),
    },
    {
      title: "5. Zweck der Datenverarbeitung",
      icon: "🎯",
      content: (
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Beantwortung von Anfragen und Beratung zu Kursen</li>
          <li>Abwicklung von Kursbuchungen und Zahlungen</li>
          <li>Anmeldung zur offiziellen Prüfung beim kroatischen Ministerium für Seefahrt</li>
          <li>Zusendung von Kursunterlagen und Vorbereitungsmaterial</li>
          <li>Erfüllung gesetzlicher Aufbewahrungs- und Meldepflichten</li>
        </ul>
      ),
    },
    {
      title: "6. Datenweitergabe an Dritte",
      icon: "🔗",
      content: (
        <div className="text-gray-700 space-y-3">
          <p>Ihre Daten werden grundsätzlich nicht an Dritte weitergegeben, außer:</p>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Kroatisches Ministerium für Seefahrt (MMPI):</strong> Name, Geburtsdatum, Nationalität – zur Prüfungsanmeldung (Sportbootführerschein B). Dies ist gesetzlich vorgeschrieben.</li>
            <li><strong>Marina Dalmacija (Sukošan, Kroatien):</strong> Name – für die Liegeplatzbuchung während des Kurses.</li>
            <li><strong>Zahlungsdienstleister:</strong> Zahlungsdaten – ausschließlich zur Zahlungsabwicklung, gemäß deren eigenen Datenschutzbestimmungen.</li>
          </ul>
          <p>Eine Weitergabe zu Werbezwecken findet nicht statt.</p>
        </div>
      ),
    },
    {
      title: "7. Speicherdauer",
      icon: "⏱️",
      content: (
        <div className="text-gray-700 space-y-2">
          <p>Personenbezogene Daten werden nur so lange gespeichert, wie es für die genannten Zwecke erforderlich ist:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Anfragen ohne Buchung: bis zu 6 Monate nach Abschluss der Kommunikation</li>
            <li>Buchungs- und Vertragsdaten: 10 Jahre (gesetzliche Aufbewahrungspflicht nach HGB/AO)</li>
            <li>Prüfungsunterlagen: gemäß den Vorgaben der kroatischen Behörden</li>
          </ul>
        </div>
      ),
    },
    {
      title: "8. Cookies und Webanalyse",
      icon: "🍪",
      content: (
        <div className="text-gray-700 space-y-2">
          <p>Unsere Website verwendet ausschließlich technisch notwendige Cookies für den Betrieb der Website (z. B. Spracheinstellung). Analytische oder Marketing-Cookies werden <strong>nicht</strong> eingesetzt.</p>
          <p>Es werden keine Daten an Werbenetzwerke oder Tracking-Dienste Dritter (z. B. Google Analytics, Facebook Pixel) übermittelt.</p>
        </div>
      ),
    },
    {
      title: "9. Ihre Rechte nach DSGVO",
      icon: "✋",
      content: (
        <div className="text-gray-700 space-y-2">
          <p>Sie haben jederzeit folgende Rechte:</p>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Art. 15 DSGVO</strong> – Recht auf Auskunft über gespeicherte Daten</li>
            <li><strong>Art. 16 DSGVO</strong> – Recht auf Berichtigung unrichtiger Daten</li>
            <li><strong>Art. 17 DSGVO</strong> – Recht auf Löschung ("Recht auf Vergessenwerden")</li>
            <li><strong>Art. 18 DSGVO</strong> – Recht auf Einschränkung der Verarbeitung</li>
            <li><strong>Art. 20 DSGVO</strong> – Recht auf Datenportabilität</li>
            <li><strong>Art. 21 DSGVO</strong> – Widerspruchsrecht gegen die Verarbeitung</li>
            <li><strong>Art. 77 DSGVO</strong> – Beschwerderecht bei einer Aufsichtsbehörde</li>
          </ul>
          <p className="mt-3">Zuständige Aufsichtsbehörde: <strong>Bayerisches Landesamt für Datenschutzaufsicht (BayLDA)</strong>, Promenade 18, 91522 Ansbach.</p>
        </div>
      ),
    },
    {
      title: "10. Widerrufsrecht",
      icon: "↩️",
      content: (
        <p className="text-gray-700 leading-relaxed">
          Sofern die Verarbeitung Ihrer Daten auf einer Einwilligung beruht (Art. 6 Abs. 1 lit. a DSGVO), haben Sie das Recht, diese Einwilligung jederzeit ohne Angabe von Gründen zu widerrufen. Der Widerruf berührt nicht die Rechtmäßigkeit der bis zum Widerruf erfolgten Verarbeitung. Bitte richten Sie Ihren Widerruf per E-Mail an: <a href="mailto:info@pontarea.de" className="text-sky-600 hover:underline">info@pontarea.de</a>.
        </p>
      ),
    },
    {
      title: "11. Kontakt Datenschutz",
      icon: "📞",
      content: (
        <div className="text-gray-700 space-y-1">
          <p>Bei Fragen zum Datenschutz wenden Sie sich direkt an:</p>
          <p className="mt-2"><strong>Pontarea – Bogdan Zambrovskij</strong></p>
          <p>E-Mail: <a href="mailto:info@pontarea.de" className="text-sky-600 hover:underline">info@pontarea.de</a></p>
          <p>Telefon: <a href="tel:+491764443667" className="text-sky-600 hover:underline">+49 176 44437667</a></p>
          <p className="mt-4 text-sm text-gray-500"><strong>Stand:</strong> März 2026</p>
        </div>
      ),
    },
  ];

  return (
    <LegalPageLayout title="DATENSCHUTZ" subtitle="Datenschutzerklärung gemäß DSGVO">
      {sections.map((s, idx) => (
        <SectionCard key={idx} title={s.title} icon={s.icon}>
          {s.content}
        </SectionCard>
      ))}
    </LegalPageLayout>
  );
};
