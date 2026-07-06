import { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import AdminLogin from "./admin-login";
import deTranslations from "../locales/de.json";
import ruTranslations from "../locales/ru.json";

// ────────────────────────────────────────────────────────────
//  Auth helpers
// ────────────────────────────────────────────────────────────
const TOKEN_KEY = "pontarea_admin_token";

function getStoredToken(): string | null {
  try { return localStorage.getItem(TOKEN_KEY); } catch { return null; }
}
function clearToken() {
  try { localStorage.removeItem(TOKEN_KEY); } catch {}
}

async function apiVerify(token: string): Promise<boolean> {
  // Dev-Token (ohne Server)
  if (token.startsWith("dev_")) {
    const expiry = parseInt(token.slice(4));
    return !isNaN(expiry) && Date.now() < expiry;
  }
  try {
    const res = await fetch("/api/admin/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });
    if (!res.ok) return false;
    const data = await res.json() as any;
    return data.valid === true;
  } catch {
    // API nicht erreichbar → nicht einloggen (Sicherheit)
    return false;
  }
}

// ────────────────────────────────────────────────────────────
//  Types
// ────────────────────────────────────────────────────────────
type Lang = "de" | "ru";

// ────────────────────────────────────────────────────────────
//  Deep merge helper
// ────────────────────────────────────────────────────────────
function deepMerge(base: Record<string, any>, override: Record<string, any>): Record<string, any> {
  const result = { ...base };
  for (const key in override) {
    if (override[key] !== null && typeof override[key] === "object" && !Array.isArray(override[key]) &&
        base[key] !== null && typeof base[key] === "object" && !Array.isArray(base[key])) {
      result[key] = deepMerge(base[key], override[key]);
    } else { result[key] = override[key]; }
  }
  return result;
}

// ────────────────────────────────────────────────────────────
//  Load / Save helpers
// ────────────────────────────────────────────────────────────
const BASE_TRANSLATIONS: Record<Lang, Record<string, any>> = {
  de: deTranslations as Record<string, any>,
  ru: ruTranslations as Record<string, any>,
};

function loadTranslations(lang: Lang): Record<string, any> {
  if (typeof window === "undefined") return BASE_TRANSLATIONS[lang];
  try {
    const saved = localStorage.getItem(`translations_${lang}`);
    if (saved) return deepMerge(BASE_TRANSLATIONS[lang], JSON.parse(saved));
  } catch {}
  return { ...BASE_TRANSLATIONS[lang] };
}

function saveTranslations(lang: Lang, translations: Record<string, any>) {
  localStorage.setItem(`translations_${lang}`, JSON.stringify(translations));
  window.dispatchEvent(new StorageEvent("storage", { key: `translations_${lang}` }));
}

function setNested(obj: Record<string, any>, path: string, value: string): Record<string, any> {
  const keys = path.split(".");
  const result = JSON.parse(JSON.stringify(obj));
  let cur: any = result;
  for (let i = 0; i < keys.length - 1; i++) { if (!cur[keys[i]]) cur[keys[i]] = {}; cur = cur[keys[i]]; }
  cur[keys[keys.length - 1]] = value;
  return result;
}

function getNested(obj: Record<string, any>, path: string): string {
  const keys = path.split(".");
  let cur: any = obj;
  for (const k of keys) { if (cur == null || typeof cur !== "object") return ""; cur = cur[k]; }
  return typeof cur === "string" ? cur : "";
}

function getDefaultPontareaContent(): Record<string, any> {
  return {
    hero: { badge: "", title: "", subtitle: "", description: "", ctaText: "", heroImage: "./sailing-instructor-new.webp" },
    instructor: { name: "Bogdan Zambrovskij", role: "Segeltrainer & Gründer", bio: "", quote: "" },
    location: { name: "Marina Dalmacija", country: "Kroatien", city: "Sukošan", description: "" },
    contact: { name: "Bogdan Zambrovskij", role: "Segeltrainer", address: "Konstanzer Str. 46", city: "80809 München", email: "info@pontarea.de", phone: "+49 176 444 37667", whatsapp: "+491764443667" },
    logos: { mainLogo: "./pontarea-logo.svg", favicon: "./favicon.svg", ogImage: "./og-image.webp" },
    seo: { title: "Pontarea – Yachting, Training & Events in Kroatien", description: "Sportbootführerschein- & Kapitänskurse, Yachtcharter sowie Retreats, Teambuilding & Events auf See in Marina Dalmacija, Kroatien. Für Segler, Coaches, Trainer und Unternehmen.", keywords: "Segelkurs, Kapitänskurs, Sportbootführerschein, Yachtcharter Kroatien, Yacht mieten, Events auf See, Kroatien, Marina Dalmacija, Zadar, Sukošan, Skipper Lizenz, Retreat auf See, Yacht Retreat, Teambuilding Yacht, Coaching auf See, Führungskräfte Retreat, wingwave" },
    retreatImages: { offer1: "./sailing-instructor-new.webp", offer2: "./harbor-maneuvers-new.webp", offer3: "./catamaran-retreat.webp", trainings: "./catamaran-retreat.webp", concept: "./captain-helm_new_resized.webp", logistics: "./marina-docking_resized.webp", onboard1: "./sailing-instructor-new.webp", onboard2: "./harbor-maneuvers-new.webp", onboard3: "./captain-helm_new_resized.webp" },
    emailSettings: { subjectTemplate: "Platzanfrage für den Kurs am {date}", bodyTemplate: "Guten Tag,\n\nbitte kontaktieren Sie mich bezüglich des Kurses.\n\nMit freundlichen Grüßen" },
  };
}

function loadPontareaContent(lang: Lang): Record<string, any> {
  const def = getDefaultPontareaContent();
  if (typeof window === "undefined") return def;
  try { const saved = localStorage.getItem(`pontareaContent_${lang}`); if (saved) return { ...def, ...JSON.parse(saved) }; } catch {}
  return def;
}

function savePontareaContent(lang: Lang, content: Record<string, any>) {
  localStorage.setItem(`pontareaContent_${lang}`, JSON.stringify(content));
}

// ────────────────────────────────────────────────────────────
//  Tab definitions
// ────────────────────────────────────────────────────────────
type TabId = "nav"|"hero"|"stats"|"courses_captain"|"courses_harbor"|"pricing"|"howitworks"|"schedule"|"skipper"|"retreat_offers"|"retreat_trainings"|"retreat_audience"|"retreat_services"|"retreat_concept"|"retreat_whyyacht"|"retreat_logistics"|"retreat_onboard"|"retreat_safety"|"retreat_cost"|"retreat_form"|"retreat_final"|"retreat_images"|"faq"|"testimonials"|"contact"|"footer"|"instructor"|"location"|"seo"|"emailSettings";

const TABS: { id: TabId; label: string; source: "translations"|"content" }[] = [
  { id: "nav",            label: "🔗 Navigation",         source: "translations" },
  { id: "hero",           label: "🏠 Hero",               source: "translations" },
  { id: "stats",          label: "📊 Statistiken",        source: "translations" },
  { id: "courses_captain",label: "⛵ Kurs: Kapitän",      source: "translations" },
  { id: "courses_harbor", label: "⚓ Kurs: Hafen",        source: "translations" },
  { id: "pricing",        label: "💰 Preise",             source: "translations" },
  { id: "howitworks",     label: "🔄 Wie funktioniert's", source: "translations" },
  { id: "schedule",       label: "📅 Kursplan",           source: "translations" },
  { id: "skipper",        label: "⚓ Skipperservice",     source: "translations" },
  { id: "retreat_offers",   label: "🌊 Retreat: Angebote",   source: "translations" },
  { id: "retreat_trainings",label: "🌊 Retreat: Trainings",  source: "translations" },
  { id: "retreat_audience", label: "🌊 Retreat: Zielgruppen",source: "translations" },
  { id: "retreat_services", label: "🌊 Retreat: Leistungen", source: "translations" },
  { id: "retreat_concept",  label: "🌊 Retreat: Konzept",    source: "translations" },
  { id: "retreat_whyyacht", label: "🌊 Retreat: Warum Yacht",source: "translations" },
  { id: "retreat_logistics",label: "🌊 Retreat: Logistik",   source: "translations" },
  { id: "retreat_onboard",  label: "🌊 Retreat: An Bord",    source: "translations" },
  { id: "retreat_safety",   label: "🌊 Retreat: Sicherheit", source: "translations" },
  { id: "retreat_cost",     label: "🌊 Retreat: Kosten",     source: "translations" },
  { id: "retreat_form",     label: "🌊 Retreat: Formular",   source: "translations" },
  { id: "retreat_final",    label: "🌊 Retreat: Abschluss",  source: "translations" },
  { id: "retreat_images",   label: "🖼️ Retreat: Bilder",     source: "content" },
  { id: "faq",            label: "❓ FAQ",                source: "translations" },
  { id: "testimonials",   label: "⭐ Bewertungen",        source: "translations" },
  { id: "contact",        label: "📞 Kontakt-Sektion",    source: "translations" },
  { id: "footer",         label: "🦶 Footer",             source: "translations" },
  { id: "instructor",     label: "👤 Trainer",            source: "content" },
  { id: "location",       label: "📍 Standort",           source: "content" },
  { id: "seo",            label: "🔍 SEO",                source: "content" },
  { id: "emailSettings",  label: "✉️ E-Mail Vorlage",     source: "content" },
];

const TAB_KEYS: Record<TabId, string[]> = {
  nav: ["nav.courses","nav.why","nav.yacht","nav.skipper","nav.faq","nav.contact","nav.signup","nav.retreats","nav.coaches"],
  hero: ["hero.badge","hero.title","hero.subtitle","hero.statsTitle","hero.statsDescription","hero.location","hero.group","hero.format","hero.goal","hero.schedule","hero.discover","hero.signupNow","hero.answerTime"],
  stats: ["stats.title","stats.subtitle","stats.students","stats.studentsLabel","stats.studentsNote","stats.experience","stats.experienceLabel","stats.successRate","stats.successRateLabel","stats.groupSize","stats.groupSizeLabel"],
  courses_captain: ["courses.sectionTitle","courses.title","courses.subtitle","courses.location","courses.captain.title","courses.captain.subtitle","courses.captain.price","courses.captain.dates","courses.captain.duration","courses.captain.description","courses.captain.feature1","courses.captain.feature2","courses.captain.feature3","courses.captain.feature4","courses.captain.feature5","courses.captain.feature6","courses.captain.learnTitle","courses.captain.learn1","courses.captain.learn2","courses.captain.learn3","courses.captain.learn4","courses.captain.learn5","courses.captain.learn6","courses.captain.learn7","courses.captain.learn8","courses.learnMore","courses.bookNow","courses.nextDates"],
  courses_harbor: ["courses.harbor.title","courses.harbor.subtitle","courses.harbor.price","courses.harbor.dates","courses.harbor.duration","courses.harbor.description","courses.harbor.uniqueBadge","courses.harbor.feature1","courses.harbor.feature2","courses.harbor.feature3","courses.harbor.feature4","courses.harbor.feature5","courses.harbor.feature6","courses.harbor.learnTitle","courses.harbor.learn1","courses.harbor.learn2","courses.harbor.learn3","courses.harbor.learn4","courses.harbor.learn5","courses.harbor.learn6","courses.harbor.learn7","courses.harbor.learn8","courses.harbor.fearsTitle","courses.harbor.fear1","courses.harbor.fear2","courses.harbor.fear3","courses.harbor.fear4","courses.harbor.fear5","courses.harbor.fear6","courses.harbor.fear7","courses.fearsDialogTitle","courses.fearsDialogIntro","courses.fearsDialogAfter","courses.fearsDialogAfterText"],
  pricing: ["pricing.title","pricing.subtitle","pricing.included","pricing.additional","pricing.item1","pricing.item2","pricing.item3","pricing.item4","pricing.item5","pricing.item6","pricing.item7","pricing.item8","pricing.bordkasseTitle","pricing.bordkasseAmount","pricing.bordkasseDesc","pricing.bordkasse1","pricing.bordkasse2","pricing.bordkasse3","pricing.kautionTitle","pricing.kautionWithout","pricing.kautionWithoutAmount","pricing.kautionWithoutDesc","pricing.kautionWithoutPerPerson","pricing.kautionWithoutNote","pricing.kautionWith","pricing.kautionWithAmount","pricing.kautionWithDesc","pricing.kautionWithTotal","pricing.kautionWithNote","pricing.kautionImportant","pricing.summaryTitle","pricing.summary1","pricing.summary2","pricing.summary3","pricing.summaryTotal","pricing.summaryOptions","pricing.transparencyLabel","pricing.transparencyNote"],
  howitworks: ["howItWorks.title","howItWorks.subtitle","howItWorks.step","howItWorks.step1Title","howItWorks.step1Desc","howItWorks.step1Icon","howItWorks.step2Title","howItWorks.step2Desc","howItWorks.step2Icon","howItWorks.step3Title","howItWorks.step3Desc","howItWorks.step3Icon"],
  schedule: ["schedule.title","schedule.subtitle","schedule.note","schedule.day1","schedule.day1Title","schedule.day1Brief","schedule.day1Detailed","schedule.day2","schedule.day2Title","schedule.day2Brief","schedule.day2Detailed","schedule.day3","schedule.day3Title","schedule.day3Brief","schedule.day3Detailed","schedule.day4","schedule.day4Title","schedule.day4Brief","schedule.day4Detailed","schedule.day5","schedule.day5Title","schedule.day5Brief","schedule.day5Detailed","schedule.day6","schedule.day6Title","schedule.day6Brief","schedule.day6Detailed","schedule.day7","schedule.day7Title","schedule.day7Brief","schedule.day7Detailed","schedule.day8","schedule.day8Title","schedule.day8Brief","schedule.day8Detailed","schedule.noteLabel","schedule.bottomNote","schedule.detailedAgenda"],
  skipper: ["skipper.sectionTag","skipper.title","skipper.subtitle","skipper.includesTitle","skipper.item1Title","skipper.item1Desc","skipper.item2Title","skipper.item2Desc","skipper.item3Title","skipper.item3Desc","skipper.item4Title","skipper.item4Desc","skipper.priceTitle","skipper.price1Label","skipper.price1Desc","skipper.price1Tag","skipper.price2Label","skipper.price2Desc","skipper.price2Tag","skipper.price3Label","skipper.price3Desc","skipper.price3Tag","skipper.priceNote","skipper.ctaButton","skipper.transferNote"],
  retreat_offers: ["retreat.offersTag","retreat.offersTitle","retreat.offersSubtitle","retreat.offer1Title","retreat.offer1Text","retreat.offer1Button","retreat.offer2Title","retreat.offer2Text","retreat.offer2Button","retreat.offer3Title","retreat.offer3Text","retreat.offer3Button"],
  retreat_trainings: ["retreat.trainingsTag","retreat.trainingsTitle","retreat.trainingsSubtitle","retreat.trainingsText1","retreat.trainingsText2","retreat.trainingsFormatsTitle","retreat.trainingsFormats","retreat.altTrainings"],
  retreat_audience: ["retreat.audienceTag","retreat.audienceTitle","retreat.audienceText","retreat.audienceGroups","retreat.audienceOutro"],
  retreat_services: ["retreat.servicesTag","retreat.servicesTitle","retreat.servicesText","retreat.servicesList","retreat.servicesOutro"],
  retreat_concept: ["retreat.conceptTag","retreat.conceptTitle","retreat.conceptText1","retreat.conceptListTitle","retreat.conceptList","retreat.conceptText2","retreat.altConcept"],
  retreat_whyyacht: ["retreat.whyYachtTag","retreat.whyYachtTitle","retreat.whyYachtText","retreat.whyYachtQuestions","retreat.whyYachtOutro"],
  retreat_logistics: ["retreat.logisticsTag","retreat.logisticsTitle","retreat.logisticsText1","retreat.logisticsText2","retreat.logisticsText3","retreat.logisticsText4","retreat.logisticsAdvantagesTitle","retreat.logisticsAdvantages","retreat.logisticsOutro","retreat.altLogistics"],
  retreat_onboard: ["retreat.onboardTag","retreat.onboardTitle","retreat.onboardText1","retreat.onboardText2","retreat.onboardScheduleTitle","retreat.onboardSchedule","retreat.onboardOutro","retreat.altOnboard1","retreat.altOnboard2","retreat.altOnboard3"],
  retreat_safety: ["retreat.safetyTag","retreat.safetyTitle","retreat.safetyText1","retreat.safetyText2","retreat.safetyList","retreat.safetyOutro"],
  retreat_cost: ["retreat.costTag","retreat.costTitle","retreat.costText1","retreat.costText2","retreat.costListTitle","retreat.costList","retreat.costButton"],
  retreat_form: ["retreat.formTag","retreat.formTitle","retreat.formText","retreat.formName","retreat.formNamePlaceholder","retreat.formEmail","retreat.formEmailPlaceholder","retreat.formPhone","retreat.formPhonePlaceholder","retreat.formCommLang","retreat.formCommLangDe","retreat.formCommLangRu","retreat.formCommLangEn","retreat.formType","retreat.formTypePlaceholder","retreat.formTypeCaptain","retreat.formTypeHarbor","retreat.formTypeRetreat","retreat.formTypeTeam","retreat.formTypeLeadership","retreat.formTypeYachtEvent","retreat.formTypeOther","retreat.formPeriod","retreat.formPeriodPlaceholder","retreat.formParticipants","retreat.formParticipantsPlaceholder","retreat.formTopic","retreat.formTopicPlaceholder","retreat.formMessage","retreat.formMessagePlaceholder","retreat.formOptionalTitle","retreat.formDuration","retreat.formBerths","retreat.formBoatType","retreat.formPorts","retreat.formComfort","retreat.formBudget","retreat.formPrivacy","retreat.formSubmit","retreat.formSuccess","retreat.formError","retreat.formRequired","retreat.formPrivacyRequired"],
  retreat_final: ["retreat.finalTitle","retreat.finalText","retreat.finalButton","retreat.finalSecondary"],
  faq: ["faq.title","faq.subtitle","faq.moreQuestions","faq.contactText","faq.callButton","faq.emailButton","faq.q1","faq.a1","faq.q2","faq.a2","faq.q3","faq.a3","faq.q4","faq.a4","faq.q5","faq.a5","faq.q6","faq.a6","faq.q7","faq.a7","faq.q8","faq.a8","faq.q9","faq.a9","faq.q10","faq.a10"],
  testimonials: ["testimonials.title","testimonials.trainerTitle","testimonials.pontareaTitle","testimonials.viewAll","testimonials.review1","testimonials.review2","testimonials.review3","testimonials.review4","testimonials.review5","testimonials.review6"],
  contact: ["contact.title","contact.subtitle","contact.name","contact.phone","contact.email","contact.date","contact.course","contact.message","contact.submit","contact.success","contact.countryCode","contact.phoneNumber","contact.phonePlaceholder","contact.namePlaceholder","contact.emailPlaceholder","contact.datePlaceholder","contact.coursePlaceholder","contact.messagePlaceholder","contact.dateHafenApril","contact.dateKapitanMai","contact.dateHafenMai","contact.dateKapitanSept","contact.dateFlexibel","contact.courseKapitan","contact.courseHafen","contact.courseUnsure","contact.whatsappTitle","contact.whatsappDesc","contact.whatsappButton","contact.phoneTitle","contact.phoneDesc","contact.emailTitle","contact.emailDesc","contact.emailButton","contact.trustTitle","contact.trustDesc","contact.bogdanTitle","contact.bogdanDesc","contact.coursesOnSite","contact.bogdanOnSite"],
  footer: ["footer.company","footer.address","footer.email","footer.phone","footer.rights","footer.impressum","footer.datenschutz","footer.agb","footer.coursesOnSite","footer.description","footer.navTitle","footer.contactTitle","footer.legalTitle","footer.marinaName","footer.marinaCity"],
};

const CONTENT_FIELDS: Record<TabId, { field: string; label: string; multiline?: boolean }[]> = {
  instructor: [{field:"instructor.name",label:"Name"},{field:"instructor.role",label:"Rolle"},{field:"instructor.bio",label:"Bio",multiline:true},{field:"instructor.quote",label:"Zitat",multiline:true}],
  location: [{field:"location.name",label:"Marina Name"},{field:"location.country",label:"Land"},{field:"location.city",label:"Stadt"},{field:"location.description",label:"Beschreibung",multiline:true}],
  seo: [{field:"seo.title",label:"Seiten-Titel"},{field:"seo.description",label:"Meta-Beschreibung",multiline:true},{field:"seo.keywords",label:"Keywords"},{field:"logos.mainLogo",label:"Logo URL"},{field:"logos.favicon",label:"Favicon URL"},{field:"logos.ogImage",label:"OG Image URL"},{field:"contact.name",label:"Kontaktname"},{field:"contact.role",label:"Kontaktrolle"},{field:"contact.address",label:"Adresse"},{field:"contact.city",label:"PLZ & Stadt"},{field:"contact.email",label:"E-Mail"},{field:"contact.phone",label:"Telefon"},{field:"contact.whatsapp",label:"WhatsApp (nur Ziffern)"}],
  emailSettings: [{field:"emailSettings.subjectTemplate",label:"E-Mail Betreff Vorlage"},{field:"emailSettings.bodyTemplate",label:"E-Mail Body Vorlage",multiline:true}],
  retreat_images: [
    {field:"retreatImages.offer1",label:"Angebot 1 Bild (Kapitänskurs)"},
    {field:"retreatImages.offer2",label:"Angebot 2 Bild (Hafenmanöver)"},
    {field:"retreatImages.offer3",label:"Angebot 3 Bild (Retreats)"},
    {field:"retreatImages.trainings",label:"Trainings-Sektion Bild"},
    {field:"retreatImages.concept",label:"Konzept-Sektion Bild"},
    {field:"retreatImages.logistics",label:"Logistik-Sektion Bild"},
    {field:"retreatImages.onboard1",label:"An Bord Galerie Bild 1"},
    {field:"retreatImages.onboard2",label:"An Bord Galerie Bild 2"},
    {field:"retreatImages.onboard3",label:"An Bord Galerie Bild 3"},
  ],
  nav:[],hero:[],stats:[],courses_captain:[],courses_harbor:[],pricing:[],howitworks:[],schedule:[],skipper:[],faq:[],testimonials:[],contact:[],footer:[],
  retreat_offers:[],retreat_trainings:[],retreat_audience:[],retreat_services:[],retreat_concept:[],retreat_whyyacht:[],retreat_logistics:[],retreat_onboard:[],retreat_safety:[],retreat_cost:[],retreat_form:[],retreat_final:[],
};

const KEY_LABELS: Record<string, string> = {
  "nav.courses":"Kurse","nav.why":"Warum Pontarea?","nav.yacht":"Yacht-Miete","nav.skipper":"Skipperservice (Nav)","nav.faq":"FAQ","nav.contact":"Kontakt","nav.signup":"Anmelden Button","nav.retreats":"Retreats auf See (Nav)","nav.coaches":"Für Coaches & Unternehmen (Nav)",
  "skipper.sectionTag":"Kategorie-Tag","skipper.title":"Titel","skipper.subtitle":"Untertitel","skipper.includesTitle":"Abschnitt: Was ist inbegriffen?","skipper.item1Title":"Punkt 1 Titel","skipper.item1Desc":"Punkt 1 Beschreibung","skipper.item2Title":"Punkt 2 Titel","skipper.item2Desc":"Punkt 2 Beschreibung","skipper.item3Title":"Punkt 3 Titel","skipper.item3Desc":"Punkt 3 Beschreibung","skipper.item4Title":"Punkt 4 Titel","skipper.item4Desc":"Punkt 4 Beschreibung","skipper.priceTitle":"Preisstruktur Titel","skipper.price1Label":"Preis 1 Name","skipper.price1Desc":"Preis 1 Beschreibung","skipper.price1Tag":"Preis 1 Badge","skipper.price2Label":"Preis 2 Name","skipper.price2Desc":"Preis 2 Beschreibung","skipper.price2Tag":"Preis 2 Badge","skipper.price3Label":"Preis 3 Name","skipper.price3Desc":"Preis 3 Beschreibung","skipper.price3Tag":"Preis 3 Badge","skipper.priceNote":"Preishinweis","skipper.ctaButton":"Button Text","skipper.transferNote":"Transfer-Hinweis",
  "hero.badge":"Badge/Slogan","hero.title":"Haupttitel","hero.subtitle":"Untertitel",
  "courses.captain.price":"Preis Kapitänkurs","courses.captain.dates":"Termine Kapitänkurs (kommagetrennt)",
  "courses.harbor.price":"Preis Hafenmanöver","courses.harbor.dates":"Termine Hafenmanöver (kommagetrennt)",
  "faq.q1":"Frage 1","faq.a1":"Antwort 1","faq.q2":"Frage 2","faq.a2":"Antwort 2","faq.q3":"Frage 3","faq.a3":"Antwort 3","faq.q4":"Frage 4","faq.a4":"Antwort 4","faq.q5":"Frage 5","faq.a5":"Antwort 5","faq.q6":"Frage 6","faq.a6":"Antwort 6","faq.q7":"Frage 7","faq.a7":"Antwort 7","faq.q8":"Frage 8","faq.a8":"Antwort 8","faq.q9":"Frage 9","faq.a9":"Antwort 9","faq.q10":"Frage 10","faq.a10":"Antwort 10",
};

function getLabel(key: string): string {
  if (KEY_LABELS[key]) return KEY_LABELS[key];
  const last = key.split(".").pop() || key;
  return last.replace(/([A-Z])/g, " $1").replace(/^./, s => s.toUpperCase());
}

function isLongText(key: string): boolean {
  const longKeys = ["description","brief","detailed","text","para","intro","outro","body","bio","quote","note","a1","a2","a3","a4","a5","a6","a7","a8","a9","a10","bodyTemplate","statsDescription","day1Brief","day2Brief","day3Brief","day4Brief","day5Brief","day6Brief","day7Brief","day8Brief","day1Detailed","day2Detailed","day3Detailed","day4Detailed","day5Detailed","day6Detailed","day7Detailed","day8Detailed","trustDesc","bogdanDesc","emailDesc","phoneDesc","whatsappDesc","fearsDialogIntro","fearsDialogAfterText","kautionImportant","transparencyNote","transparencyLabel","summaryOptions"];
  const last = key.split(".").pop() || "";
  return longKeys.some(lk => last.toLowerCase().includes(lk.toLowerCase()));
}

// ────────────────────────────────────────────────────────────
//  Main Component
// ────────────────────────────────────────────────────────────
const AdminFullPage = () => {
  const [authState, setAuthState] = useState<"checking"|"login"|"authenticated">("checking");
  const [activeTab, setActiveTab] = useState<TabId>("hero");
  const [editLang, setEditLang] = useState<Lang>("de");
  const [saved, setSaved] = useState(false);

  const [translationsDE, setTranslationsDE] = useState<Record<string, any>>(() => loadTranslations("de"));
  const [translationsRU, setTranslationsRU] = useState<Record<string, any>>(() => loadTranslations("ru"));
  const [contentDE, setContentDE] = useState<Record<string, any>>(() => loadPontareaContent("de"));
  const [contentRU, setContentRU] = useState<Record<string, any>>(() => loadPontareaContent("ru"));

  // useCallback MUSS vor den frühen returns stehen (React Hook-Regel)
  const updateTranslation = useCallback(
    (key: string, value: string) =>
      (editLang === "de" ? setTranslationsDE : setTranslationsRU)(prev => setNested(prev, key, value)),
    [editLang]
  );
  const updateContent = useCallback(
    (path: string, value: string) =>
      (editLang === "de" ? setContentDE : setContentRU)(prev => setNested(prev, path, value)),
    [editLang]
  );

  useEffect(() => {
    const token = getStoredToken();
    if (!token) { setAuthState("login"); return; }
    apiVerify(token)
      .then(valid => setAuthState(valid ? "authenticated" : "login"))
      .catch(() => setAuthState("login"));
  }, []);

  if (authState === "checking") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="text-4xl animate-bounce">⛵</div>
          <p className="text-gray-400">Wird geladen…</p>
        </div>
      </div>
    );
  }

  if (authState === "login") {
    return <AdminLogin onSuccess={(token) => {
      localStorage.setItem(TOKEN_KEY, token);
      setAuthState("authenticated");
    }} />;
  }

  // ── Authenticated ──
  const translations = editLang === "de" ? translationsDE : translationsRU;
  const setTranslations = editLang === "de" ? setTranslationsDE : setTranslationsRU;
  const content = editLang === "de" ? contentDE : contentRU;
  const setContent = editLang === "de" ? setContentDE : setContentRU;
  const currentTab = TABS.find(t => t.id === activeTab)!;



  const handleSave = () => {
    saveTranslations("de", translationsDE);
    saveTranslations("ru", translationsRU);
    savePontareaContent("de", contentDE);
    savePontareaContent("ru", contentRU);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleReset = () => {
    if (!confirm("Alle Änderungen ZURÜCKSETZEN?")) return;
    ["de","ru"].forEach(l => { localStorage.removeItem(`translations_${l}`); localStorage.removeItem(`pontareaContent_${l}`); });
    setTranslationsDE({...BASE_TRANSLATIONS.de});
    setTranslationsRU({...BASE_TRANSLATIONS.ru});
    setContentDE(getDefaultPontareaContent());
    setContentRU(getDefaultPontareaContent());
  };

  const renderTranslationField = (key: string) => {
    const value = getNested(translations, key);
    return (
      <div key={key} className="mb-4">
        <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-1">
          {getLabel(key)}<span className="ml-2 font-normal text-white/25 normal-case">{key}</span>
        </label>
        {isLongText(key) ? (
          <Textarea value={value} onChange={e => updateTranslation(key, e.target.value)}
            className="bg-white/5 border-white/10 text-white placeholder:text-white/30 min-h-[80px] text-sm"
            rows={Math.max(3, Math.min(10, Math.ceil(value.length / 80)))} />
        ) : (
          <Input value={value} onChange={e => updateTranslation(key, e.target.value)}
            className="bg-white/5 border-white/10 text-white placeholder:text-white/30 text-sm" />
        )}
      </div>
    );
  };

  const renderContentField = (field: string, label: string, multiline = false) => {
    const value = getNested(content, field);
    return (
      <div key={field} className="mb-4">
        <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-1">
          {label}<span className="ml-2 font-normal text-white/25 normal-case">{field}</span>
        </label>
        {multiline ? (
          <Textarea value={value} onChange={e => updateContent(field, e.target.value)}
            className="bg-white/5 border-white/10 text-white placeholder:text-white/30 min-h-[80px] text-sm"
            rows={Math.max(3, Math.min(12, Math.ceil(value.length / 80)))} />
        ) : (
          <Input value={value} onChange={e => updateContent(field, e.target.value)}
            className="bg-white/5 border-white/10 text-white placeholder:text-white/30 text-sm" />
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <header className="border-b border-white/10 bg-black/30 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xl font-bold text-white">⚙️ Pontarea Admin</span>
            <span className="text-white/40 text-sm hidden sm:block">Alle Texte bearbeiten</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex rounded-lg overflow-hidden border border-white/20">
              <button onClick={() => setEditLang("de")} className={`px-3 py-1.5 text-sm font-semibold transition-colors ${editLang==="de"?"bg-blue-600 text-white":"bg-white/5 text-white/60 hover:bg-white/10"}`}>🇩🇪 DE</button>
              <button onClick={() => setEditLang("ru")} className={`px-3 py-1.5 text-sm font-semibold transition-colors ${editLang==="ru"?"bg-blue-600 text-white":"bg-white/5 text-white/60 hover:bg-white/10"}`}>🇷🇺 RU</button>
            </div>
            <Button onClick={handleSave} className={`transition-all ${saved?"bg-green-600 hover:bg-green-700":"bg-blue-600 hover:bg-blue-700"} text-white`}>
              {saved ? "✅ Gespeichert!" : "💾 Speichern"}
            </Button>
            <Button onClick={() => window.location.href="/"} variant="ghost" className="text-white/60 hover:text-white hidden sm:flex">← Website</Button>
            <Button onClick={handleReset} variant="ghost" className="text-red-400 hover:text-red-300" title="Zurücksetzen">🔄</Button>
            <Button onClick={() => { clearToken(); setAuthState("login"); }} variant="ghost" className="text-white/40 hover:text-white" title="Abmelden">🚪</Button>
          </div>
        </div>
      </header>

      <div className="bg-blue-900/40 border-b border-blue-700/30 px-4 py-2 text-center">
        <p className="text-blue-300 text-xs">
          Bearbeite Texte für <strong className="text-white">{editLang==="de"?"🇩🇪 Deutsch":"🇷🇺 Russisch"}</strong>.{" "}
          Klicke <strong>Speichern</strong> damit die Änderungen sofort sichtbar sind.
        </p>
      </div>

      <div className="max-w-7xl mx-auto flex min-h-[calc(100vh-8rem)]">
        <aside className="w-52 shrink-0 border-r border-white/10 bg-black/20 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto hidden lg:block">
          <nav className="p-3">
            <div className="text-xs text-white/30 font-semibold uppercase tracking-wider px-2 py-2 mt-2">Abschnitte</div>
            {TABS.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all mb-0.5 ${activeTab===tab.id?"bg-blue-600/60 text-white font-semibold":"text-white/60 hover:text-white hover:bg-white/5"}`}>
                {tab.label}
              </button>
            ))}
          </nav>
        </aside>

        <div className="lg:hidden border-b border-white/10 bg-black/10 w-full absolute">
          <div className="flex gap-1 overflow-x-auto px-4 py-2">
            {TABS.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${activeTab===tab.id?"bg-blue-600 text-white":"bg-white/10 text-white/60 hover:text-white"}`}>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-3xl">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white">{currentTab.label}</h2>
              <p className="text-white/50 text-sm mt-1">
                {currentTab.source==="translations" ? `Übersetzungen – ${editLang==="de"?"Deutsch":"Russisch"}` : "Website-Inhalte (für beide Sprachen)"}
              </p>
            </div>
            <div className="space-y-1">
              {currentTab.source==="translations"
                ? (TAB_KEYS[activeTab].length>0 ? TAB_KEYS[activeTab].map(key => renderTranslationField(key)) : <p className="text-white/40 text-sm">Keine Felder.</p>)
                : CONTENT_FIELDS[activeTab].map(f => renderContentField(f.field, f.label, f.multiline))
              }
            </div>
            <div className="mt-8 pt-6 border-t border-white/10">
              <Button onClick={handleSave} className={`w-full py-3 text-base font-semibold transition-all ${saved?"bg-green-600 hover:bg-green-700":"bg-blue-600 hover:bg-blue-700"}`}>
                {saved ? "✅ Änderungen gespeichert!" : "💾 Änderungen speichern"}
              </Button>
              <p className="text-center text-white/30 text-xs mt-2">Speichert ALLE Abschnitte beider Sprachen auf einmal</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminFullPage;
