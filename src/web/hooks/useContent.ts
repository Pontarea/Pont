// Хук для загрузки контента из localStorage
export const useContent = () => {
  const defaultContent = {
    hero: {
      smallText: "SEGELN LERNEN",
      title: "MENTOR IN BOAT",
      subtitle: "Kapitänkurse in Kroatien",
      description: "Die Kurse sind für all diejenigen, die ein echter Bootsführer werden wollen und lernen möchten, wie man eine Segelyacht oder einen Katamaran bei Windstille, frischem Wind oder auch bei Sturm steuert.",
    },
    course1: {
      title: "Kapitänkurs Skipper-Lizenz",
      price: "ab €1.500",
      dates: "02.05.2026 / 26.09.2026",
      description: "Intensiver Wochenkurs zur Vorbereitung auf die Prüfung und den Erwerb des kroatischen Sportbootführerscheins B. Kleingruppen (max. 6 Personen) garantieren eine individuelle Ausbildung mit persönlicher Betreuung. Nach der Anmeldung kontaktieren wir Sie für alle Details.",
    },
    course2: {
      title: "Aufbaukurs Hafenmanöver",
      price: "ab €1.600",
      dates: "09.05.2026 / 16.05.2026",
      description: "Perfektionieren Sie Ihre Manöver in diesem intensiven Praxiskurs. Wir trainieren das sichere An- und Ablegen bei verschiedenen Wetterbedingungen. Ideal für Skipper, die ihre Sicherheit im Hafen stärken oder nach der Winterpause auffrischen wollen.",
    },
    instructor: {
      bio: "Als erfahrener Segellehrer mit einer Leidenschaft für das Meer ist es mein Ziel, nicht nur Wissen zu vermitteln, sondern echte Sicherheit am Steuer zu geben. Mein Ansatz basiert auf Geduld, Professionalität und jahrelanger Erfahrung in den Gewässern Kroatiens.",
      quote: "Segeln ist mehr als nur eine Fähigkeit — es ist ein Gefühl von Freiheit, das auf solidem Handwerk beruht. In meinen Kursen lernen Sie nicht nur für die Prüfung, sondern für das echte Leben auf See.",
    },
    about: {
      text: "Als Ihr Mentor bringe ich jahrelange Erfahrung und fundierte nautische Kenntnisse direkt an Bord. Mein Ziel ist es, Ihnen nicht nur die Theorie zu vermitteln, sondern echte Sicherheit und Souveränität am Steuer zu schenken. Unsere Schulungen werden vollständig in deutscher Sprache durchgeführt.",
    },
  };

  const savedContent = (() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("mentorContent");
      return saved ? JSON.parse(saved) : defaultContent;
    }
    return defaultContent;
  })();

  return { ...defaultContent, ...savedContent };
};
