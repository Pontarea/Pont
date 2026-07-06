import { useLanguage } from '../contexts/LanguageContext';

export const usePontareaContent = () => {
  const { language, t } = useLanguage();
  
  const defaultContent = {
    hero: {
      badge: t('hero.subtitle'),
      title: t('hero.title'),
      subtitle: t('hero.description'),
      description: t('hero.statsDescription'),
      ctaText: t('hero.signupNow'),
      heroImage: "./sailing-instructor-new.webp"
    },
    stats: {
      stat1Number: ">50",
      stat1Label: t('hero.statsTitle').split(' ').slice(1).join(' ') || "Absolventen / Saison",
      stat2Number: "100%",
      stat2Label: "Bestehensquote*",
      stat3Number: "max. 6",
      stat3Label: "Teilnehmer pro Kurs",
      stat4Number: "20+",
      stat4Label: "Jahre Erfahrung"
    },
    course1: {
      title: "Sportbootführerschein B",
      subtitle: "Komplette Ausbildung + Prüfung",
      price: "€1.500",
      dates: ["02.05.2026", "16.05.2026", "26.09.2026"],
      duration: "7 Tage",
      description: "Intensiver Wochenkurs zur Vorbereitung auf die kroatische Skipper-Prüfung. Theorie, Praxis und Prüfung in 7 Tagen. Wir trainieren Manöver, Navigation, Sicherheit – alles, was du brauchst.",
      image: "./sailing-instructor-new.webp",
      detailedDescription: "Unser Intensivkurs bereitet dich vollständig auf die kroatische Sportbootführerschein-Prüfung vor.",
      whatYouLearn: [
        "Bootssteuermanagement und Grundlagen des Segelns",
        "Segeltechnik – Aufbau, Einstellen und Handling von Segeln",
        "Navigation mit Seekarten und Kompass",
        "Elektronische Navigation und Funkgeräte (UKW-Sprechfunk)",
        "Meteorologie und Wetterkunde für Segler",
        "Sicherheitsverfahren und Notfallmaßnahmen",
        "Seemannschaft und nautisches Wissen",
        "Praktische Prüfungsvorbereitung und Prüfungsmanöver"
      ],
      benefits: [
        "Nach dem Kurs kannst du eine Yacht sicher steuern",
        "Offizielle internationale Lizenz (gültig weltweit)",
        "100% Prüfungsquote – Du bestehst deine Prüfung",
        "Kleine Gruppen garantieren intensive Betreuung",
        "Erfahrener Trainer mit 20+ Jahren Praxis",
        "Alles in einer Woche – kein Wartens nötig"
      ]
    },
    course2: {
      title: "Hafenmanöver",
      subtitle: "Anlege & Manöver-Training",
      price: "€1.600",
      dates: ["25.04.2026", "09.05.2026"],
      duration: "7 Tage",
      description: "Einzigartiger Kurs, der NUR auf Hafenmanöver fokussiert - das Schwerste beim Segeln! Training im Hafen und nahegelegenen Lagunen. Der Ablauf wird flexibel an das Tempo der Gruppe angepasst und gemeinsam mit dem Team entschieden.",
      image: "./harbor-maneuvers-new.webp",
      detailedDescription: "Hafenmanöver sind die größte Herausforderung für Skipper. Dieser spezialisierte Kurs konzentriert sich 100% auf Anlegen, Ablegen, Manöver in engen Häfen und die sichere Kontrolle deiner Yacht in kritischen Momenten.",
      whatYouLearn: [
        "Perfekte Anlegemanöver – vorwärts, rückwärts, seitlich",
        "Enge Häfen meistern – Navigation in beengten Verhältnissen",
        "Motormanöver und Steuerung ohne Segel",
        "Gezeiten und Strömungen nutzen",
        "Ankertechniken und Verankerung",
        "Wendungen in engen Buchten",
        "Verhalten in Notfallsituationen",
        "Bootspflege und praktische Seefertigkeit"
      ],
      fears: {
        title: "Die größten Ängste beim Anlegen – nach unserem Kurs passé:",
        list: [
          "❌ Angst vor der Kollision mit anderen Booten → ✅ Sicheres, kontrolliertes Manövrieren",
          "❌ Panik beim Rückwärtsfahren → ✅ Präzise Kontrolle in jeder Situation",
          "❌ Unsicherheit in engen Häfen → ✅ Sichere Navigation auch in kritischen Szenarien",
          "❌ Sorge um Beschädigungen → ✅ Defensives Fahren und Risikominderung",
          "❌ Druck von wartenden Booten → ✅ Selbstbewusstsein und Sicherheit am Steuer",
          "❌ Verwirrung bei Wind und Strömung → ✅ Verständnis für natürliche Kräfte und deren Nutzung",
          "❌ Schweißtreibende Anlegeversuche → ✅ Ruhe und Souveränität – jedes Mal eine perfekte Anlegemanöver"
        ]
      },
      benefits: [
        "Du wirst zum Hafenprofi – nicht nur Anfänger",
        "Sichere Yacht-Kontrolle in kritischen Momenten",
        "Entspanntes Anlegen – keine Angst mehr",
        "Internationale Hafenstandards und Protokolle",
        "Trainer mit 20+ Jahren Hafenerfahrung",
        "Kleine Gruppen für maximale Praxis-Zeit",
        "100% Fokus auf Hafenmanöver – keine Ablenkung"
      ]
    },
    instructor: {
      name: "Bogdan Zambrovskij",
      role: "Segeltrainer & Gründer",
      bio: "Mit über 20 Jahren Erfahrung auf dem Wasser bringe ich dir bei, eine Yacht sicher zu steuern – bei jedem Wetter. Mein Ziel: Du sollst nach dem Kurs nicht nur die Prüfung bestehen, sondern echtes Selbstvertrauen am Steuer haben.",
      quote: "Segeln lernt man nur durch Segeln. Theorie ist wichtig – aber das Gefühl fürs Boot bekommst du nur auf dem Wasser."
    },
    location: {
      name: "Marina Dalmacija",
      country: "Kroatien",
      city: "Sukošan",
      description: "Eine der modernsten Marinas Europas mit über 1.200 Liegeplätzen. Geschützte Lage an der Adria, ideale Bedingungen zum Lernen."
    },
    contact: {
      name: "Bogdan Zambrovskij",
      role: "Segeltrainer",
      address: "Konstanzer Str. 46",
      city: "80809 München",
      email: "info@pontarea.de",
      phone: "+49 176 444 37667",
      whatsapp: "+491764443667"
    },
    logos: {
      mainLogo: "./pontarea-logo.svg",
      favicon: "./favicon.svg",
      ogImage: "./og-image.webp"
    },
    seo: {
      title: "Pontarea – Yachting, Training & Events in Kroatien",
      description: "Sportbootführerschein B in 7 Tagen – Intensivkurse in Marina Dalmacija, Kroatien. Dazu Yachtcharter, Retreats & Events auf See. Max. 6 Teilnehmer, Theorie, Praxis & Prüfung.",
      keywords: "Segelkurs, Sportbootführerschein, Yachtcharter Kroatien, Yacht mieten, Retreat auf See, Events auf See, Marina Dalmacija, Skipper Lizenz"
    },
    retreatImages: {
      offer1: "./sailing-instructor-new.webp",
      offer2: "./harbor-maneuvers-new.webp",
      offer3: "./catamaran-retreat.webp",
      trainings: "./catamaran-retreat.webp",
      concept: "./captain-helm_new_resized.webp",
      logistics: "./marina-docking_resized.webp",
      onboard1: "./sailing-instructor-new.webp",
      onboard2: "./harbor-maneuvers-new.webp",
      onboard3: "./captain-helm_new_resized.webp"
    },
    faq: [
      {
        question: "Welche Vorkenntnisse brauche ich?",
        answer: "Keine! Der Kurs ist für absolute Anfänger konzipiert. Alles wird von Grund auf erklärt."
      },
      {
        question: "Wie viele Teilnehmer sind pro Kurs?",
        answer: "Maximal 6 Teilnehmer pro Kurs. Kleine Gruppen garantieren intensive Betreuung und schnelleren Lernerfolg."
      },
      {
        question: "Wann finden die Kurse statt?",
        answer: "Mehrmals im Jahr in Marina Dalmacija, Kroatien. Genaue Termine findest du bei den Kursdetails."
      },
      {
        question: "Was ist im Preis enthalten?",
        answer: "Theorie- und Praxisausbildung, Prüfungsgebühren, Lernmaterialien, Yacht-Miete während des Kurses und erfahrener Trainer."
      },
      {
        question: "Wie ist das Wetter in Marina Dalmacija?",
        answer: "Marina Dalmacija liegt in einem geschützten Gebiet. Bei sehr schlechtem Wetter verlagern wir Praxisübungen. Die Theorie läuft wetterunabhängig."
      }
    ],
    schedule: {
      day1: {
        title: "Tag 1 - Theorie & Basics",
        content: "Einführung in die Navigation, Sicherheitsausrüstung, Knotenkunde, erste Manöver am Simulator"
      },
      day2: {
        title: "Tag 2 - Erste Praxis",
        content: "Ablegen, Segel setzen, Grundmanöver unter Anleitung, Hafeneinfahrt"
      },
      day3: {
        title: "Tag 3 - Navigation & Wetter",
        content: "Kartenarbeit, Wetterkunde, längere Segelstrecken, Ankermanöver"
      },
      day4: {
        title: "Tag 4 - Hafenmanöver Intensiv",
        content: "An- und Ablegen unter verschiedenen Bedingungen, Muringleinen, Seitenwind-Training"
      },
      day5: {
        title: "Tag 5 - Selbstständiges Segeln",
        content: "Eigenständige Führung der Yacht unter Aufsicht, Notfalltraining"
      },
      day6: {
        title: "Tag 6 - Prüfungsvorbereitung",
        content: "Theoriewiederholung, Praxisprüfung-Simulation, letzte Fragen klären"
      },
      day7: {
        title: "Tag 7 - Prüfung",
        content: "Offizielle Prüfung (Theorie + Praxis), Zertifikatsübergabe, Abschlussfeier"
      }
    },
    emailSettings: {
      subjectTemplate: "Platzanfrage für den Kurs am {date}",
      bodyTemplate: "Guten Tag,\n\nbitte kontaktieren Sie mich bezüglich des Kurses.\n\nMein Name ist: ____________________\nTelefonnummer ist: ____________________\nE-Mail: ____________________\n\nGewünschter Kurstermin: {date}\n\nMit freundlichen Grüßen"
    }
  };

  if (typeof window !== "undefined") {
    const saved = localStorage.getItem(`pontareaContent_${language}`);
    if (saved) {
      try {
        return { ...defaultContent, ...JSON.parse(saved) };
      } catch (e) {
        console.error("Error parsing saved content:", e);
        return defaultContent;
      }
    }
  }
  
  return defaultContent;
};
