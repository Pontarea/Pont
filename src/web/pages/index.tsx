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
import { usePontareaContent } from "@/hooks/usePontareaContent";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { LanguageSwitcher } from "../components/LanguageSwitcher";
import { useLanguage } from "../contexts/LanguageContext";
import { Link } from "wouter";

// ============================================
// PONTAREA - SEGELKURSE IN KROATIEN
// ============================================

const Navigation = () => {
  const { t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const retreatSubLinks = [
    { href: "#retreats", label: t('nav.subOffers') },
    { href: "#coaches", label: t('nav.subTrainings') },
    { href: "#retreat-zielgruppen", label: t('nav.subAudience') },
    { href: "#retreat-konzept", label: t('nav.subConcept') },
    { href: "#retreat-logistik", label: t('nav.subLogistics') },
    { href: "#retreat-an-bord", label: t('nav.subOnboard') },
    { href: "#retreat-sicherheit", label: t('nav.subSafety') },
    { href: "#retreat-kosten", label: t('nav.subCost') },
    { href: "#retreat-anfrage", label: t('nav.subForm') },
  ];
  const leftLinks = [
    { href: "#kurse", label: t('nav.courses') },
    { href: "#retreats", label: t('nav.retreats'), sub: retreatSubLinks },
    { href: "#faq", label: t('nav.faq') },
  ];
  const rightLinks = [
    { href: "#yacht-miete", label: t('nav.yacht') },
    { href: "#skipperservice", label: t('nav.skipper') },
    { href: "#kontakt", label: t('nav.contact') },
  ];

  const scrollToSection = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-white/90 backdrop-blur-md shadow-md border-b border-sky-100" : "bg-white/50 backdrop-blur-md"}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <div className="hidden lg:flex items-center gap-4 xl:gap-6 flex-1">
            {leftLinks.map((link) => (
              link.sub ? (
                <div key={link.href} className="relative group">
                  <button onClick={() => scrollToSection(link.href)} className="flex items-center gap-1 text-gray-700 hover:text-sky-600 transition-colors text-sm font-medium whitespace-nowrap">
                    {link.label}
                    <svg className="w-3.5 h-3.5 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </button>
                  <div className="absolute left-0 top-full pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="bg-white rounded-2xl shadow-xl border border-sky-100 py-2 w-64">
                      {link.sub.map((s) => (
                        <button key={s.href} onClick={() => scrollToSection(s.href)} className="block w-full text-left px-5 py-2.5 text-sm text-gray-700 hover:bg-sky-50 hover:text-sky-600 transition-colors">{s.label}</button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <button key={link.href} onClick={() => scrollToSection(link.href)} className="text-gray-700 hover:text-sky-600 transition-colors text-sm font-medium whitespace-nowrap">{link.label}</button>
              )
            ))}
          </div>
          <a href="#hero" onClick={(e) => { e.preventDefault(); document.querySelector("#hero")?.scrollIntoView({ behavior: "smooth" }); }} className="flex items-center justify-center">
            <img src="/pontarea-logo-animated.gif" alt="Pontarea Logo" className="h-16 md:h-20 object-contain" />
          </a>
          <div className="hidden lg:flex items-center gap-4 xl:gap-6 flex-1 justify-end">
            {rightLinks.map((link) => (
              <button key={link.href} onClick={() => scrollToSection(link.href)} className="text-gray-700 hover:text-sky-600 transition-colors text-sm font-medium whitespace-nowrap">{link.label}</button>
            ))}
            <Button onClick={() => scrollToSection("#kontakt")} className="h-10 px-5 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-full hover:shadow-lg transition-all whitespace-nowrap">{t('nav.signup')}</Button>
            <LanguageSwitcher />
          </div>
          <button className="lg:hidden p-2 text-gray-700" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </div>
      <div className={`lg:hidden bg-white/95 backdrop-blur-md overflow-y-auto transition-all duration-300 border-t border-sky-100 ${isMenuOpen ? "max-h-[80vh]" : "max-h-0 overflow-hidden"}`}>
        <div className="px-6 py-4 space-y-1">
          {[...leftLinks, ...rightLinks].map((link) => (
            <div key={link.href}>
              <button onClick={() => scrollToSection(link.href)} className="block w-full text-left py-3 text-gray-700 hover:text-sky-600 transition-colors text-sm font-medium">{link.label}</button>
              {link.sub && (
                <div className="pl-4 border-l-2 border-sky-100 ml-1 mb-1">
                  {link.sub.map((s) => (
                    <button key={s.href} onClick={() => scrollToSection(s.href)} className="block w-full text-left py-2 text-gray-500 hover:text-sky-600 transition-colors text-sm">{s.label}</button>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="flex items-center justify-between pt-3 mt-2 border-t border-sky-100">
            <Button onClick={() => { scrollToSection("#kontakt"); setIsMenuOpen(false); }} className="h-9 px-5 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-full text-sm">{t('nav.signup')}</Button>
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </nav>
  );
};

// ============================================
// HERO
// ============================================
const HeroSection = () => {
  const content = usePontareaContent();
  const { t } = useLanguage();
  const scrollToSection = (href: string) => document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-sky-50 via-white to-blue-50">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-100 rounded-full blur-3xl opacity-40" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-40" />
      </div>
      <div className="absolute inset-0">
        <img src={content.hero?.heroImage || "/sailing-instructor-new.webp"} alt="Yacht sailing in Croatia" className="w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-sky-50/80 via-white/60 to-white/80" />
      </div>
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-20">
        <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-xl border border-sky-200 rounded-full px-4 py-2 mb-8 animate-fadeIn shadow-sm">
          <span className="w-2 h-2 bg-gradient-to-r from-sky-500 to-blue-600 rounded-full animate-pulse" />
          <span className="text-gray-700 text-sm tracking-wide font-medium">{t('hero.badge')}</span>
        </div>
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 tracking-tight animate-fadeInUp leading-tight">{t('hero.title')}</h1>
        <p className="text-2xl text-sky-600 font-semibold mb-8 animate-fadeInUp animation-delay-200">{t('hero.subtitle')}</p>
        <div className="max-w-2xl mx-auto mb-10 animate-fadeInUp animation-delay-400 bg-blue-50 border-l-4 border-sky-500 px-6 py-4 rounded">
          <p className="text-gray-700 font-semibold mb-2">{t('hero.statsTitle')}</p>
          <p className="text-gray-600">{t('hero.statsDescription')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto mb-12 animate-fadeInUp animation-delay-400">
          {[
            { icon: "📍", text: t('hero.location') },
            { icon: "👥", text: t('hero.group') },
            { icon: "⛵", text: t('hero.format') },
            { icon: "🎯", text: t('hero.goal') },
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-3 text-left">
              <span className="text-2xl">{item.icon}</span>
              <span className="text-gray-700 font-medium">{item.text}</span>
            </div>
          ))}
          <div className="flex items-center gap-3 text-left col-span-1 md:col-span-2">
            <span className="text-2xl">📅</span>
            <span className="text-gray-700 font-medium">{t('hero.schedule')}</span>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 animate-fadeInUp animation-delay-600">
          <Button size="lg" onClick={() => scrollToSection("#kurse")} className="h-14 px-10 bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold text-lg rounded-full hover:shadow-lg transition-all duration-300">{t('hero.discover')}</Button>
          <Button size="lg" variant="outline" onClick={() => scrollToSection("#kontakt")} className="h-14 px-10 border-2 border-sky-400 text-sky-600 font-semibold text-lg rounded-full hover:bg-sky-50 transition-all duration-300 bg-white">{t('hero.signupNow')}</Button>
        </div>
        <p className="text-gray-600 text-sm animate-fadeInUp animation-delay-600">{t('hero.answerTime')}</p>

      </div>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 1s ease-out forwards; }
        .animate-fadeInUp { animation: fadeInUp 1s ease-out forwards; }
        .animation-delay-200 { animation-delay: 0.2s; opacity: 0; }
        .animation-delay-400 { animation-delay: 0.4s; opacity: 0; }
        .animation-delay-600 { animation-delay: 0.6s; opacity: 0; }
      `}</style>
    </section>
  );
};

// ============================================
// TRUST / WHY PONTAREA
// ============================================
const TrustSection = () => {
  const { t } = useLanguage();
  const stats = [
    { number: t('stats.students'), label: t('stats.studentsLabel'), icon: "👥", note: t('stats.studentsNote') },
    { number: t('stats.successRate'), label: t('stats.successRateLabel'), icon: "✅" },
    { number: t('stats.groupSize'), label: t('stats.groupSizeLabel'), icon: "⛵" },
    { number: t('stats.experience'), label: t('stats.experienceLabel'), icon: "🏆" },
  ];

  return (
    <section id="warum-pontarea" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-sky-50 rounded-full blur-3xl opacity-40" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-40" />
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 tracking-tight">{t('stats.title')}</h2>
          <p className="text-lg text-gray-600">{t('stats.subtitle')}</p>
        </div>
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
// REVIEWS
// ============================================
const ReviewsSection = () => {
  const { t } = useLanguage();
  return (
    <section className="py-24 bg-gradient-to-b from-white via-sky-50 to-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">{t('testimonials.title')}</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="bg-white border border-sky-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition-all">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">{t('testimonials.trainerTitle')}</h3>
            <div className="space-y-6 mb-8">
              {['review1', 'review2', 'review3'].map((key) => (
                <div key={key} className="flex gap-2">
                  <span className="text-yellow-400 flex gap-1">★★★★★</span>
                  <p className="text-gray-700 italic">"{t(`testimonials.${key}`)}"</p>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full border-sky-300 text-sky-600 hover:bg-sky-50" onClick={() => window.open("https://maps.app.goo.gl/coqwatgTno6VFN9A7", "_blank")}>{t('testimonials.viewAll')}</Button>
          </div>
          <div className="bg-white border border-blue-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition-all">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">{t('testimonials.pontareaTitle')}</h3>
            <div className="space-y-6 mb-8">
              {['review4', 'review5', 'review6'].map((key) => (
                <div key={key} className="flex gap-2">
                  <span className="text-yellow-400 flex gap-1">★★★★★</span>
                  <p className="text-gray-700 italic">"{t(`testimonials.${key}`)}"</p>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full border-blue-300 text-blue-600 hover:bg-blue-50" onClick={() => window.open("https://maps.app.goo.gl/A6kvwj79UC5c79bM7", "_blank")}>{t('testimonials.viewAll')}</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// COURSES
// ============================================
const CoursesSection = () => {
  const { t } = useLanguage();
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);
  const scrollToSection = (href: string) => document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });

  const courses = [
    {
      id: 1, title: t('courses.captain.title'), subtitle: t('courses.captain.subtitle'), price: t('courses.captain.price'), dates: t('courses.captain.dates').split(',').map(s => s.trim()), duration: t('courses.captain.duration'),
      description: t('courses.captain.description'),
      features: [t('courses.captain.feature1'), t('courses.captain.feature2'), t('courses.captain.feature3'), t('courses.captain.feature4'), t('courses.captain.feature5'), t('courses.captain.feature6')],
      gradient: "from-sky-400 to-blue-500", image: "/captain-helm_new_resized.webp",
      learnTitle: t('courses.captain.learnTitle'),
      learnContent: [t('courses.captain.learn1'), t('courses.captain.learn2'), t('courses.captain.learn3'), t('courses.captain.learn4'), t('courses.captain.learn5'), t('courses.captain.learn6'), t('courses.captain.learn7'), t('courses.captain.learn8')],
    },
    {
      id: 2, title: t('courses.harbor.title'), subtitle: t('courses.harbor.subtitle'), price: t('courses.harbor.price'), dates: t('courses.harbor.dates').split(',').map(s => s.trim()), duration: t('courses.harbor.duration'),
      description: t('courses.harbor.description'),
      features: [t('courses.harbor.feature1'), t('courses.harbor.feature2'), t('courses.harbor.feature3'), t('courses.harbor.feature4'), t('courses.harbor.feature5'), t('courses.harbor.feature6')],
      gradient: "from-teal-400 to-cyan-500", image: "/marina-docking_resized.webp", unique: true,
      learnTitle: t('courses.harbor.learnTitle'),
      learnContent: [t('courses.harbor.learn1'), t('courses.harbor.learn2'), t('courses.harbor.learn3'), t('courses.harbor.learn4'), t('courses.harbor.learn5'), t('courses.harbor.learn6'), t('courses.harbor.learn7'), t('courses.harbor.learn8')],
      fearsBefore: [t('courses.harbor.fear1'), t('courses.harbor.fear2'), t('courses.harbor.fear3'), t('courses.harbor.fear4'), t('courses.harbor.fear5'), t('courses.harbor.fear6'), t('courses.harbor.fear7')],
    }
  ];

  return (
    <section id="kurse" className="py-32 bg-gradient-to-b from-white via-blue-50 to-white relative overflow-hidden">
      <div className="absolute top-20 right-0 w-96 h-96 bg-sky-100 rounded-full blur-3xl opacity-30" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-100 rounded-full blur-3xl opacity-30" />
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="text-center mb-20">
          <p className="text-sky-600 text-sm uppercase tracking-[0.3em] font-semibold mb-4">{t('courses.sectionTitle')}</p>
          <h2 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent tracking-tight mb-6">{t('courses.title')}</h2>
          <p className="text-gray-600 text-xl max-w-2xl mx-auto">{t('courses.subtitle')}</p>
        </div>
        <div className="grid lg:grid-cols-2 gap-8">
          {courses.map((course) => (
            <div key={course.id} className="group bg-white/80 backdrop-blur-xl border-2 border-sky-100 rounded-3xl overflow-hidden hover:border-sky-300 transition-all duration-500 shadow-lg hover:shadow-2xl relative">
              {course.unique && <div className="absolute top-4 right-4 z-10 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg">{t('courses.harbor.uniqueBadge')}</div>}
              <div className="relative h-64 overflow-hidden cursor-pointer" onClick={() => setSelectedCourse(course.id)}>
                <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-sky-900/30 to-transparent" />
                <div className={`absolute bottom-4 left-4 bg-gradient-to-r ${course.gradient} text-white font-bold px-5 py-3 rounded-2xl shadow-lg`}>{course.price}</div>
              </div>
              <div className="p-8">
                <div className="flex items-center gap-2 mb-4">
                  <span className={`w-3 h-3 rounded-full bg-gradient-to-r ${course.gradient}`} />
                  <span className="text-gray-500 text-sm font-medium">{course.duration}</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{course.title}</h3>
                <p className="text-sky-600 text-sm font-semibold mb-4">{course.subtitle}</p>
                <p className="text-gray-600 mb-6 leading-relaxed">{course.description}</p>
                <div className="mb-6 bg-sky-50 border border-sky-200 rounded-lg p-4">
                  <p className="text-gray-700 font-semibold mb-2">{t('courses.nextDates')}</p>
                  <div className="flex flex-wrap gap-2">
                    {course.dates.map((date, idx) => <span key={idx} className="bg-white border border-sky-300 text-sky-700 font-medium px-3 py-1 rounded-full text-sm">{date}</span>)}
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-3 mb-8">
                  {course.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-sky-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                      <span className="text-gray-600 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
                <Button onClick={() => scrollToSection("#kontakt")} className={`w-full h-12 bg-gradient-to-r ${course.gradient} text-white font-semibold rounded-lg hover:shadow-lg transition-all`}>{t('courses.bookNow')}</Button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-16 bg-white border border-sky-200 rounded-2xl p-8 text-center">
          <p className="text-gray-700 text-lg mb-2"><strong>{t('courses.location')}</strong></p>
          <p className="text-gray-600">{t('stats.groupSize')} {t('stats.groupSizeLabel')} • {t('stats.students')} {t('stats.studentsLabel')} • {t('stats.successRate')} {t('stats.successRateLabel')}</p>
        </div>
      </div>
      {selectedCourse && (
        <Dialog open={true} onOpenChange={(open) => !open && setSelectedCourse(null)}>
          <DialogContent className="max-w-2xl">
            {(() => {
              const course = courses.find(c => c.id === selectedCourse);
              if (!course) return null;
              return (<>
                <DialogHeader><DialogTitle>{course.title}</DialogTitle><DialogClose onClick={() => setSelectedCourse(null)} /></DialogHeader>
                <div className="px-6 py-6 space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">{course.learnTitle}</h3>
                    <div className="grid grid-cols-1 gap-3">
                      {course.learnContent.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <svg className="w-5 h-5 text-sky-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                          <span className="text-gray-700">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  {course.id === 2 && course.fearsBefore && (
                    <div className="border-t pt-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">{t('courses.fearsDialogTitle')}</h3>
                      <p className="text-gray-600 mb-4">{t('courses.fearsDialogIntro')}</p>
                      <div className="space-y-3 bg-orange-50 border border-orange-200 rounded-lg p-4">
                        {course.fearsBefore.map((fear, idx) => (
                          <div key={idx} className="flex items-start gap-3"><span className="text-orange-500 font-bold flex-shrink-0">✗</span><span className="text-gray-700">{fear}</span></div>
                        ))}
                      </div>
                      <p className="text-gray-600 mt-4 text-sm"><strong>{t('courses.fearsDialogAfter')}</strong> {t('courses.fearsDialogAfterText')}</p>
                    </div>
                  )}
                  <div className="border-t pt-6">
                    <Button onClick={() => { setSelectedCourse(null); scrollToSection("#kontakt"); }} className={`w-full h-12 bg-gradient-to-r ${course.gradient} text-white font-semibold rounded-lg hover:shadow-lg transition-all`}>{t('courses.bookNow')}</Button>
                  </div>
                </div>
              </>);
            })()}
          </DialogContent>
        </Dialog>
      )}
    </section>
  );
};

// ============================================
// INCLUSIVE / PRICING
// ============================================
const InclusiveSection = () => {
  const { t } = useLanguage();
  const included = [t('pricing.item1'), t('pricing.item2'), t('pricing.item3'), t('pricing.item4'), t('pricing.item5'), t('pricing.item6'), t('pricing.item7'), t('pricing.item8')];
  const bordkasseItems = [t('pricing.bordkasse1'), t('pricing.bordkasse2'), t('pricing.bordkasse3')];
  const additionalCosts = [
    { name: t('pricing.cost1Name'), price: t('pricing.cost1Price') },
    { name: t('pricing.cost2Name'), price: t('pricing.cost2Price') },
    { name: t('pricing.cost3Name'), price: t('pricing.cost3Price') },
    { name: t('pricing.cost4Name'), price: t('pricing.cost4Price') },
    { name: t('pricing.cost5Name'), price: t('pricing.cost5Price') },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white via-blue-50 to-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">{t('pricing.title')}</h2>
          <p className="text-lg text-gray-600">{t('pricing.subtitle')}</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2"><span className="text-green-500">✓</span> {t('pricing.included')}</h3>
            <ul className="space-y-3">
              {included.map((item, idx) => <li key={idx} className="flex gap-3 text-gray-700"><span className="text-sky-500 font-bold text-lg">•</span><span>{item}</span></li>)}
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2"><span className="text-orange-500">⚠</span> {t('pricing.additional')}</h3>
            <div className="mb-6 bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-300 rounded-lg p-6">
              <h4 className="text-xl font-bold text-gray-900 mb-3">{t('pricing.bordkasseTitle')} <span className="text-orange-600">{t('pricing.bordkasseAmount')}</span></h4>
              <p className="text-gray-700 mb-4 text-sm">{t('pricing.bordkasseDesc')}</p>
              <ul className="space-y-2">
                {bordkasseItems.map((item, idx) => <li key={idx} className="flex gap-3 text-gray-700 text-sm"><span className="text-orange-500 font-bold">→</span><span>{item}</span></li>)}
              </ul>
            </div>
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm">
                <thead><tr className="border-b-2 border-sky-300 bg-sky-50"><th className="text-left py-2 font-semibold text-gray-800">{t('pricing.otherCosts')}</th><th className="text-right py-2 font-semibold text-gray-800">{t('pricing.perPerson')}</th></tr></thead>
                <tbody className="divide-y divide-sky-100">
                  {additionalCosts.map((cost, idx) => <tr key={idx} className="hover:bg-sky-50 transition-colors"><td className="py-3 text-gray-700">{cost.name}</td><td className="text-right text-gray-700 font-semibold">{cost.price}</td></tr>)}
                </tbody>
              </table>
            </div>
            <div className="bg-sky-50 border border-sky-300 rounded-lg p-6 mb-6">
              <h4 className="text-lg font-bold text-gray-900 mb-4">{t('pricing.kautionTitle')}</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div className="bg-white border border-sky-200 rounded p-4">
                  <p className="text-xs text-gray-600 uppercase font-semibold mb-1">{t('pricing.kautionWithout')}</p>
                  <p className="text-2xl font-bold text-gray-900">{t('pricing.kautionWithoutAmount')}</p>
                  <p className="text-sm text-gray-600 mt-2">{t('pricing.kautionWithoutDesc')}<br/><span className="font-semibold">{t('pricing.kautionWithoutPerPerson')}</span></p>
                  <p className="text-xs text-gray-500 mt-2">{t('pricing.kautionWithoutNote')}</p>
                </div>
                <div className="bg-amber-50 border-2 border-amber-400 rounded p-4">
                  <p className="text-xs text-gray-600 uppercase font-semibold mb-1">{t('pricing.kautionWith')}</p>
                  <p className="text-2xl font-bold text-amber-600">{t('pricing.kautionWithAmount')}</p>
                  <p className="text-sm text-gray-700 mt-2">{t('pricing.kautionWithDesc')}<br/><span className="font-semibold text-amber-700">{t('pricing.kautionWithTotal')}</span></p>
                  <p className="text-xs text-amber-700 mt-2 font-semibold">{t('pricing.kautionWithNote')}</p>
                </div>
              </div>
              <p className="text-xs text-gray-600 bg-white p-3 rounded border border-gray-200"><strong>Wichtig:</strong> {t('pricing.kautionImportant')}</p>
            </div>
            <div className="bg-blue-50 border border-blue-300 rounded-lg p-4">
              <p className="text-gray-800 text-sm"><strong>{t('pricing.summaryTitle')}</strong><br/>• {t('pricing.summary1')}<br/>• {t('pricing.summary2')}<br/>• {t('pricing.summary3')}<br/><span className="font-semibold">{t('pricing.summaryTotal')}</span> {t('pricing.summaryOptions')}</p>
            </div>
          </div>
        </div>
        <div className="mt-12 bg-green-50 border border-green-300 rounded-lg p-6 text-center">
          <p className="text-gray-800"><strong>{t('pricing.transparencyLabel')}</strong> {t('pricing.transparencyNote')}</p>
        </div>
      </div>
    </section>
  );
};

// ============================================
// HOW IT WORKS
// ============================================
const ProcessSection = () => {
  const { t } = useLanguage();
  const steps = [
    { number: 1, title: t('howItWorks.step1Title'), description: t('howItWorks.step1Desc'), icon: t('howItWorks.step1Icon') },
    { number: 2, title: t('howItWorks.step2Title'), description: t('howItWorks.step2Desc'), icon: t('howItWorks.step2Icon') },
    { number: 3, title: t('howItWorks.step3Title'), description: t('howItWorks.step3Desc'), icon: t('howItWorks.step3Icon') },
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">{t('howItWorks.title')}</h2>
          <p className="text-lg text-gray-600">{t('howItWorks.subtitle')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {steps.map((step, idx) => (
            <div key={idx} className="relative h-full">
              <div className="bg-gradient-to-br from-sky-50 to-blue-50 border-2 border-sky-200 rounded-2xl p-8 text-center hover:shadow-lg transition-all h-full flex flex-col">
                <div className="text-6xl mb-4">{step.icon}</div>
                <div className="inline-block bg-sky-500 text-white font-bold px-4 py-2 rounded-full mb-4 mx-auto">{t('howItWorks.step')} {step.number}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-700 flex-grow">{step.description}</p>
              </div>
              {idx < steps.length - 1 && <div className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-20"><div className="text-4xl text-sky-300">→</div></div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================
// SCHEDULE
// ============================================
const ScheduleDetailSection = () => {
  const { t } = useLanguage();
  const [expandedDay, setExpandedDay] = useState<number | null>(null);

  const days = [1, 2, 3, 4, 5, 6, 7, 8];
  const dailySchedule = days.map((d) => ({
    day: t(`schedule.day${d}`),
    title: t(`schedule.day${d}Title`),
    brief: t(`schedule.day${d}Brief`),
    detailed: t(`schedule.day${d}Detailed`),
  }));

  return (
    <section className="py-24 bg-gradient-to-b from-white via-sky-50 to-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">{t('schedule.title')}</h2>
          <p className="text-lg text-gray-600">{t('schedule.subtitle')}</p>
          <p className="text-sm text-gray-500 mt-2">{t('schedule.note')}</p>
        </div>
        <div className="space-y-4 mb-12">
          {dailySchedule.map((item, idx) => (
            <div key={idx} className="bg-white border-2 border-sky-200 rounded-xl overflow-hidden hover:shadow-lg transition-all">
              <button onClick={() => setExpandedDay(expandedDay === idx ? null : idx)} className="w-full px-6 py-4 flex items-center gap-4 hover:bg-sky-50 transition-colors">
                <div className="flex-1 text-left">
                  <div className="font-bold text-gray-900 text-lg">{item.day}</div>
                  <div className="text-sky-600 font-semibold">{item.title}</div>
                  <div className="text-gray-600 text-sm mt-1">{item.brief}</div>
                </div>
                <div className={`text-2xl text-sky-500 transition-transform ${expandedDay === idx ? "rotate-180" : ""}`}>▼</div>
              </button>
              {expandedDay === idx && (
                <div className="px-6 py-4 bg-sky-50 border-t border-sky-200">
                  <p className="text-gray-700"><strong>{t('schedule.detailedAgenda')} {item.day}:</strong> {item.detailed}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="bg-blue-50 border-l-4 border-blue-500 px-6 py-4 rounded">
          <p className="text-gray-700"><strong>{t('schedule.noteLabel')}</strong> {t('schedule.bottomNote')}</p>
        </div>
      </div>
    </section>
  );
};

// ============================================
// YACHT RENTAL
// ============================================
const YachtRentalSection = () => {
  const { t } = useLanguage();
  const offers = [
    { title: t('yacht.offer1Title'), desc: t('yacht.offer1Desc') },
    { title: t('yacht.offer2Title'), desc: t('yacht.offer2Desc') },
    { title: t('yacht.offer3Title'), desc: t('yacht.offer3Desc') },
    { title: t('yacht.offer4Title'), desc: t('yacht.offer4Desc') },
  ];
  const benefits = [
    { icon: "🚤", title: t('yacht.benefit1Title'), desc: t('yacht.benefit1Desc') },
    { icon: "🌍", title: t('yacht.benefit2Title'), desc: t('yacht.benefit2Desc') },
    { icon: "💰", title: t('yacht.benefit3Title'), desc: t('yacht.benefit3Desc') },
    { icon: "👨‍⚓", title: t('yacht.benefit4Title'), desc: t('yacht.benefit4Desc') },
  ];
  const colors = ["from-sky-50 to-blue-50 border-sky-200", "from-teal-50 to-cyan-50 border-teal-200", "from-blue-50 to-indigo-50 border-blue-200", "from-cyan-50 to-sky-50 border-cyan-200"];

  return (
    <section id="yacht-miete" className="py-24 bg-gradient-to-b from-white via-sky-50 to-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">{t('yacht.title')}</h2>
          <p className="text-lg text-gray-600">{t('yacht.subtitle')}</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">{t('yacht.sectionTitle')}</h3>
            <p className="text-gray-700 mb-4">{t('yacht.intro')}</p>
            <p className="text-gray-700 mb-6"><strong>{t('yacht.offerIntro')}</strong></p>
            <ul className="space-y-3 mb-8">
              {offers.map((o, idx) => (
                <li key={idx} className="flex gap-3 text-gray-700"><span className="text-sky-500 font-bold text-lg">✓</span><span><strong>{o.title}</strong> – {o.desc}</span></li>
              ))}
            </ul>
            <a href="https://pontarea.com/de/search/" target="_blank" rel="noopener noreferrer" className="inline-block px-8 py-4 bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold rounded-lg hover:shadow-lg transition-all hover:scale-105">{t('yacht.browseButton')}</a>
          </div>
          <div className="space-y-4">
            {benefits.map((b, idx) => (
              <div key={idx} className={`bg-gradient-to-br ${colors[idx]} border-2 rounded-2xl p-6 hover:shadow-lg transition-all`}>
                <div className="flex gap-4"><div className="text-4xl">{b.icon}</div><div><h4 className="font-bold text-gray-900 mb-1">{b.title}</h4><p className="text-sm text-gray-700">{b.desc}</p></div></div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-16 bg-gradient-to-r from-sky-100 to-blue-100 border-2 border-sky-300 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">{t('yacht.ctaTitle')}</h3>
          <p className="text-gray-700 mb-6">{t('yacht.ctaDesc')}</p>
          <a href="https://pontarea.com/de/search/" target="_blank" rel="noopener noreferrer" className="inline-block px-8 py-3 bg-sky-500 text-white font-bold rounded-lg hover:bg-sky-600 transition-colors">{t('yacht.catalogButton')}</a>
        </div>
      </div>
    </section>
  );
};

// ============================================
// SKIPPERSERVICE
// ============================================
const SkipperServiceSection = () => {
  const { t } = useLanguage();

  const items = [
    { icon: "⚓", title: t('skipper.item1Title'), desc: t('skipper.item1Desc') },
    { icon: "🌍", title: t('skipper.item2Title'), desc: t('skipper.item2Desc') },
    { icon: "📅", title: t('skipper.item3Title'), desc: t('skipper.item3Desc') },
    { icon: "🤝", title: t('skipper.item4Title'), desc: t('skipper.item4Desc') },
  ];

  const prices = [
    { label: t('skipper.price1Label'), desc: t('skipper.price1Desc'), tag: t('skipper.price1Tag'), highlight: false },
    { label: t('skipper.price2Label'), desc: t('skipper.price2Desc'), tag: t('skipper.price2Tag'), highlight: false },
    { label: t('skipper.price3Label'), desc: t('skipper.price3Desc'), tag: t('skipper.price3Tag'), highlight: true },
  ];

  return (
    <section id="skipperservice" className="py-24 bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 relative overflow-hidden text-white">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </div>
      <div className="max-w-6xl mx-auto px-6 relative z-10">

        <div className="text-center mb-16">
          <span className="inline-block text-sky-400 text-sm uppercase tracking-[0.3em] font-semibold mb-4">{t('skipper.sectionTag')}</span>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">{t('skipper.title')}</h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">{t('skipper.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
          <div>
            <h3 className="text-2xl font-bold mb-6 text-white">{t('skipper.includesTitle')}</h3>
            <ul className="space-y-4">
              {items.map((item, idx) => (
                <li key={idx} className="flex gap-4">
                  <span className="text-3xl mt-1">{item.icon}</span>
                  <div>
                    <p className="font-semibold text-white">{item.title}</p>
                    <p className="text-white/60 text-sm mt-1">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
            <h3 className="text-2xl font-bold mb-6 text-white">{t('skipper.priceTitle')}</h3>
            <div className="space-y-4 mb-8">
              {prices.map((item, idx) => (
                <div key={idx} className="flex items-start justify-between gap-4 p-4 bg-white/5 rounded-2xl">
                  <div className="flex-1">
                    <p className="font-semibold text-white text-sm">{item.label}</p>
                    <p className="text-white/50 text-xs mt-1">{item.desc}</p>
                  </div>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap ${item.highlight ? "bg-sky-500/20 text-sky-300 border border-sky-500/30" : "bg-white/10 text-white/60"}`}>
                    {item.tag}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-white/40 text-xs mb-6">{t('skipper.priceNote')}</p>
            <a
              href="#kontakt"
              onClick={(e) => { e.preventDefault(); document.querySelector("#kontakt")?.scrollIntoView({ behavior: "smooth" }); }}
              className="block w-full text-center py-4 bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold rounded-2xl hover:opacity-90 transition-all hover:shadow-lg hover:shadow-sky-500/25"
            >
              {t('skipper.ctaButton')}
            </a>
          </div>
        </div>

        <div className="text-center bg-white/5 border border-white/10 rounded-2xl p-6">
          <p className="text-white/60 text-sm">{t('skipper.transferNote')}</p>
        </div>

      </div>
    </section>
  );
};

// ============================================
// FAQ
// ============================================
const FAQSection = () => {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number>(0);
  const faqItems = Array.from({ length: 10 }, (_, i) => ({ question: t(`faq.q${i + 1}`), answer: t(`faq.a${i + 1}`) }));

  return (
    <section id="faq" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-sky-50 rounded-full blur-3xl opacity-40" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-40" />
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">{t('faq.title')}</h2>
          <p className="text-lg text-gray-600">{t('faq.subtitle')}</p>
        </div>
        <Accordion type="single" collapsible value={openIndex.toString()}>
          {faqItems.map((item, idx) => (
            <AccordionItem key={idx} value={idx.toString()} className="border-b border-sky-200 mb-4">
              <AccordionTrigger onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)} className="text-left py-4 px-0 hover:text-sky-600 transition-colors font-semibold text-gray-900 text-lg">{item.question}</AccordionTrigger>
              <AccordionContent className="text-gray-700 pb-4 pt-2">{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <div className="mt-12 bg-sky-50 border border-sky-300 rounded-2xl p-8 text-center">
          <p className="text-gray-800 mb-4"><strong>{t('faq.moreQuestions')}</strong></p>
          <p className="text-gray-700 mb-6">{t('faq.contactText')}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+491764443667" className="px-6 py-3 bg-sky-500 text-white rounded-lg font-semibold hover:bg-sky-600 transition-colors">{t('faq.callButton')}</a>
            <a href="mailto:info@pontarea.de" className="px-6 py-3 border-2 border-sky-500 text-sky-600 rounded-lg font-semibold hover:bg-sky-50 transition-colors">{t('faq.emailButton')}</a>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// BOOKING FORM
// ============================================
const BookingFormSection = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({ firstName: "", countryCode: "+49", phone: "", email: "", preferredDate: "", package: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); console.log("Form submitted:", formData); setSubmitted(true); setTimeout(() => setSubmitted(false), 3000); };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => { const { name, value } = e.target; setFormData((prev) => ({ ...prev, [name]: value })); };

  return (
    <section id="kontakt" className="py-24 bg-gradient-to-b from-white via-sky-50 to-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-sky-100 rounded-full blur-3xl opacity-40" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-40" />
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">{t('contact.title')}</h2>
          <p className="text-lg text-gray-600">{t('contact.subtitle')}</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white border-2 border-sky-200 rounded-2xl p-8 shadow-lg">
              {submitted && <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-800 rounded-lg">{t('contact.success')}</div>}
              <div className="space-y-6">
                <div><Label htmlFor="firstName" className="text-gray-800 font-semibold mb-2 block">{t('contact.name')} *</Label><Input id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required placeholder={t('contact.namePlaceholder')} className="border-sky-300 focus:border-sky-500 focus:ring-sky-500" /></div>
                <div>
                  <Label htmlFor="phone" className="text-gray-800 font-semibold mb-2 block">{t('contact.phone')} *</Label>
                  <div className="flex gap-2">
                    <Select value={formData.countryCode} onValueChange={(value) => setFormData({ ...formData, countryCode: value })}>
                      <SelectTrigger className="w-28 border-sky-300"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="+49">🇩🇪 +49</SelectItem><SelectItem value="+7">🇷🇺 +7</SelectItem><SelectItem value="+43">🇦🇹 +43</SelectItem><SelectItem value="+41">🇨🇭 +41</SelectItem><SelectItem value="+1">🇺🇸 +1</SelectItem><SelectItem value="+44">🇬🇧 +44</SelectItem><SelectItem value="+385">🇭🇷 +385</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} required placeholder={t('contact.phonePlaceholder')} className="flex-1 border-sky-300" />
                  </div>
                </div>
                <div><Label htmlFor="email" className="text-gray-800 font-semibold mb-2 block">{t('contact.email')}</Label><Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder={t('contact.emailPlaceholder')} className="border-sky-300" /></div>
                <div>
                  <Label htmlFor="preferredDate" className="text-gray-800 font-semibold mb-2 block">{t('contact.date')}</Label>
                  <Select value={formData.preferredDate} onValueChange={(val) => setFormData(prev => ({ ...prev, preferredDate: val }))}>
                    <SelectTrigger className="border-sky-300"><SelectValue placeholder={t('contact.datePlaceholder')} /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hafenmanoever-april">{t('contact.dateHafenApril')}</SelectItem>
                      <SelectItem value="kapitaenkurs-mai">{t('contact.dateKapitanMai')}</SelectItem>
                      <SelectItem value="hafenmanoever-mai">{t('contact.dateHafenMai')}</SelectItem>
                      <SelectItem value="kapitaenkurs-sept">{t('contact.dateKapitanSept')}</SelectItem>
                      <SelectItem value="flexibel">{t('contact.dateFlexibel')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="package" className="text-gray-800 font-semibold mb-2 block">{t('contact.course')}</Label>
                  <Select value={formData.package} onValueChange={(val) => setFormData(prev => ({ ...prev, package: val }))}>
                    <SelectTrigger className="border-sky-300"><SelectValue placeholder={t('contact.coursePlaceholder')} /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kapitaenkurs">{t('contact.courseKapitan')}</SelectItem>
                      <SelectItem value="hafenmanoever">{t('contact.courseHafen')}</SelectItem>
                      <SelectItem value="unsure">{t('contact.courseUnsure')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div><Label htmlFor="message" className="text-gray-800 font-semibold mb-2 block">{t('contact.message')}</Label><Textarea id="message" name="message" value={formData.message} onChange={handleChange} placeholder={t('contact.messagePlaceholder')} rows={4} className="border-sky-300" /></div>
                <Button type="submit" className="w-full h-12 bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold text-lg rounded-lg hover:shadow-lg transition-all">{t('contact.submit')}</Button>
                <p className="text-center text-gray-600 text-sm">{t('hero.answerTime')}</p>
              </div>
            </form>
          </div>
          <div className="flex flex-col gap-6">
            <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-300 rounded-2xl p-6 text-center hover:shadow-lg transition-all cursor-pointer" onClick={() => window.open("https://wa.me/491764443667", "_blank")}>
              <div className="text-5xl mb-3">💬</div>
              <h4 className="font-bold text-green-900 mb-2">{t('contact.whatsappTitle')}</h4>
              <p className="text-sm text-green-800 mb-4">{t('contact.whatsappDesc')}</p>
              <Button variant="outline" className="w-full border-green-400 text-green-600 hover:bg-green-50">{t('contact.whatsappButton')}</Button>
            </div>
            <div className="bg-gradient-to-br from-sky-50 to-blue-100 border-2 border-sky-300 rounded-2xl p-6 text-center hover:shadow-lg transition-all cursor-pointer" onClick={() => window.location.href = "tel:+491764443667"}>
              <div className="text-5xl mb-3">☎️</div>
              <h4 className="font-bold text-sky-900 mb-2">{t('contact.phoneTitle')}</h4>
              <p className="text-sm text-sky-800 mb-4">{t('contact.phoneDesc')}</p>
              <Button variant="outline" className="w-full border-sky-400 text-sky-600 hover:bg-sky-50">+49 176 44437667</Button>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-300 rounded-2xl p-6 text-center hover:shadow-lg transition-all cursor-pointer" onClick={() => window.location.href = "mailto:info@pontarea.de"}>
              <div className="text-5xl mb-3">✉️</div>
              <h4 className="font-bold text-purple-900 mb-2">{t('contact.emailTitle')}</h4>
              <p className="text-sm text-purple-800 mb-4">{t('contact.emailDesc')}</p>
              <Button variant="outline" className="w-full border-purple-400 text-purple-600 hover:bg-purple-50">{t('contact.emailButton')}</Button>
            </div>
          </div>
        </div>
        <div className="mt-12 bg-white border border-sky-200 rounded-2xl p-8 text-center">
          <p className="text-gray-800 mb-4"><strong>{t('contact.trustTitle')}</strong></p>
          <p className="text-gray-700 mb-8">{t('contact.trustDesc')}</p>
        </div>
        <div className="mt-8 bg-gradient-to-br from-sky-50 to-blue-50 border-2 border-sky-300 rounded-2xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{t('contact.bogdanTitle')}</h3>
              <p className="text-gray-700 mb-6">{t('contact.bogdanDesc')}</p>
              <div className="space-y-3">
                <div className="flex items-center gap-3"><span className="text-2xl">👤</span><span className="text-gray-900 font-semibold">Bogdan Zambrovskij</span></div>
                <div className="flex items-center gap-3"><span className="text-2xl">📧</span><a href="mailto:info@pontarea.de" className="text-sky-600 font-semibold hover:text-sky-700">info@pontarea.de</a></div>
                <div className="flex items-center gap-3"><span className="text-2xl">📱</span><a href="tel:+491764443667" className="text-sky-600 font-semibold hover:text-sky-700">+49 176 44437667</a></div>
                <div className="flex items-center gap-3"><span className="text-2xl">📍</span><div className="text-gray-700"><p className="font-semibold">Bogdan Zambrovskij</p><p>Konstanzer Str. 46</p><p>80809 München</p></div></div>
              </div>
            </div>
            <div className="bg-white border-2 border-sky-200 rounded-xl p-6 text-center">
              <p className="text-sm text-gray-600 mb-4"><strong>{t('contact.coursesOnSite')}</strong></p>
              <div className="space-y-2 mb-4"><p className="font-semibold text-gray-900">🇭🇷 Marina Dalmacija</p><p className="text-sm text-gray-700">Sukošan, Kroatien</p></div>
              <p className="text-xs text-gray-500">{t('contact.bogdanOnSite')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// FOOTER
// ============================================
const Footer = () => {
  const { t } = useLanguage();
  return (
    <footer className="bg-gray-900 text-white py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-blue-900 to-gray-900 opacity-50" />
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4"><img src="/pontarea-logo.svg" alt="Pontarea Logo" className="h-6" /></div>
            <p className="text-gray-400 text-sm">{t('footer.description')}</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">{t('footer.navTitle')}</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#kurse" className="hover:text-sky-400 transition-colors">{t('nav.courses')}</a></li>
              <li><a href="#warum-pontarea" className="hover:text-sky-400 transition-colors">{t('nav.why')}</a></li>
              <li><a href="#faq" className="hover:text-sky-400 transition-colors">{t('nav.faq')}</a></li>
              <li><a href="#kontakt" className="hover:text-sky-400 transition-colors">{t('nav.contact')}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">{t('footer.contactTitle')}</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><span className="font-semibold text-white">Bogdan Zambrovskij</span></li>
              <li><a href="mailto:info@pontarea.de" className="hover:text-sky-400 transition-colors">info@pontarea.de</a></li>
              <li><a href="tel:+491764443667" className="hover:text-sky-400 transition-colors">+49 176 44437667</a></li>
              <li className="pt-1">Konstanzer Str. 46</li>
              <li>80809 München</li>
              <li className="text-xs text-gray-500">{t('footer.marinaName')}<br/>{t('footer.marinaCity')}</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">{t('footer.legalTitle')}</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link href="/impressum" className="hover:text-sky-400 transition-colors">{t('footer.impressum')}</Link></li>
              <li><Link href="/datenschutz" className="hover:text-sky-400 transition-colors">{t('footer.datenschutz')}</Link></li>
              <li><Link href="/agb" className="hover:text-sky-400 transition-colors">{t('footer.agb')}</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-8">
          <p className="text-gray-500 text-sm text-center">{t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
};

// ============================================
// RETREATS AUF SEE — NEW SECTIONS
// ============================================

// Helper: split a "\n"-separated locale string into a clean list
const toList = (val: string): string[] =>
  (val || "").split("\n").map((s) => s.trim()).filter(Boolean);

const scrollTo = (href: string) =>
  document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });

// ---- Retreat offers intro (3 cards) ----
const RetreatOffersSection = () => {
  const { t } = useLanguage();
  const content = usePontareaContent();
  const imgs = content.retreatImages || {};
  const offers = [
    { title: t('retreat.offer1Title'), text: t('retreat.offer1Text'), button: t('retreat.offer1Button'), img: imgs.offer1 || "/sailing-instructor-new.webp", alt: t('retreat.altTrainings') },
    { title: t('retreat.offer2Title'), text: t('retreat.offer2Text'), button: t('retreat.offer2Button'), img: imgs.offer2 || "/harbor-maneuvers-new.webp", alt: t('retreat.altOnboard2') },
    { title: t('retreat.offer3Title'), text: t('retreat.offer3Text'), button: t('retreat.offer3Button'), img: imgs.offer3 || "/catamaran-retreat.webp", alt: t('retreat.altConcept') },
  ];
  return (
    <section id="retreats" className="py-24 bg-gradient-to-b from-white via-sky-50 to-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-sky-100 rounded-full blur-3xl opacity-40" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-40" />
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block text-sky-600 text-sm uppercase tracking-[0.3em] font-semibold mb-4">{t('retreat.offersTag')}</span>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">{t('retreat.offersTitle')}</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t('retreat.offersSubtitle')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {offers.map((o, i) => (
            <div key={i} className="flex flex-col bg-white border border-sky-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all">
              <div className="h-52 overflow-hidden">
                <img src={o.img} alt={o.alt} loading="lazy" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="flex flex-col flex-1 p-7">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{o.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed flex-1">{o.text}</p>
                <a href="#retreat-anfrage" onClick={(e) => { e.preventDefault(); scrollTo("#retreat-anfrage"); }} className="mt-6 inline-block text-center py-3 px-5 bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all">{o.button}</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ---- Trainings / Retreats / Teambuilding ----
const RetreatTrainingsSection = () => {
  const { t } = useLanguage();
  const content = usePontareaContent();
  const imgs = content.retreatImages || {};
  const formats = toList(t('retreat.trainingsFormats'));
  return (
    <section id="coaches" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block text-sky-600 text-sm uppercase tracking-[0.3em] font-semibold mb-4">{t('retreat.trainingsTag')}</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{t('retreat.trainingsTitle')}</h2>
            <p className="text-lg text-sky-700 font-medium mb-6">{t('retreat.trainingsSubtitle')}</p>
            <p className="text-gray-600 mb-4 leading-relaxed">{t('retreat.trainingsText1')}</p>
            <p className="text-gray-600 leading-relaxed">{t('retreat.trainingsText2')}</p>
          </div>
          <div className="rounded-3xl overflow-hidden shadow-lg">
            <img src={imgs.trainings || "/catamaran-retreat.webp"} alt={t('retreat.altTrainings')} loading="lazy" className="w-full h-full object-cover" />
          </div>
        </div>
        <div className="mt-14 bg-sky-50 border border-sky-200 rounded-3xl p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">{t('retreat.trainingsFormatsTitle')}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
            {formats.map((f, i) => (
              <div key={i} className="flex items-start gap-3"><span className="text-sky-500 mt-1">⛵</span><span className="text-gray-700">{f}</span></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ---- Audience / target groups ----
const RetreatAudienceSection = () => {
  const { t } = useLanguage();
  const groups = toList(t('retreat.audienceGroups'));
  return (
    <section id="retreat-zielgruppen" className="py-24 bg-gradient-to-b from-sky-50 to-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="inline-block text-sky-600 text-sm uppercase tracking-[0.3em] font-semibold mb-4">{t('retreat.audienceTag')}</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{t('retreat.audienceTitle')}</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">{t('retreat.audienceText')}</p>
        </div>
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {groups.map((g, i) => (
            <span key={i} className="px-5 py-2.5 bg-white border border-sky-200 rounded-full text-gray-700 text-sm font-medium shadow-sm">{g}</span>
          ))}
        </div>
        <p className="text-center text-gray-600 max-w-3xl mx-auto leading-relaxed">{t('retreat.audienceOutro')}</p>
      </div>
    </section>
  );
};

// ---- What Pontarea handles ----
const RetreatServicesSection = () => {
  const { t } = useLanguage();
  const list = toList(t('retreat.servicesList'));
  return (
    <section id="retreat-leistungen" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="inline-block text-sky-600 text-sm uppercase tracking-[0.3em] font-semibold mb-4">{t('retreat.servicesTag')}</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{t('retreat.servicesTitle')}</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">{t('retreat.servicesText')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4 max-w-4xl mx-auto mb-10">
          {list.map((item, i) => (
            <div key={i} className="flex items-start gap-3"><span className="text-sky-500 mt-1">✓</span><span className="text-gray-700">{item}</span></div>
          ))}
        </div>
        <p className="text-center text-lg text-sky-700 font-medium max-w-2xl mx-auto">{t('retreat.servicesOutro')}</p>
      </div>
    </section>
  );
};

// ---- Concept "Alle in einem Boot" ----
const RetreatConceptSection = () => {
  const { t } = useLanguage();
  const content = usePontareaContent();
  const imgs = content.retreatImages || {};
  const list = toList(t('retreat.conceptList'));
  return (
    <section id="retreat-konzept" className="py-24 bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="rounded-3xl overflow-hidden shadow-lg order-2 lg:order-1">
            <img src={imgs.concept || "/captain-helm_new_resized.webp"} alt={t('retreat.altConcept')} loading="lazy" className="w-full h-full object-cover" />
          </div>
          <div className="order-1 lg:order-2">
            <span className="inline-block text-sky-400 text-sm uppercase tracking-[0.3em] font-semibold mb-4">{t('retreat.conceptTag')}</span>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t('retreat.conceptTitle')}</h2>
            <p className="text-white/70 mb-6 leading-relaxed">{t('retreat.conceptText1')}</p>
            <p className="font-semibold text-white mb-4">{t('retreat.conceptListTitle')}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mb-6">
              {list.map((item, i) => (
                <div key={i} className="flex items-start gap-2 text-sm"><span className="text-sky-400 mt-0.5">•</span><span className="text-white/80">{item}</span></div>
              ))}
            </div>
            <p className="text-white/70 leading-relaxed">{t('retreat.conceptText2')}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

// ---- Why a yacht ----
const RetreatWhyYachtSection = () => {
  const { t } = useLanguage();
  const questions = toList(t('retreat.whyYachtQuestions'));
  return (
    <section id="retreat-warum-yacht" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <span className="inline-block text-sky-600 text-sm uppercase tracking-[0.3em] font-semibold mb-4">{t('retreat.whyYachtTag')}</span>
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">{t('retreat.whyYachtTitle')}</h2>
        <p className="text-lg text-gray-600 mb-10 leading-relaxed">{t('retreat.whyYachtText')}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 text-left">
          {questions.map((q, i) => (
            <div key={i} className="flex items-start gap-3 bg-sky-50 border border-sky-200 rounded-2xl p-5"><span className="text-2xl">🧭</span><span className="text-gray-700 font-medium">{q}</span></div>
          ))}
        </div>
        <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">{t('retreat.whyYachtOutro')}</p>
      </div>
    </section>
  );
};

// ---- Logistics ----
const RetreatLogisticsSection = () => {
  const { t } = useLanguage();
  const content = usePontareaContent();
  const imgs = content.retreatImages || {};
  const advantages = toList(t('retreat.logisticsAdvantages'));
  return (
    <section id="retreat-logistik" className="py-24 bg-gradient-to-b from-sky-50 to-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block text-sky-600 text-sm uppercase tracking-[0.3em] font-semibold mb-4">{t('retreat.logisticsTag')}</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">{t('retreat.logisticsTitle')}</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>{t('retreat.logisticsText1')}</p>
              <p>{t('retreat.logisticsText2')}</p>
              <p>{t('retreat.logisticsText3')}</p>
              <p>{t('retreat.logisticsText4')}</p>
            </div>
          </div>
          <div>
            <div className="rounded-3xl overflow-hidden shadow-lg mb-6">
              <img src={imgs.logistics || "/marina-docking_resized.webp"} alt={t('retreat.altLogistics')} loading="lazy" className="w-full h-full object-cover" />
            </div>
            <div className="bg-white border border-sky-200 rounded-2xl p-6">
              <h3 className="font-bold text-gray-900 mb-4">{t('retreat.logisticsAdvantagesTitle')}</h3>
              <ul className="space-y-2">
                {advantages.map((a, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-700 text-sm"><span className="text-sky-500 mt-0.5">✓</span>{a}</li>
                ))}
              </ul>
              <p className="mt-4 text-sky-700 font-semibold">{t('retreat.logisticsOutro')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ---- Life onboard ----
const RetreatOnboardSection = () => {
  const { t } = useLanguage();
  const content = usePontareaContent();
  const imgs = content.retreatImages || {};
  const schedule = toList(t('retreat.onboardSchedule'));
  const gallery = [
    { img: imgs.onboard1 || "/sailing-instructor-new.webp", alt: t('retreat.altOnboard1') },
    { img: imgs.onboard2 || "/harbor-maneuvers-new.webp", alt: t('retreat.altOnboard2') },
    { img: imgs.onboard3 || "/captain-helm_new_resized.webp", alt: t('retreat.altOnboard3') },
  ];
  return (
    <section id="retreat-an-bord" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="inline-block text-sky-600 text-sm uppercase tracking-[0.3em] font-semibold mb-4">{t('retreat.onboardTag')}</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{t('retreat.onboardTitle')}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {gallery.map((g, i) => (
            <div key={i} className="h-56 rounded-2xl overflow-hidden shadow-sm">
              <img src={g.img} alt={g.alt} loading="lazy" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p>{t('retreat.onboardText1')}</p>
            <p>{t('retreat.onboardText2')}</p>
            <p className="text-sky-700 font-medium">{t('retreat.onboardOutro')}</p>
          </div>
          <div className="bg-sky-50 border border-sky-200 rounded-2xl p-6">
            <h3 className="font-bold text-gray-900 mb-4">{t('retreat.onboardScheduleTitle')}</h3>
            <ul className="space-y-3">
              {schedule.map((s, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-700 text-sm"><span className="text-sky-500 mt-0.5">🕐</span>{s}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

// ---- Safety & risk management ----
const RetreatSafetySection = () => {
  const { t } = useLanguage();
  const list = toList(t('retreat.safetyList'));
  return (
    <section id="retreat-sicherheit" className="py-24 bg-gradient-to-b from-sky-50 to-white relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="inline-block text-sky-600 text-sm uppercase tracking-[0.3em] font-semibold mb-4">{t('retreat.safetyTag')}</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{t('retreat.safetyTitle')}</h2>
        </div>
        <div className="space-y-4 text-gray-600 leading-relaxed mb-10 max-w-3xl mx-auto text-center">
          <p>{t('retreat.safetyText1')}</p>
          <p className="text-gray-900 font-semibold">{t('retreat.safetyText2')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4 max-w-4xl mx-auto mb-8">
          {list.map((item, i) => (
            <div key={i} className="flex items-start gap-3 bg-white border border-sky-200 rounded-2xl p-4"><span className="text-sky-500 mt-0.5">🛟</span><span className="text-gray-700 text-sm">{item}</span></div>
          ))}
        </div>
        <p className="text-center text-gray-600 leading-relaxed max-w-3xl mx-auto">{t('retreat.safetyOutro')}</p>
      </div>
    </section>
  );
};

// ---- Cost structure ----
const RetreatCostSection = () => {
  const { t } = useLanguage();
  const list = toList(t('retreat.costList'));
  return (
    <section id="retreat-kosten" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="inline-block text-sky-600 text-sm uppercase tracking-[0.3em] font-semibold mb-4">{t('retreat.costTag')}</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{t('retreat.costTitle')}</h2>
        </div>
        <div className="space-y-4 text-gray-600 leading-relaxed mb-10 max-w-3xl mx-auto text-center">
          <p>{t('retreat.costText1')}</p>
          <p>{t('retreat.costText2')}</p>
        </div>
        <div className="bg-sky-50 border border-sky-200 rounded-3xl p-8 max-w-3xl mx-auto">
          <h3 className="font-bold text-gray-900 mb-6 text-center">{t('retreat.costListTitle')}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 mb-8">
            {list.map((item, i) => (
              <div key={i} className="flex items-start gap-3 text-gray-700 text-sm"><span className="text-sky-500 mt-0.5">💶</span>{item}</div>
            ))}
          </div>
          <a href="#retreat-anfrage" onClick={(e) => { e.preventDefault(); scrollTo("#retreat-anfrage"); }} className="block w-full text-center py-4 bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold rounded-2xl hover:shadow-lg transition-all">{t('retreat.costButton')}</a>
        </div>
      </div>
    </section>
  );
};

// ---- Retreat inquiry form ----
const RetreatFormSection = () => {
  const { t } = useLanguage();
  const [form, setForm] = useState({
    name: "", email: "", phone: "", commLang: "", type: "", period: "",
    participants: "", topic: "", message: "",
    duration: "", berths: "", boatType: "", ports: "", comfort: "", budget: "",
    privacy: false,
  });
  const [status, setStatus] = useState<"idle"|"success"|"error"|"missing"|"privacy">("idle");

  const set = (k: string, v: string | boolean) => setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.type || !form.message.trim()) { setStatus("missing"); return; }
    if (!form.privacy) { setStatus("privacy"); return; }
    // Build a structured mailto so the inquiry reaches Pontarea reliably.
    const lines = [
      `Name: ${form.name}`,
      `E-Mail: ${form.email}`,
      `Telefon/WhatsApp: ${form.phone}`,
      `Sprache: ${form.commLang}`,
      `Art der Anfrage: ${form.type}`,
      `Zeitraum: ${form.period}`,
      `Teilnehmer: ${form.participants}`,
      `Thema/Ziel: ${form.topic}`,
      `Dauer: ${form.duration}`,
      `Schlafplätze: ${form.berths}`,
      `Yacht/Katamaran: ${form.boatType}`,
      `Start-/Zielhafen: ${form.ports}`,
      `Komfortniveau: ${form.comfort}`,
      `Budget: ${form.budget}`,
      ``,
      `Nachricht:`,
      form.message,
    ];
    const subject = encodeURIComponent(`Retreat-Anfrage: ${form.type || "Yacht-Event"}`);
    const body = encodeURIComponent(lines.join("\n"));
    window.location.href = `mailto:info@pontarea.de?subject=${subject}&body=${body}`;
    setStatus("success");
  };

  return (
    <section id="retreat-anfrage" className="py-24 bg-gradient-to-b from-white via-sky-50 to-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-sky-100 rounded-full blur-3xl opacity-40" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-40" />
      <div className="relative z-10 max-w-3xl mx-auto px-6">
        <div className="text-center mb-10">
          <span className="inline-block text-sky-600 text-sm uppercase tracking-[0.3em] font-semibold mb-4">{t('retreat.formTag')}</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{t('retreat.formTitle')}</h2>
          <p className="text-lg text-gray-600">{t('retreat.formText')}</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-white border-2 border-sky-200 rounded-3xl p-8 shadow-lg space-y-6">
          {status === "success" && <div className="p-4 bg-green-100 border border-green-400 text-green-800 rounded-lg">{t('retreat.formSuccess')}</div>}
          {status === "error" && <div className="p-4 bg-red-100 border border-red-400 text-red-800 rounded-lg">{t('retreat.formError')}</div>}
          {status === "missing" && <div className="p-4 bg-amber-100 border border-amber-400 text-amber-800 rounded-lg">{t('retreat.formRequired')}</div>}
          {status === "privacy" && <div className="p-4 bg-amber-100 border border-amber-400 text-amber-800 rounded-lg">{t('retreat.formPrivacyRequired')}</div>}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div><Label className="text-gray-800 font-semibold mb-2 block">{t('retreat.formName')} *</Label><Input value={form.name} onChange={(e) => set("name", e.target.value)} required placeholder={t('retreat.formNamePlaceholder')} className="border-sky-300" /></div>
            <div><Label className="text-gray-800 font-semibold mb-2 block">{t('retreat.formEmail')} *</Label><Input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} required placeholder={t('retreat.formEmailPlaceholder')} className="border-sky-300" /></div>
            <div><Label className="text-gray-800 font-semibold mb-2 block">{t('retreat.formPhone')}</Label><Input value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder={t('retreat.formPhonePlaceholder')} className="border-sky-300" /></div>
            <div>
              <Label className="text-gray-800 font-semibold mb-2 block">{t('retreat.formCommLang')}</Label>
              <Select value={form.commLang} onValueChange={(v) => set("commLang", v)}>
                <SelectTrigger className="border-sky-300"><SelectValue placeholder="—" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value={t('retreat.formCommLangDe')}>{t('retreat.formCommLangDe')}</SelectItem>
                  <SelectItem value={t('retreat.formCommLangRu')}>{t('retreat.formCommLangRu')}</SelectItem>
                  <SelectItem value={t('retreat.formCommLangEn')}>{t('retreat.formCommLangEn')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-gray-800 font-semibold mb-2 block">{t('retreat.formType')} *</Label>
              <Select value={form.type} onValueChange={(v) => set("type", v)}>
                <SelectTrigger className="border-sky-300"><SelectValue placeholder={t('retreat.formTypePlaceholder')} /></SelectTrigger>
                <SelectContent>
                  <SelectItem value={t('retreat.formTypeCaptain')}>{t('retreat.formTypeCaptain')}</SelectItem>
                  <SelectItem value={t('retreat.formTypeHarbor')}>{t('retreat.formTypeHarbor')}</SelectItem>
                  <SelectItem value={t('retreat.formTypeRetreat')}>{t('retreat.formTypeRetreat')}</SelectItem>
                  <SelectItem value={t('retreat.formTypeTeam')}>{t('retreat.formTypeTeam')}</SelectItem>
                  <SelectItem value={t('retreat.formTypeLeadership')}>{t('retreat.formTypeLeadership')}</SelectItem>
                  <SelectItem value={t('retreat.formTypeYachtEvent')}>{t('retreat.formTypeYachtEvent')}</SelectItem>
                  <SelectItem value={t('retreat.formTypeOther')}>{t('retreat.formTypeOther')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div><Label className="text-gray-800 font-semibold mb-2 block">{t('retreat.formPeriod')}</Label><Input value={form.period} onChange={(e) => set("period", e.target.value)} placeholder={t('retreat.formPeriodPlaceholder')} className="border-sky-300" /></div>
            <div><Label className="text-gray-800 font-semibold mb-2 block">{t('retreat.formParticipants')}</Label><Input value={form.participants} onChange={(e) => set("participants", e.target.value)} placeholder={t('retreat.formParticipantsPlaceholder')} className="border-sky-300" /></div>
            <div><Label className="text-gray-800 font-semibold mb-2 block">{t('retreat.formTopic')}</Label><Input value={form.topic} onChange={(e) => set("topic", e.target.value)} placeholder={t('retreat.formTopicPlaceholder')} className="border-sky-300" /></div>
          </div>
          <div><Label className="text-gray-800 font-semibold mb-2 block">{t('retreat.formMessage')} *</Label><Textarea value={form.message} onChange={(e) => set("message", e.target.value)} required rows={4} placeholder={t('retreat.formMessagePlaceholder')} className="border-sky-300" /></div>

          <details className="border border-sky-200 rounded-2xl p-5">
            <summary className="cursor-pointer font-semibold text-gray-800">{t('retreat.formOptionalTitle')}</summary>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5">
              <div><Label className="text-gray-800 font-semibold mb-2 block">{t('retreat.formDuration')}</Label><Input value={form.duration} onChange={(e) => set("duration", e.target.value)} className="border-sky-300" /></div>
              <div><Label className="text-gray-800 font-semibold mb-2 block">{t('retreat.formBerths')}</Label><Input value={form.berths} onChange={(e) => set("berths", e.target.value)} className="border-sky-300" /></div>
              <div><Label className="text-gray-800 font-semibold mb-2 block">{t('retreat.formBoatType')}</Label><Input value={form.boatType} onChange={(e) => set("boatType", e.target.value)} className="border-sky-300" /></div>
              <div><Label className="text-gray-800 font-semibold mb-2 block">{t('retreat.formPorts')}</Label><Input value={form.ports} onChange={(e) => set("ports", e.target.value)} className="border-sky-300" /></div>
              <div><Label className="text-gray-800 font-semibold mb-2 block">{t('retreat.formComfort')}</Label><Input value={form.comfort} onChange={(e) => set("comfort", e.target.value)} className="border-sky-300" /></div>
              <div><Label className="text-gray-800 font-semibold mb-2 block">{t('retreat.formBudget')}</Label><Input value={form.budget} onChange={(e) => set("budget", e.target.value)} className="border-sky-300" /></div>
            </div>
          </details>

          <label className="flex items-start gap-3 text-sm text-gray-600">
            <input type="checkbox" checked={form.privacy} onChange={(e) => set("privacy", e.target.checked)} className="mt-1 h-4 w-4 accent-sky-600" />
            <span>{t('retreat.formPrivacy')}</span>
          </label>

          <Button type="submit" className="w-full h-12 bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold text-lg rounded-lg hover:shadow-lg transition-all">{t('retreat.formSubmit')}</Button>
        </form>
      </div>
    </section>
  );
};

// ---- Final CTA ----
const RetreatFinalCtaSection = () => {
  const { t } = useLanguage();
  return (
    <section id="retreat-abschluss" className="py-24 bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t('retreat.finalTitle')}</h2>
        <p className="text-white/70 mb-8 leading-relaxed">{t('retreat.finalText')}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
          <a href="#retreat-anfrage" onClick={(e) => { e.preventDefault(); scrollTo("#retreat-anfrage"); }} className="px-8 py-4 bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold rounded-2xl hover:shadow-lg transition-all">{t('retreat.finalButton')}</a>
          <a href="https://wa.me/491764443667" target="_blank" rel="noopener noreferrer" className="px-8 py-4 border-2 border-white/30 text-white font-bold rounded-2xl hover:bg-white/10 transition-all">WhatsApp</a>
        </div>
        <p className="text-white/50 text-sm max-w-xl mx-auto">{t('retreat.finalSecondary')}</p>
      </div>
    </section>
  );
};

// ============================================
// MAIN PAGE
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
      <SkipperServiceSection />
      <RetreatOffersSection />
      <RetreatTrainingsSection />
      <RetreatAudienceSection />
      <RetreatServicesSection />
      <RetreatConceptSection />
      <RetreatWhyYachtSection />
      <RetreatLogisticsSection />
      <RetreatOnboardSection />
      <RetreatSafetySection />
      <RetreatCostSection />
      <RetreatFormSection />
      <RetreatFinalCtaSection />
      <FAQSection />
      <BookingFormSection />
      <Footer />
    </div>
  );
}
