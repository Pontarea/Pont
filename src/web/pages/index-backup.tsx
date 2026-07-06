import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useContent } from "../hooks/useContent";

// ============================================
// PONTAREA - SEGELKURSE IN KROATIEN
// Sportbootführerschein & Hafenmanöver
// Light Theme: Sky/White/Navy
// ============================================

// Navigation Component
const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#kurse", label: "Kurse" },
    { href: "#warum-pontarea", label: "Warum Pontarea?" },
    { href: "#yacht-miete", label: "Yacht-Miete" },
    { href: "#faq", label: "FAQ" },
    { href: "#kontakt", label: "Kontakt" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-md border-b border-sky-100"
          : "bg-white/50 backdrop-blur-md"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#hero")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="flex items-center gap-3 group"
          >
            <img 
              src="./pontarea-logo.svg" 
              alt="Pontarea Logo" 
              className="h-8"
            />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="text-gray-700 hover:text-sky-600 transition-colors text-sm font-medium"
              >
                {link.label}
              </button>
            ))}
            <Button
              onClick={() => scrollToSection("#kontakt")}
              className="h-10 px-6 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-full hover:shadow-lg transition-all"
            >
              Anmelden
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-white/95 backdrop-blur-md overflow-hidden transition-all duration-300 border-t border-sky-100 ${
          isMenuOpen ? "max-h-80" : "max-h-0"
        }`}
      >
        <div className="px-6 py-4 space-y-1">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollToSection(link.href)}
              className="block w-full text-left py-3 text-gray-700 hover:text-sky-600 transition-colors text-sm"
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

// ============================================
// BLOCK 1: HERO - CONCRETE OFFER
// ============================================
const HeroSection = () => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-sky-50 via-white to-blue-50">
      {/* Decorative Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-100 rounded-full blur-3xl opacity-40" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-40" />
      </div>

      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src="./hero-yacht-sailing-IEpfwImo3P9r9BWF4V6Lc.png"
          alt="Yacht sailing in Croatia"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-sky-50/80 via-white/60 to-white/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-20">
        {/* Small Text - Trust Badge */}
        <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-xl border border-sky-200 rounded-full px-4 py-2 mb-8 animate-fadeIn shadow-sm">
          <span className="w-2 h-2 bg-gradient-to-r from-sky-500 to-blue-600 rounded-full animate-pulse" />
          <span className="text-gray-700 text-sm tracking-wide font-medium">
            Pontarea – Deine Segelschule
          </span>
        </div>

        {/* Main Title - Concrete Offer */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 tracking-tight animate-fadeInUp leading-tight">
          Segelkurse in Kroatien
        </h1>
        
        <p className="text-2xl text-sky-600 font-semibold mb-8 animate-fadeInUp animation-delay-200">
          Skipper-Lizenz & Hafenmanöver-Training
        </p>
        
        {/* Subheadline - Trust Message */}
        <div className="max-w-2xl mx-auto mb-10 animate-fadeInUp animation-delay-400 bg-blue-50 border-l-4 border-sky-500 px-6 py-4 rounded">
          <p className="text-gray-700 font-semibold mb-2">Über 50 Absolventen pro Saison</p>
          <p className="text-gray-600">Bisher 100% Bestehensquote unserer Kursteilnehmer (bei vollständiger Kursteilnahme)</p>
        </div>

        {/* 5 Key Bullets */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto mb-12 animate-fadeInUp animation-delay-400">
          <div className="flex items-center gap-3 text-left">
            <span className="text-2xl">📍</span>
            <span className="text-gray-700 font-medium">Ort: Marina Dalmacija (Kroatien)</span>
          </div>
          <div className="flex items-center gap-3 text-left">
            <span className="text-2xl">👥</span>
            <span className="text-gray-700 font-medium">Gruppe: max. 6 Teilnehmer</span>
          </div>
          <div className="flex items-center gap-3 text-left">
            <span className="text-2xl">⛵</span>
            <span className="text-gray-700 font-medium">Format: Theorie + tägliche Praxis an Bord</span>
          </div>
          <div className="flex items-center gap-3 text-left">
            <span className="text-2xl">🎯</span>
            <span className="text-gray-700 font-medium">Ziel: sicher chartern in Kroatien (bis 17 m)</span>
          </div>
          <div className="flex items-center gap-3 text-left col-span-1 md:col-span-2">
            <span className="text-2xl">📅</span>
            <span className="text-gray-700 font-medium">Ablauf: Sa–Sa, inkl. Prüfungsorganisation</span>
          </div>
        </div>

        {/* CTA Buttons - Side by Side */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 animate-fadeInUp animation-delay-600">
          <Button
            size="lg"
            onClick={() => scrollToSection("#kurse")}
            className="h-14 px-10 bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold text-lg rounded-full hover:shadow-lg transition-all duration-300"
          >
            Kurse entdecken
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => scrollToSection("#kontakt")}
            className="h-14 px-10 border-2 border-sky-400 text-sky-600 font-semibold text-lg rounded-full hover:bg-sky-50 transition-all duration-300 bg-white"
          >
            Jetzt anmelden
          </Button>
        </div>

        {/* Trust Micro-text */}
        <p className="text-gray-600 text-sm animate-fadeInUp animation-delay-600">
          ✓ Antwort innerhalb von 24h
        </p>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-sky-400 flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-sky-400 rounded-full" />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 1s ease-out forwards; }
        .animate-fadeInUp { animation: fadeInUp 1s ease-out forwards; }
        .animation-delay-200 { animation-delay: 0.2s; opacity: 0; }
        .animation-delay-400 { animation-delay: 0.4s; opacity: 0; }
        .animation-delay-600 { animation-delay: 0.6s; opacity: 0; }
        .animation-delay-800 { animation-delay: 0.8s; opacity: 0; }
      `}</style>
    </section>
  );
};

// ============================================
// BLOCK 2: NUMBERS & TRUST - "WARUM PONTAREA?"
// ============================================
const TrustSection = () => {
  const stats = [
    { number: ">50", label: "Absolventen / Saison", icon: "👥" },
    { number: "100%", label: "Bestehensquote*", icon: "✓", note: "*bei vollständiger Kursteilnahme" },
    { number: "max. 6", label: "Teilnehmer pro Kurs", icon: "⛵" },
    { number: "20+", label: "Jahre Erfahrung", icon: "🏆" },
  ];

  return (
    <section id="warum-pontarea" className="py-24 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-sky-50 rounded-full blur-3xl opacity-40" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-40" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Warum Pontarea?
          </h2>
          <p className="text-lg text-gray-600">Vertrauen Sie auf Erfahrung und Kompetenz</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-gradient-to-br from-sky-50 to-blue-50 border border-sky-200 rounded-2xl p-8 text-center hover:shadow-lg transition-all">
              <div className="text-5xl mb-4">{stat.icon}</div>
              <div className="text-4xl font-bold text-sky-600 mb-2">{stat.number}</div>
              <p className="text-gray-700 font-semibold">{stat.label}</p>
              {stat.note && <p className="text-xs text-gray-500 mt-3">{stat.note}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// BLOCK 3: REVIEWS - "BEWERTUNGEN"
// ============================================
const ReviewsSection = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-white via-sky-50 to-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Bewertungen
          </h2>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Bogdan Reviews */}
          <div className="bg-white border border-sky-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition-all">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Bewertungen zum Trainer Bogdan (Google)</h3>
            
            <div className="space-y-6 mb-8">
              <div className="flex gap-2">
                <span className="text-yellow-400 flex gap-1">★★★★★</span>
                <p className="text-gray-700 italic">"Hervorragender Instruktor, sehr geduldig und professionell. Habe mich sofort sicher gefühlt."</p>
              </div>
              <div className="flex gap-2">
                <span className="text-yellow-400 flex gap-1">★★★★★</span>
                <p className="text-gray-700 italic">"Bogdan ist ein Naturtalent als Lehrer. Die 7 Tage waren intensiv aber absolut wertvoll."</p>
              </div>
              <div className="flex gap-2">
                <span className="text-yellow-400 flex gap-1">★★★★★</span>
                <p className="text-gray-700 italic">"Kann den Kurs nur empfehlen. Preis-Leistung unschlagbar."</p>
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full border-sky-300 text-sky-600 hover:bg-sky-50"
              onClick={() => window.open("https://maps.app.goo.gl/coqwatgTno6VFN9A7", "_blank")}
            >
              Alle Bewertungen ansehen
            </Button>
          </div>

          {/* Pontarea Reviews */}
          <div className="bg-white border border-blue-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition-all">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Bewertungen zur Pontarea (Google)</h3>
            
            <div className="space-y-6 mb-8">
              <div className="flex gap-2">
                <span className="text-yellow-400 flex gap-1">★★★★★</span>
                <p className="text-gray-700 italic">"Top-notch sailing school mit exzellenter Ausstattung. Sehr zu empfehlen!"</p>
              </div>
              <div className="flex gap-2">
                <span className="text-yellow-400 flex gap-1">★★★★★</span>
                <p className="text-gray-700 italic">"Professionelle Organisation, freundliches Team, tolle Boote."</p>
              </div>
              <div className="flex gap-2">
                <span className="text-yellow-400 flex gap-1">★★★★★</span>
                <p className="text-gray-700 italic">"Ein Traum für jeden Segler. Marina Dalmacija ist wunderschön."</p>
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full border-blue-300 text-blue-600 hover:bg-blue-50"
              onClick={() => window.open("https://maps.app.goo.gl/A6kvwj79UC5c79bM7", "_blank")}
            >
              Alle Bewertungen ansehen
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// ============================================
// COURSES SECTION - TWO SEPARATE COURSES
// ============================================
const CoursesSection = () => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const courses = [
    {
      id: 1,
      title: "Kapitänkurs",
      subtitle: "Skipper-Lizenz (Intensiv)",
      price: "€1.500",
      dates: ["02.05.2026", "26.09.2026"],
      duration: "7 Tage",
      description: "Intensiver Wochenkurs zur Erlangung der kroatischen Skipper-Lizenz (Sportbootführerschein B). Theorie und Praxis direkt auf dem Boot.",
      features: [
        "Internationale Lizenz (unbegrenzt gültig)",
        "Berechtigung zum Chartern bis 17m",
        "Unterkunft auf der Yacht",
        "Komplette Prüfungsvorbereitung",
        "Lernmaterial inklusive",
        "Max. 6 Teilnehmer"
      ],
      gradient: "from-sky-400 to-blue-500",
      image: "./captain-helm_new_resized.png"
    },
    {
      id: 2,
      title: "Hafenmanöver",
      subtitle: "Anlege & Manöver-Training",
      price: "€1.600",
      dates: ["25.04.2026", "09.05.2026"],
      duration: "7 Tage",
      description: "Einzigartiger Kurs, der NUR auf Hafenmanöver fokussiert - das Schwerste beim Segeln! Training im Hafen und nahegelegenen Lagunen. Der Ablauf wird flexibel an das Tempo der Gruppe angepasst und gemeinsam mit dem Team entschieden.",
      features: [
        "Fokus: Anlege & Hafenmanöver",
        "Training im Hafen und Lagunen",
        "An- und Ablegen unter allen Bedingungen",
        "Ankermanöver & Mooring",
        "Flexibles Tempo nach Gruppenfortschritt",
        "Max. 6 Teilnehmer"
      ],
      gradient: "from-teal-400 to-cyan-500",
      image: "./marina-docking_resized.png",
      unique: true
    }
  ];

  return (
    <section id="kurse" className="py-32 bg-gradient-to-b from-white via-blue-50 to-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-sky-100 rounded-full blur-3xl opacity-30" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-100 rounded-full blur-3xl opacity-30" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20">
          <p className="text-sky-600 text-sm uppercase tracking-[0.3em] font-semibold mb-4">Unsere Angebote</p>
          <h2 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent tracking-tight mb-6">
            Kurse
          </h2>
          <p className="text-gray-600 text-xl max-w-2xl mx-auto">
            Professionelle Segelausbildung in der atemberaubenden Kulisse Kroatiens
          </p>
        </div>

        {/* Course Cards */}
        <div className="grid lg:grid-cols-2 gap-8">
          {courses.map((course) => (
            <div
              key={course.id}
              className="group bg-white/80 backdrop-blur-xl border-2 border-sky-100 rounded-3xl overflow-hidden hover:border-sky-300 transition-all duration-500 shadow-lg hover:shadow-2xl relative"
            >
              {/* Unique Badge */}
              {course.unique && (
                <div className="absolute top-4 right-4 z-10 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg">
                  EINZIGARTIG
                </div>
              )}

              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-sky-900/30 to-transparent" />
                
                {/* Price Badge */}
                <div className={`absolute bottom-4 left-4 bg-gradient-to-r ${course.gradient} text-white font-bold px-5 py-3 rounded-2xl shadow-lg`}>
                  {course.price}
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <div className="flex items-center gap-2 mb-4">
                  <span className={`w-3 h-3 rounded-full bg-gradient-to-r ${course.gradient}`} />
                  <span className="text-gray-500 text-sm font-medium">{course.duration}</span>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{course.title}</h3>
                <p className="text-sky-600 text-sm font-semibold mb-4">{course.subtitle}</p>
                <p className="text-gray-600 mb-6 leading-relaxed">{course.description}</p>

                {/* Dates */}
                <div className="mb-6 bg-sky-50 border border-sky-200 rounded-lg p-4">
                  <p className="text-gray-700 font-semibold mb-2">📅 Nächste Termine:</p>
                  <div className="flex flex-wrap gap-2">
                    {course.dates.map((date, idx) => (
                      <span key={idx} className="bg-white border border-sky-300 text-sky-700 font-medium px-3 py-1 rounded-full text-sm">
                        {date}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div className="grid grid-cols-1 gap-3 mb-8">
                  {course.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-sky-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-600 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <Button
                  onClick={() => scrollToSection("#kontakt")}
                  className={`w-full h-12 bg-gradient-to-r ${course.gradient} text-white font-semibold rounded-lg hover:shadow-lg transition-all`}
                >
                  Jetzt anmelden
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 bg-white border border-sky-200 rounded-2xl p-8 text-center">
          <p className="text-gray-700 text-lg mb-2">
            <strong>Beide Kurse finden in Marina Dalmacija, Kroatien statt</strong>
          </p>
          <p className="text-gray-600">
            Max. 6 Teilnehmer pro Kurs • Über 50 Absolventen pro Saison • 100% Bestehensquote
          </p>
        </div>
      </div>
    </section>
  );
};

// ============================================
// BLOCK 5: WHAT'S INCLUDED / EXTRA COSTS
// ============================================
const InclusiveSection = () => {
  const included = [
    "Unterkunft auf der Yacht",
    "Bettwäsche und Handtücher",
    "Dienstleistungen des Trainers/Kapitäns (7 Tage)",
    "Liegeplatz in der Heimatmarina (Strom, Wasser)",
    "Treibstoff und Gas zum Kochen",
    "Endreinigung",
    "Vollständige Prüfungsvorbereitung",
    "Lernmaterial & Skripte",
  ];

  const additionalCosts = [
    { position: "Verpflegung auf dem Boot (pro Person/Woche)", total: "€600–600", perPerson: "€100" },
    { position: "Touristen-Taxe", total: "€60–60", perPerson: "€10 pro Woche" },
    { position: "Zusätzlicher Treibstoff", total: "€150", perPerson: "€25 pro Person" },
    { position: "Prüfungsgebühren (falls extern)", total: "€150", perPerson: "€150" },
    { position: "Liegeplätze außerhalb der Heimatmarine", total: "€120", perPerson: "pro Nacht" },
  ];

  const bortkasse = {
    perPerson: "€135",
    items: [
      "Verpflegung: €100 pro Person",
      "Touristen-Taxe: €10 pro Person",
      "Zusätzlicher Treibstoff: €25 pro Person"
    ]
  };

  const depository = {
    total: "€3.000",
    perPerson: "€500",
    note: "geteilt zwischen 6 Personen",
    insurance: {
      cost: "€250",
      perPerson: "€42",
      benefit: "Statt Kaution: nur 5% oder min. €150 bei Schäden"
    }
  };

  return (
    <section className="py-24 bg-gradient-to-b from-white via-blue-50 to-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Was ist inklusive? Zusatzkosten?
          </h2>
          <p className="text-lg text-gray-600">Vollständige Transparenz – keine versteckten Kosten</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* What's Included */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="text-green-500">✓</span> Was ist inklusive
            </h3>
            <ul className="space-y-3">
              {included.map((item, idx) => (
                <li key={idx} className="flex gap-3 text-gray-700">
                  <span className="text-sky-500 font-bold text-lg">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Additional Costs */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="text-orange-500">⚠</span> Zusatzkosten
            </h3>

            {/* Bortkasse Section */}
            <div className="mb-6 bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-300 rounded-lg p-6">
              <h4 className="text-xl font-bold text-gray-900 mb-3">💰 Bortkasse pro Person: <span className="text-orange-600">€135</span></h4>
              <p className="text-gray-700 mb-4 text-sm">
                Die Bortkasse wird von allen Teilnehmern gemeinsam eingezahlt und für folgende Kosten verwendet:
              </p>
              <ul className="space-y-2">
                {bortkasse.items.map((item, idx) => (
                  <li key={idx} className="flex gap-3 text-gray-700 text-sm">
                    <span className="text-orange-500 font-bold">→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Other Additional Costs */}
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-sky-300 bg-sky-50">
                    <th className="text-left py-2 font-semibold text-gray-800">Sonstige Kosten</th>
                    <th className="text-right py-2 font-semibold text-gray-800">pro Person</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sky-100">
                  {additionalCosts.map((cost, idx) => (
                    <tr key={idx} className="hover:bg-sky-50 transition-colors">
                      <td className="py-3 text-gray-700">{cost.position}</td>
                      <td className="text-right text-gray-700 font-semibold">{cost.perPerson}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Kaution Section */}
            <div className="bg-sky-50 border border-sky-300 rounded-lg p-6 mb-6">
              <h4 className="text-lg font-bold text-gray-900 mb-4">🔒 Kaution (rückzahlbar)</h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div className="bg-white border border-sky-200 rounded p-4">
                  <p className="text-xs text-gray-600 uppercase font-semibold mb-1">Ohne Versicherung</p>
                  <p className="text-2xl font-bold text-gray-900">€3.000</p>
                  <p className="text-sm text-gray-600 mt-2">
                    Gesamt pro Gruppe<br/>
                    <span className="font-semibold">≈ €500 pro Person*</span>
                  </p>
                  <p className="text-xs text-gray-500 mt-2">* Bei 6 Personen. Wird vollständig zurückgegeben wenn keine Schäden.</p>
                </div>

                <div className="bg-amber-50 border-2 border-amber-400 rounded p-4">
                  <p className="text-xs text-gray-600 uppercase font-semibold mb-1">Empfohlen: Mit Versicherung</p>
                  <p className="text-2xl font-bold text-amber-600">€42</p>
                  <p className="text-sm text-gray-700 mt-2">
                    pro Person<br/>
                    <span className="font-semibold text-amber-700">Nur €250 total</span>
                  </p>
                  <p className="text-xs text-amber-700 mt-2 font-semibold">Bei Schäden: nur 5% oder min. €150</p>
                </div>
              </div>

              <p className="text-xs text-gray-600 bg-white p-3 rounded border border-gray-200">
                <strong>Wichtig:</strong> Die Kaution wird von allen Teilnehmern geteilt getragen (unabhängig von Schuld). Erfahrungsgemäß ist die Kautionsversicherung (€250 oder €42/Person) eine wirtschaftlich bessere Alternative.
              </p>
            </div>

            {/* Summary */}
            <div className="bg-blue-50 border border-blue-300 rounded-lg p-4">
              <p className="text-gray-800 text-sm">
                <strong>Zusammenfassung typischer Zusatzkosten pro Person:</strong><br/>
                • Bortkasse: €135 (Verpflegung, Taxe, Treibstoff)<br/>
                • Kautionsversicherung: €42 (empfohlen, statt Risiko €500)<br/>
                • Prüfungsgebühren (optional): €150<br/>
                <span className="font-semibold">Total: ca. €177–327 pro Person</span> (je nach Optionen)
              </p>
            </div>
          </div>
        </div>

        {/* Trust Note */}
        <div className="mt-12 bg-green-50 border border-green-300 rounded-lg p-6 text-center">
          <p className="text-gray-800">
            <strong>Transparenz ist uns wichtig:</strong> Alle Preise gelten pro Person bei Vollbelegung (max. 6 Teilnehmer). Rabatte bei kleineren Gruppen auf Anfrage.
          </p>
        </div>
      </div>
    </section>
  );
};

// ============================================
// BLOCK 6: PROCESS IN 3 STEPS
// ============================================
const ProcessSection = () => {
  const steps = [
    {
      number: 1,
      title: "Anfrage senden",
      description: "Wünsch dir deinen Termin und dein Paket. Keine Bindung – unverbindliche Anfrage.",
      icon: "📋",
    },
    {
      number: 2,
      title: "Bestätigung & Vorbereitung",
      description: "Du erhältst Bestätigung, Unterlagen, Vorbereitsplan & alle Infos innerhalb 24h.",
      icon: "✓",
    },
    {
      number: 3,
      title: "7 Tage Training + Prüfung",
      description: "Intensives Learning, tägliche Praxis an Bord, Prüfung & Zertifikat am Samstag.",
      icon: "⛵",
    },
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            So funktioniert's
          </h2>
          <p className="text-lg text-gray-600">Drei einfache Schritte zum Erfolg</p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {steps.map((step, idx) => (
            <div key={idx} className="relative h-full">
              {/* Card */}
              <div className="bg-gradient-to-br from-sky-50 to-blue-50 border-2 border-sky-200 rounded-2xl p-8 text-center hover:shadow-lg transition-all h-full flex flex-col">
                <div className="text-6xl mb-4">{step.icon}</div>
                <div className="inline-block bg-sky-500 text-white font-bold px-4 py-2 rounded-full mb-4 mx-auto">
                  Schritt {step.number}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-700 flex-grow">{step.description}</p>
              </div>

              {/* Arrow (not on last) */}
              {idx < steps.length - 1 && (
                <div className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-20">
                  <div className="text-4xl text-sky-300">→</div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile Arrows */}
        <div className="md:hidden text-center space-y-4">
          <div className="text-3xl text-sky-300">↓</div>
          <div className="text-3xl text-sky-300">↓</div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// BLOCK 7: COURSE SCHEDULE - "7 TAGE ÜBERBLICK"
// ============================================
const ScheduleDetailSection = () => {
  const [expandedDay, setExpandedDay] = useState<number | null>(null);

  const dailySchedule = [
    {
      day: "Samstag",
      title: "Bootsübernahme, Vorratseinkauf, Sicherheitsunterweisung",
      brief: "Regeln für den Empfang von Charterbooten. Sicherheitsunterweisung: Schwimmwesten, Pyrotechnik, Erste-Hilfe-Kasten, Feuerlöscher, Sicherheitsgurte; VHF-Funkgeräte; Grundlegende Sicherheitsausrüstung für Yachten: Toiletten, Wasser- und Tauchpumpen, Kombüse und Gasflaschen, Batterien, Kabinenbeleuchtung; sichere Handhabung von Seilwinden.",
      detailed: "Praktische Übungen zur Bootsübernahme und Sicherheitsausrüstung. Trainingszeit: ca. 6–8 Stunden mit Einweisung in alle Bordsysteme.",
    },
    {
      day: "Sonntag",
      title: "Segeln, Seekarten, Navigation, Funkverkehr auf See",
      brief: "Erstes Ausfahren auf Meer und Steuern der Yacht unter Motor: Das Verlassen des Liegeplatzes und das Anfahren des Liegeplatzes; Sicherheit auf dem Meer, Beobachtung der Umgebungsbedingungen, allgemeine Pflichten auf dem Schiff, Steuern des Bootes mit dem Steuerrad unter Berücksichtigung von Wind und Strömungen. Funkverkehr auf See: Ausrüstung, Funkvorschriften, Internationaler Code der Signale, Notfall-Funkverkehr. Karten und deren Handhabung: Kartenarten, Symbole, Gefahren, Tiefen, Seezeichen; Navigationstechniken, Kursbestimmung; GPS und andere elektronische Navigationsmittel; Koordinaten. Kompass und Erdmagnetismus: Arten von Kompassen, ihre Verwendung; Neigung, Abweichung, Einbeziehung von Korrekturen; Wahrer- und Kompass-Kurs.",
      detailed: "Praktische Navigation auf See mit GPS und Seekarten. Funkübungen und Manövertraining. Trainingszeit: ca. 6–8 Stunden.",
    },
    {
      day: "Montag",
      title: "Internationale Regeln zur Verhütung von Zusammenstößen auf See",
      brief: "Lichterführung von Schiffen: Tag- und Nachtsignale; Kennzeichnung des Bootes während der Fahrt; Kennzeichnung des Bootes vorm Anker. Kollisionsverhütungsregeln: Ausweichen, Kurs halten, Manöver zur Vermeidung von Unfällen, Verhalten im Fahrwasser, Überholen usw.; Regeln für das Anlegen; Verhütung der Wasserverschmutzung und Entsorgung der an Bord von Schiffen anfallenden Abfälle; Festigung des gelernten Stoffes.",
      detailed: "Praktische Anwendung der Kollisionsverhütungsregeln in realen Situationen. Übungen zur Lichterführung und Manövrieren. Trainingszeit: ca. 6–8 Stunden.",
    },
    {
      day: "Dienstag",
      title: "Schifffahrtsfunk. Prüfung",
      brief: "Schifffahrtsfunk: Ausrüstung; Funkvorschriften; Internationaler Code der Signale; Notfall-Funkkommunikation. Von 15.00 bis 17.00 Uhr: Mündliche Prüfung durch die Kommission des Ministeriums für Seeverkehr der Republik Kroatien.",
      detailed: "Vormittags: Funktraining und Vorbereitung. Nachmittags (15:00-17:00): Offizielle mündliche Prüfung durch die kroatische Kommission.",
    },
    {
      day: "Mittwoch",
      title: "Aufbau und Ausrüstung von Segelyachten. Segel und Segelführung",
      brief: "Bootsaufbau und -ausrüstung: Rumpf; Beplankung und Decksbelag; Das Rigg: Mast, stehendes Gut und laufendes Gut; Die Segel; Yachtausrüstung und -einrichtung. Der Anker. Grundlagen des Segelns auf einer Yacht: Handhabung von Segeln, Setzen und Bergen von Segeln; Seilwinden, ein Baum und andere Gefahren auf dem Boot. Segel und Segelhandhabung: Setzen von Segeln, Hissen und Senken von Segeln, Rollreffs; Segel setzen, Handhabung von Großsegel und Fock; Segeleinstellung, Einfluss der Fallspannung.",
      detailed: "Intensive praktische Segelübungen: Setzen und Bergen von Segeln, Wenden, Halsen. Ankertraining. Trainingszeit: ca. 6–8 Stunden.",
    },
    {
      day: "Donnerstag",
      title: "Praktische Übungen",
      brief: "Steuern des Bootes unter verschiedenen Segelbedingungen: Setzen und Bergen von Segeln; die Grundregeln für das Steuern einer Segelyacht; Der Am-Wind-Kurs; Lavieren; Wenden über die Fock; Raumschots-Kurse. Das Ablegen von und das Anfahren zu dem Halteplatz: Driftmanöver; Abfahrt vom und Anfahrt zu der Boje; Ablegen und Anlegen an einem Steg; Anker werfen und ankern; Anlegen und Festmachen.",
      detailed: "Ganztägige Segelpraxis: Am-Wind-Kurse, Wenden, Anlegemanöver. Intensives Training aller wichtigen Manöver. Trainingszeit: ca. 6–8 Stunden.",
    },
    {
      day: "Freitag",
      title: "Praktische Übungen",
      brief: "Das Verlassen des Liegeplatzes und die Anfahrt zum Liegeplatz: Manövrieren unter sehr engen Platzverhältnissen; Abfahren von und Anlaufen eines Liegeplatzes mit einem Driftmanöver; Anlegetraining an einem Liegeplatz. Sonderfälle des Segelns: 'Mann über Bord!'; Boot auf Grund gelaufen. 17.00 Uhr: Rückkehr in den Heimathafen.",
      detailed: "Finales Manövertraining: Enge Häfen, Mann-über-Bord-Manöver, Notfallsituationen. Abschlusstraining mit allen gelernten Fähigkeiten. Rückkehr 17:00 Uhr.",
    },
    {
      day: "Samstag",
      title: "Ende der Veranstaltung",
      brief: "Abreise der Kursteilnehmer. Bootsrückgabe; Endabrechnung.",
      detailed: "Bootsrückgabe und Verabschiedung. Optionale Fragen und Feedback-Gespräch mit Bogdan.",
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white via-sky-50 to-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            7 Tage Kursplan - Kapitänkurs
          </h2>
          <p className="text-lg text-gray-600">Strukturiert, progressiv, praxisorientiert</p>
          <p className="text-sm text-gray-500 mt-2">
            *Dieses Programm gilt für den Kapitänkurs. Der Hafenmanöver-Kurs folgt einem flexiblen Trainingsplan, der individuell an die Gruppe angepasst wird.
          </p>
        </div>

        {/* Daily Schedule */}
        <div className="space-y-4 mb-12">
          {dailySchedule.map((item, idx) => (
            <div
              key={idx}
              className="bg-white border-2 border-sky-200 rounded-xl overflow-hidden hover:shadow-lg transition-all"
            >
              <button
                onClick={() => setExpandedDay(expandedDay === idx ? null : idx)}
                className="w-full px-6 py-4 flex items-center gap-4 hover:bg-sky-50 transition-colors"
              >
                <div className="flex-1 text-left">
                  <div className="font-bold text-gray-900 text-lg">{item.day}</div>
                  <div className="text-sky-600 font-semibold">{item.title}</div>
                  <div className="text-gray-600 text-sm mt-1">{item.brief}</div>
                </div>
                <div className={`text-2xl text-sky-500 transition-transform ${expandedDay === idx ? "rotate-180" : ""}`}>
                  ▼
                </div>
              </button>

              {expandedDay === idx && (
                <div className="px-6 py-4 bg-sky-50 border-t border-sky-200">
                  <p className="text-gray-700">
                    <strong>Detaillierte Agenda für {item.day}:</strong> {item.detailed}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Expandable Note */}
        <div className="bg-blue-50 border-l-4 border-blue-500 px-6 py-4 rounded">
          <p className="text-gray-700">
            <strong>Hinweis:</strong> Der genaue Tagesablauf kann je nach Wetter und Windverhältnissen angepasst werden. Bogdan sorgt dafür, dass alle Inhalte in den 7 Tagen komplett behandelt werden.
          </p>
        </div>
      </div>
    </section>
  );
};

// ============================================
// BLOCK 8: YACHT RENTAL AFTER CERTIFICATION
// ============================================
const YachtRentalSection = () => {
  return (
    <section id="yacht-miete" className="py-24 bg-gradient-to-b from-white via-sky-50 to-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Nach der Lizenz: Yacht-Miete leicht gemacht
          </h2>
          <p className="text-lg text-gray-600">Mit deinem Sportbootführerschein beginnt dein Abenteuer</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Vom Training zur ersten Segelreise
            </h3>
            <p className="text-gray-700 mb-4">
              Nach erfolgreichem Abschluss deines Kapitänkurses oder Hafenmanöver-Trainings bist du bereit für dein nächstes Abenteuer! Du kannst sofort aus unserem umfangreichen Katalog wählen und die richtige Yacht für deine Reise finden.
            </p>
            <p className="text-gray-700 mb-6">
              <strong>Pontarea bietet nicht nur Ausbildung – wir helfen dir auch bei der Auswahl und Miete:</strong>
            </p>
            
            <ul className="space-y-3 mb-8">
              <li className="flex gap-3 text-gray-700">
                <span className="text-sky-500 font-bold text-lg">✓</span>
                <span><strong>Segelyachten, Motorboote & Katamarane</strong> – Alle Größen und Arten verfügbar</span>
              </li>
              <li className="flex gap-3 text-gray-700">
                <span className="text-sky-500 font-bold text-lg">✓</span>
                <span><strong>Mehrere Länder</strong> – Yachten in Kroatien, Griechenland, Spanien und vielen weiteren Ländern</span>
              </li>
              <li className="flex gap-3 text-gray-700">
                <span className="text-sky-500 font-bold text-lg">✓</span>
                <span><strong>Einfaches Preisvergleich</strong> – Vergleiche alle Angebote auf einer Plattform</span>
              </li>
              <li className="flex gap-3 text-gray-700">
                <span className="text-sky-500 font-bold text-lg">✓</span>
                <span><strong>Persönliche Beratung</strong> – Bogdan hilft dir bei der Wahl der richtigen Yacht</span>
              </li>
            </ul>

            <a 
              href="https://pontarea.com/de/search/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold rounded-lg hover:shadow-lg transition-all hover:scale-105"
            >
              Yacht-Katalog durchsuchen →
            </a>
          </div>

          {/* Right: Benefits Grid */}
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-sky-50 to-blue-50 border-2 border-sky-200 rounded-2xl p-6 hover:shadow-lg transition-all">
              <div className="flex gap-4">
                <div className="text-4xl">🚤</div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Vielfältiges Angebot</h4>
                  <p className="text-sm text-gray-700">Von kleinen Segelbooten bis zu großen Katamaranen – für jeden Geschmack</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-teal-50 to-cyan-50 border-2 border-teal-200 rounded-2xl p-6 hover:shadow-lg transition-all">
              <div className="flex gap-4">
                <div className="text-4xl">🌍</div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Weltweit verfügbar</h4>
                  <p className="text-sm text-gray-700">Yachten in über 10 Ländern. Chartern Sie überall, wo Sie möchten</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-6 hover:shadow-lg transition-all">
              <div className="flex gap-4">
                <div className="text-4xl">💰</div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Transparente Preise</h4>
                  <p className="text-sm text-gray-700">Alle Preise auf einen Blick – einfach vergleichen und buchen</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-cyan-50 to-sky-50 border-2 border-cyan-200 rounded-2xl p-6 hover:shadow-lg transition-all">
              <div className="flex gap-4">
                <div className="text-4xl">👨‍⚓</div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Professionelle Unterstützung</h4>
                  <p className="text-sm text-gray-700">Bogdan kennt alle Yachten und hilft bei der perfekten Wahl</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 bg-gradient-to-r from-sky-100 to-blue-100 border-2 border-sky-300 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Bereit für dein nächstes Abenteuer?</h3>
          <p className="text-gray-700 mb-6">
            Mit deinem Sportbootführerschein in der Tasche und der richtigen Yacht – die Meere der Welt warten auf dich!
          </p>
          <a 
            href="https://pontarea.com/de/search/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 bg-sky-500 text-white font-bold rounded-lg hover:bg-sky-600 transition-colors"
          >
            Zum Yacht-Katalog
          </a>
        </div>
      </div>
    </section>
  );
};

// ============================================
// BLOCK 9: FAQ - SHORT & SELLING-FOCUSED
// ============================================
const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number>(0);

  const faqItems = [
    {
      question: "Welches Zertifikat erhalte ich?",
      answer: "Du erhältst den kroatischen Sportbootführerschein (Kategorie B) vom Ministry of Maritime Affairs, Republic of Croatia. Das Zertifikat ist unbegrenzt gültig und berechtigt dich zum Chartern von Booten bis 17 m in kroatischen Gewässern. Es ist in der gesamten EU anerkannt.",
    },
    {
      question: "In welcher Sprache findet der Unterricht statt?",
      answer: "Der Unterricht findet hauptsächlich auf Deutsch statt, mit englischen Fachbegriffen. Prüfungsfragen können bei Bedarf auf Englisch oder Deutsch beantwortet werden.",
    },
    {
      question: "Was passiert, wenn das Wetter schlecht ist?",
      answer: "Marina Dalmacija liegt in einem geschützten Gebiet. Bei sehr schlechtem Wetter verlagern wir Praxisübungen auf 1–2 Tage später. Die Theorie läuft wetterunabhängig. In 20+ Jahren Pontarea-Betrieb ist noch kein Kurs abgebrochen worden.",
    },
    {
      question: "Was brauche ich für die Prüfung?",
      answer: "Pass/ID, Schwimmnachweis (nicht zwingend, aber empfohlen). Physische & mentale Eignung zum Segelführerschein sind erforderlich. Wenn du größere medizinische Einschränkungen hast, kontaktiere uns vorab.",
    },
    {
      question: "Fallen Zusatzkosten an?",
      answer: "In beiden Kursen sind Unterricht, Unterkunft auf der Yacht, Materialien & Prüfung/Zertifikat enthalten. Verpflegung (ca. €200–250), ggf. Einzelzimmer-Upgrade und Anreise fallen extra an – siehe 'Zusatzkosten'.",
    },
    {
      question: "Was, wenn ich Anfänger bin – kann ich mithalten?",
      answer: "Ja! Der Kurs ist für Anfänger konzipiert. Bogdan passt das Tempo an. Bei Einzelpersonen wird der Unterricht individualisiert. Wichtig: Schwimmen können (oder zumindest wassersicher sein) wird empfohlen.",
    },
    {
      question: "Wie viele Menschen sind auf dem Boot?",
      answer: "Beide Kurse: max. 6 Teilnehmer pro Boot. Kleine Gruppen bedeuten persönlicheren Unterricht und mehr individuelle Praxis. In den 7 Tagen hat jeder genug Zeit am Steuer.",
    },
    {
      question: "Wie läuft die Anmeldung ab?",
      answer: "1) Kontaktiere uns mit Wunschtermin & Kurs (Formular unten). 2) Wir schicken Bestätigung & Unterlagen. 3) Anzahlung (€300–500, Rest vor Kurs). 4) Du erhältst finale Agenda & Vorbereitungsunterlagen.",
    },
    {
      question: "Gibt es einen Rabatt für Gruppen?",
      answer: "Ja! Ab 3 Personen bieten wir 5–10% Gruppenrabatt. Bei größeren Gruppen (ab 10) können individuelle Termine arrangiert werden.",
    },
    {
      question: "Was, wenn ich die Prüfung nicht bestehe?",
      answer: "Bei vollständiger Kursteilnahme liegt die Bestehensquote bei 100%. Falls unvorhergesehen: kostenlos 1–2 Nachholstunden möglich. Zweiter Prüfungsversuch: reduzierte Gebühr.",
    },
  ];

  return (
    <section id="faq" className="py-24 bg-white relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-sky-50 rounded-full blur-3xl opacity-40" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-40" />

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Häufige Fragen
          </h2>
          <p className="text-lg text-gray-600">Alles, was du wissen musst</p>
        </div>

        {/* FAQ Accordion */}
        <Accordion type="single" collapsible value={openIndex.toString()}>
          {faqItems.map((item, idx) => (
            <AccordionItem key={idx} value={idx.toString()} className="border-b border-sky-200 mb-4">
              <AccordionTrigger
                onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}
                className="text-left py-4 px-0 hover:text-sky-600 transition-colors font-semibold text-gray-900 text-lg"
              >
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 pb-4 pt-2">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Further Questions */}
        <div className="mt-12 bg-sky-50 border border-sky-300 rounded-2xl p-8 text-center">
          <p className="text-gray-800 mb-4">
            <strong>Weitere Fragen?</strong>
          </p>
          <p className="text-gray-700 mb-6">
            Kontaktiere uns direkt per Telefon, E-Mail oder WhatsApp – wir antworten innerhalb 24 Stunden.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+491764443667" className="px-6 py-3 bg-sky-500 text-white rounded-lg font-semibold hover:bg-sky-600 transition-colors">
              Anrufen: +49 176 44437667
            </a>
            <a href="mailto:info@pontarea.de" className="px-6 py-3 border-2 border-sky-500 text-sky-600 rounded-lg font-semibold hover:bg-sky-50 transition-colors">
              E-Mail: info@pontarea.de
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// BLOCK 9: BOOKING FORM - CONVERSION
// ============================================
const BookingFormSection = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    phone: "",
    email: "",
    preferredDate: "",
    package: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In real app: send to backend or email service
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section id="kontakt" className="py-24 bg-gradient-to-b from-white via-sky-50 to-white relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-sky-100 rounded-full blur-3xl opacity-40" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-40" />

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Platz sichern
          </h2>
          <p className="text-lg text-gray-600">Fordere dein Programm & Kostenplan an</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white border-2 border-sky-200 rounded-2xl p-8 shadow-lg">
              {submitted && (
                <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-800 rounded-lg">
                  ✓ Vielen Dank! Wir melden uns innerhalb von 24h.
                </div>
              )}

              <div className="space-y-6">
                {/* Vorname */}
                <div>
                  <Label htmlFor="firstName" className="text-gray-800 font-semibold mb-2 block">
                    Vorname *
                  </Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    placeholder="z.B. Max"
                    className="border-sky-300 focus:border-sky-500 focus:ring-sky-500"
                  />
                </div>

                {/* Phone */}
                <div>
                  <Label htmlFor="phone" className="text-gray-800 font-semibold mb-2 block">
                    Telefon / WhatsApp *
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="+49 176 44437667"
                    className="border-sky-300 focus:border-sky-500 focus:ring-sky-500"
                  />
                </div>

                {/* Email */}
                <div>
                  <Label htmlFor="email" className="text-gray-800 font-semibold mb-2 block">
                    E-Mail (optional)
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="max@example.com"
                    className="border-sky-300 focus:border-sky-500 focus:ring-sky-500"
                  />
                </div>

                {/* Preferred Date */}
                <div>
                  <Label htmlFor="preferredDate" className="text-gray-800 font-semibold mb-2 block">
                    Wunschtermin (optional)
                  </Label>
                  <Select value={formData.preferredDate} onValueChange={(val) => setFormData(prev => ({ ...prev, preferredDate: val }))}>
                    <SelectTrigger className="border-sky-300 focus:border-sky-500 focus:ring-sky-500">
                      <SelectValue placeholder="Termin wählen..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hafenmanoever-april">Hafenmanöver: 25.04.2026</SelectItem>
                      <SelectItem value="kapitaenkurs-mai">Kapitänkurs: 02.05.2026</SelectItem>
                      <SelectItem value="hafenmanoever-mai">Hafenmanöver: 09.05.2026</SelectItem>
                      <SelectItem value="kapitaenkurs-sept">Kapitänkurs: 26.09.2026</SelectItem>
                      <SelectItem value="flexibel">Flexibel</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Course Selection */}
                <div>
                  <Label htmlFor="package" className="text-gray-800 font-semibold mb-2 block">
                    Kurs (optional)
                  </Label>
                  <Select value={formData.package} onValueChange={(val) => setFormData(prev => ({ ...prev, package: val }))}>
                    <SelectTrigger className="border-sky-300 focus:border-sky-500 focus:ring-sky-500">
                      <SelectValue placeholder="Kurs wählen..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kapitaenkurs">Kapitänkurs - Skipper-Lizenz (€1.500)</SelectItem>
                      <SelectItem value="hafenmanoever">Hafenmanöver - Aufbaukurs (€1.600)</SelectItem>
                      <SelectItem value="unsure">Ich bin noch unsicher</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Message */}
                <div>
                  <Label htmlFor="message" className="text-gray-800 font-semibold mb-2 block">
                    Nachricht (optional)
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="z.B. Fragen, spezielle Anforderungen, Erfahrungslevel..."
                    rows={4}
                    className="border-sky-300 focus:border-sky-500 focus:ring-sky-500"
                  />
                </div>

                {/* CTA Button */}
                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold text-lg rounded-lg hover:shadow-lg transition-all"
                >
                  Programm & Kostenplan anfordern
                </Button>

                {/* Trust Message */}
                <p className="text-center text-gray-600 text-sm">
                  ✓ Antwort innerhalb von 24h
                </p>
              </div>
            </form>
          </div>

          {/* Quick Contact Options */}
          <div className="flex flex-col gap-6">
            {/* WhatsApp */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-300 rounded-2xl p-6 text-center hover:shadow-lg transition-all cursor-pointer"
              onClick={() => window.open("https://wa.me/491764443667", "_blank")}
            >
              <div className="text-5xl mb-3">💬</div>
              <h4 className="font-bold text-green-900 mb-2">WhatsApp</h4>
              <p className="text-sm text-green-800 mb-4">Schnelle Antwort via WhatsApp</p>
              <Button variant="outline" className="w-full border-green-400 text-green-600 hover:bg-green-50">
                Schreiben
              </Button>
            </div>

            {/* Phone Call */}
            <div className="bg-gradient-to-br from-sky-50 to-blue-100 border-2 border-sky-300 rounded-2xl p-6 text-center hover:shadow-lg transition-all cursor-pointer"
              onClick={() => window.location.href = "tel:+491764443667"}
            >
              <div className="text-5xl mb-3">☎️</div>
              <h4 className="font-bold text-sky-900 mb-2">Rückruf anfordern</h4>
              <p className="text-sm text-sky-800 mb-4">Wir rufen dich an</p>
              <Button variant="outline" className="w-full border-sky-400 text-sky-600 hover:bg-sky-50">
                +49 176 44437667
              </Button>
            </div>

            {/* Email */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-300 rounded-2xl p-6 text-center hover:shadow-lg transition-all cursor-pointer"
              onClick={() => window.location.href = "mailto:info@pontarea.de"}
            >
              <div className="text-5xl mb-3">✉️</div>
              <h4 className="font-bold text-purple-900 mb-2">E-Mail</h4>
              <p className="text-sm text-purple-800 mb-4">Schreib uns eine E-Mail</p>
              <Button variant="outline" className="w-full border-purple-400 text-purple-600 hover:bg-purple-50">
                E-Mail
              </Button>
            </div>
          </div>
        </div>

        {/* Trust Section */}
        <div className="mt-12 bg-white border border-sky-200 rounded-2xl p-8 text-center">
          <p className="text-gray-800 mb-4">
            <strong>Du machst eine unverbindliche Anfrage.</strong>
          </p>
          <p className="text-gray-700 mb-8">
            Es fallen erst Kosten an, wenn du dich verbindlich anmeldest und die Anzahlung leistest.
          </p>
        </div>

        {/* Bogdan Contact Card */}
        <div className="mt-8 bg-gradient-to-br from-sky-50 to-blue-50 border-2 border-sky-300 rounded-2xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Direkt mit Bogdan</h3>
              <p className="text-gray-700 mb-6">
                Bogdan Zambrovskij ist dein Ansprechpartner für alle Fragen zu deinem Kurs, zur Vorbereitung und zum Leben an Bord.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">👤</span>
                  <span className="text-gray-900 font-semibold">Bogdan Zambrovskij</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📧</span>
                  <a href="mailto:info@pontarea.de" className="text-sky-600 font-semibold hover:text-sky-700">info@pontarea.de</a>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📱</span>
                  <a href="tel:+491764443667" className="text-sky-600 font-semibold hover:text-sky-700">+49 176 44437667</a>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📍</span>
                  <div className="text-gray-700">
                    <p className="font-semibold">Bogdan Zambrovskij</p>
                    <p>Konstanzer Str. 46</p>
                    <p>80809 München</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white border-2 border-sky-200 rounded-xl p-6 text-center">
              <p className="text-sm text-gray-600 mb-4">
                <strong>Kurse vor Ort:</strong>
              </p>
              <div className="space-y-2 mb-4">
                <p className="font-semibold text-gray-900">🇭🇷 Marina Dalmacija</p>
                <p className="text-sm text-gray-700">Sukošan, Kroatien</p>
              </div>
              <p className="text-xs text-gray-500">
                Bogdan empfängt dich persönlich vor Ort und kümmert sich um alles während deines Kurses.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// Footer
// ============================================
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-blue-900 to-gray-900 opacity-50" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img 
                src="./pontarea-logo.svg" 
                alt="Pontarea Logo" 
                className="h-6"
              />
            </div>
            <p className="text-gray-400 text-sm">
              Sportbootführerschein B in 7 Tagen. Pontarea – Deine Segelschule in Kroatien.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-bold mb-4">Navigation</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#kurse" className="hover:text-sky-400 transition-colors">Kurse</a></li>
              <li><a href="#warum-pontarea" className="hover:text-sky-400 transition-colors">Warum Pontarea?</a></li>
              <li><a href="#faq" className="hover:text-sky-400 transition-colors">FAQ</a></li>
              <li><a href="#kontakt" className="hover:text-sky-400 transition-colors">Kontakt</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4">Kontakt</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><span className="font-semibold text-white">Bogdan Zambrovskij</span></li>
              <li><a href="mailto:info@pontarea.de" className="hover:text-sky-400 transition-colors">info@pontarea.de</a></li>
              <li><a href="tel:+491764443667" className="hover:text-sky-400 transition-colors">+49 176 44437667</a></li>
              <li className="pt-1">Konstanzer Str. 46</li>
              <li>80809 München</li>
              <li className="text-xs text-gray-500">Marina Dalmacija<br/>Sukošan, Kroatien</li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold mb-4">Rechtliches</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="/impressum" className="hover:text-sky-400 transition-colors">Impressum</a></li>
              <li><a href="/datenschutz" className="hover:text-sky-400 transition-colors">Datenschutz</a></li>
              <li><a href="/agb" className="hover:text-sky-400 transition-colors">AGB</a></li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-8">
          <p className="text-gray-500 text-sm text-center">
            © 2026 Pontarea. Alle Rechte vorbehalten.
          </p>
        </div>
      </div>
    </footer>
  );
};

// ============================================
// MAIN PAGE EXPORT
// ============================================
export default function HomePage() {
  return (
    <div className="bg-white">
      <Navigation />
      <HeroSection />
      <TrustSection />
      <ReviewsSection />
      <CoursesSection />
      <InclusiveSection />
      <ProcessSection />
      <ScheduleDetailSection />
      <YachtRentalSection />
      <FAQSection />
      <BookingFormSection />
      <Footer />
    </div>
  );
}
