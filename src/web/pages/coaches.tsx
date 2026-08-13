import { useState, useEffect } from "react";
import { Link } from "wouter";
import { useLanguage } from "../contexts/LanguageContext";
import { usePontareaContent } from "../hooks/usePontareaContent";
import { LanguageSwitcher } from "../components/LanguageSwitcher";

/** Split a CMS-editable newline list into trimmed items. */
const lines = (s: string): string[] =>
  (s || "").split("\n").map((x) => x.trim()).filter(Boolean);

const WHATSAPP_NUMBER = "491764443667";

/* ------------------------------------------------------------------ */
/* Floating WhatsApp button — visible across the whole page            */
/* ------------------------------------------------------------------ */
const FloatingWhatsApp = () => {
  const { t } = useLanguage();
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(t("coaches.whatsapp.prefill"))}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("coaches.whatsapp.label")}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-full bg-[#25D366] px-5 py-4 text-white shadow-2xl transition-transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[#25D366]/40"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 shrink-0" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.05-.52-.099-.148-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.564-.084 1.735-.709 1.98-1.394.246-.685.246-1.271.173-1.394-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
      </svg>
      <span className="hidden text-sm font-semibold sm:inline">{t("coaches.whatsapp.label")}</span>
    </a>
  );
};

/* ------------------------------------------------------------------ */
/* Inquiry form — Resend via /api/coaches-inquiry                      */
/* ------------------------------------------------------------------ */
type Status = "idle" | "sending" | "success" | "error";

const InquiryForm = () => {
  const { t, language } = useLanguage();
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const roles = lines(t("coaches.form.roleOptions"));
  const sizes = lines(t("coaches.form.groupSizeOptions"));
  const boats = lines(t("coaches.form.boatOptions"));
  const sailingOpts = lines(t("coaches.form.sailingOptions"));

  const [form, setForm] = useState({
    name: "",
    org: "",
    email: "",
    phone: "",
    role: "",
    formatType: "",
    groupSize: "",
    period: "",
    boat: "",
    sailing: "",
    message: "",
    privacy: false,
  });

  const set = (k: keyof typeof form) => (e: any) =>
    setForm((f) => ({ ...f, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.name.trim() || !form.email.trim() || !form.privacy) {
      setError(t("coaches.form.required"));
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/coaches-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, language }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus("success");
    } catch (err) {
      console.error("Inquiry failed:", err);
      setStatus("error");
      setError(t("coaches.form.errorText"));
    }
  };

  const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(t("coaches.whatsapp.prefill"))}`;

  if (status === "success") {
    return (
      <div className="rounded-3xl border-2 border-emerald-300 bg-emerald-50 p-10 text-center">
        <div className="mb-4 text-5xl">✅</div>
        <h3 className="mb-3 text-2xl font-bold text-gray-900">{t("coaches.form.successTitle")}</h3>
        <p className="text-gray-700">{t("coaches.form.successText")}</p>
      </div>
    );
  }

  const inputCls =
    "w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 transition-colors focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200";
  const labelCls = "mb-2 block text-sm font-semibold text-gray-700";

  return (
    <form onSubmit={submit} className="rounded-3xl border border-sky-200 bg-white p-8 shadow-lg sm:p-10">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label className={labelCls} htmlFor="c-name">{t("coaches.form.name")} *</label>
          <input id="c-name" required value={form.name} onChange={set("name")} className={inputCls} />
        </div>
        <div>
          <label className={labelCls} htmlFor="c-org">{t("coaches.form.org")}</label>
          <input id="c-org" value={form.org} onChange={set("org")} className={inputCls} />
        </div>
        <div>
          <label className={labelCls} htmlFor="c-email">{t("coaches.form.email")} *</label>
          <input id="c-email" type="email" required value={form.email} onChange={set("email")} className={inputCls} />
        </div>
        <div>
          <label className={labelCls} htmlFor="c-phone">{t("coaches.form.phone")}</label>
          <input id="c-phone" type="tel" value={form.phone} onChange={set("phone")} className={inputCls} />
        </div>
        <div>
          <label className={labelCls} htmlFor="c-role">{t("coaches.form.role")}</label>
          <select id="c-role" value={form.role} onChange={set("role")} className={inputCls}>
            <option value="">—</option>
            {roles.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
        <div>
          <label className={labelCls} htmlFor="c-size">{t("coaches.form.groupSize")}</label>
          <select id="c-size" value={form.groupSize} onChange={set("groupSize")} className={inputCls}>
            <option value="">—</option>
            {sizes.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className={labelCls} htmlFor="c-format">{t("coaches.form.formatLabel")}</label>
          <input
            id="c-format"
            value={form.formatType}
            onChange={set("formatType")}
            placeholder={t("coaches.form.formatPlaceholder")}
            className={inputCls}
          />
        </div>
        <div>
          <label className={labelCls} htmlFor="c-period">{t("coaches.form.period")}</label>
          <input
            id="c-period"
            value={form.period}
            onChange={set("period")}
            placeholder={t("coaches.form.periodPlaceholder")}
            className={inputCls}
          />
        </div>
        <div>
          <label className={labelCls} htmlFor="c-boat">{t("coaches.form.boatLabel")}</label>
          <select id="c-boat" value={form.boat} onChange={set("boat")} className={inputCls}>
            <option value="">—</option>
            {boats.map((b) => <option key={b} value={b}>{b}</option>)}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className={labelCls} htmlFor="c-sailing">{t("coaches.form.sailingLabel")}</label>
          <select id="c-sailing" value={form.sailing} onChange={set("sailing")} className={inputCls}>
            <option value="">—</option>
            {sailingOpts.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className={labelCls} htmlFor="c-msg">{t("coaches.form.message")}</label>
          <textarea
            id="c-msg"
            rows={5}
            value={form.message}
            onChange={set("message")}
            placeholder={t("coaches.form.messagePlaceholder")}
            className={inputCls}
          />
        </div>
      </div>

      <label className="mt-6 flex cursor-pointer items-start gap-3 text-sm text-gray-600">
        <input
          type="checkbox"
          required
          checked={form.privacy}
          onChange={set("privacy")}
          className="mt-1 h-5 w-5 shrink-0 rounded border-gray-300 text-sky-600 focus:ring-sky-500"
        />
        <span>
          {t("coaches.form.privacy")}{" "}
          <Link href="/datenschutz" className="text-sky-600 underline hover:text-sky-700">
            Datenschutz
          </Link>
        </span>
      </label>

      {error && (
        <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{error}</p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-8 w-full rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 py-4 text-lg font-bold text-white transition-all hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "sending" ? t("coaches.form.sending") : t("coaches.form.submit")}
      </button>

      <div className="mt-6 border-t border-gray-100 pt-6 text-center">
        <p className="mb-3 text-sm text-gray-500">{t("coaches.form.whatsappAlt")}</p>
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-xl border-2 border-[#25D366] px-6 py-3 font-semibold text-[#128C7E] transition-colors hover:bg-[#25D366]/10"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.05-.52-.099-.148-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.564-.084 1.735-.709 1.98-1.394.246-.685.246-1.271.173-1.394-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
          WhatsApp
        </a>
      </div>
    </form>
  );
};

/* ------------------------------------------------------------------ */
/* Small presentational helpers                                        */
/* ------------------------------------------------------------------ */
const Tag = ({ children }: { children: React.ReactNode }) => (
  <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-[0.3em] text-sky-600">
    {children}
  </span>
);

const CheckList = ({ items, cols = 2 }: { items: string[]; cols?: 1 | 2 }) => (
  <div className={`grid grid-cols-1 gap-x-8 gap-y-3 ${cols === 2 ? "sm:grid-cols-2" : ""}`}>
    {items.map((item, i) => (
      <div key={i} className="flex items-start gap-3">
        <span className="mt-1 shrink-0 text-sky-500">⛵</span>
        <span className="text-gray-700">{item}</span>
      </div>
    ))}
  </div>
);

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */
export default function CoachesPage() {
  const { t } = useLanguage();
  const content = usePontareaContent();
  const imgs: Record<string, string> = (content as any).coachesImages || {};

  // Page-specific SEO, restored on unmount so the SPA keeps landing metadata intact.
  useEffect(() => {
    const prevTitle = document.title;
    const descEl = document.querySelector('meta[name="description"]');
    const prevDesc = descEl?.getAttribute("content") || "";

    document.title = t("coaches.meta.title");
    descEl?.setAttribute("content", t("coaches.meta.description"));

    return () => {
      document.title = prevTitle;
      descEl?.setAttribute("content", prevDesc);
    };
  }, [t]);

  const scrollTo = (sel: string) => {
    document.querySelector(sel)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const navLinks = [
    { href: "#coaches-offer", label: t("coaches.nav.anchorOffer") },
    { href: "#coaches-sailing", label: t("coaches.nav.anchorSailing") },
    { href: "#coaches-process", label: t("coaches.nav.anchorProcess") },
    { href: "#coaches-costs", label: t("coaches.nav.anchorCosts") },
    { href: "#coaches-form", label: t("coaches.nav.anchorForm") },
  ];

  const onboardCards = [1, 2, 3, 4].map((i) => ({
    title: t(`coaches.onboard.card${i}Title`),
    desc: t(`coaches.onboard.card${i}Desc`),
  }));

  const steps = [1, 2, 3, 4, 5].map((i) => ({
    title: t(`coaches.process.step${i}Title`),
    desc: t(`coaches.process.step${i}Desc`),
  }));

  return (
    <div className="min-h-screen bg-white">
      <FloatingWhatsApp />

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-gray-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2 font-bold text-gray-900 transition-colors hover:text-sky-600">
            <span aria-hidden="true">←</span>
            <span className="text-sm sm:text-base">{t("coaches.nav.back")}</span>
          </Link>
          <nav className="hidden items-center gap-6 lg:flex">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => { e.preventDefault(); scrollTo(l.href); }}
                className="text-sm font-medium text-gray-600 transition-colors hover:text-sky-600"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <LanguageSwitcher />
        </div>
      </header>

      {/* 1. Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-sky-50 via-white to-white py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div>
              <Tag>{t("coaches.hero.tag")}</Tag>
              <h1 className="mb-5 text-4xl font-bold leading-tight text-gray-900 sm:text-5xl">
                {t("coaches.hero.title")}
              </h1>
              <p className="mb-5 text-xl font-medium text-sky-700">{t("coaches.hero.subtitle")}</p>
              <p className="mb-8 text-lg leading-relaxed text-gray-600">{t("coaches.hero.text")}</p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#coaches-form"
                  onClick={(e) => { e.preventDefault(); scrollTo("#coaches-form"); }}
                  className="rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 px-8 py-4 font-bold text-white transition-all hover:shadow-xl"
                >
                  {t("coaches.hero.ctaPrimary")}
                </a>
                <a
                  href="#coaches-process"
                  onClick={(e) => { e.preventDefault(); scrollTo("#coaches-process"); }}
                  className="rounded-2xl border-2 border-sky-500 px-8 py-4 font-semibold text-sky-600 transition-colors hover:bg-sky-50"
                >
                  {t("coaches.hero.ctaSecondary")}
                </a>
              </div>
            </div>
            <div className="overflow-hidden rounded-3xl shadow-2xl">
              <img
                src={imgs.hero || "/catamaran-retreat.webp"}
                alt={t("coaches.alt.hero")}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Ausgangslage */}
      <section id="coaches-context" className="py-20 sm:py-24">
        <div className="mx-auto max-w-5xl px-6">
          <Tag>{t("coaches.context.tag")}</Tag>
          <h2 className="mb-6 text-3xl font-bold text-gray-900 sm:text-4xl">{t("coaches.context.title")}</h2>
          <p className="mb-4 text-lg leading-relaxed text-gray-600">{t("coaches.context.text1")}</p>
          <p className="mb-10 text-lg leading-relaxed text-gray-600">{t("coaches.context.text2")}</p>
          <div className="rounded-3xl border border-sky-200 bg-sky-50 p-8">
            <CheckList items={lines(t("coaches.context.points"))} />
          </div>
        </div>
      </section>

      {/* 3. Das Angebot */}
      <section id="coaches-offer" className="bg-gray-50 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-14 text-center">
            <Tag>{t("coaches.offer.tag")}</Tag>
            <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">{t("coaches.offer.title")}</h2>
            <p className="mx-auto max-w-3xl text-lg text-sky-700">{t("coaches.offer.subtitle")}</p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-lg">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100 text-2xl">
                  {["⛵", "🧭", "📋"][i - 1]}
                </div>
                <h3 className="mb-3 text-xl font-bold text-gray-900">{t(`coaches.offer.card${i}Title`)}</h3>
                <p className="leading-relaxed text-gray-600">{t(`coaches.offer.card${i}Desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Zielgruppen */}
      <section id="coaches-audience" className="py-20 sm:py-24">
        <div className="mx-auto max-w-5xl px-6">
          <Tag>{t("coaches.audience.tag")}</Tag>
          <h2 className="mb-5 text-3xl font-bold text-gray-900 sm:text-4xl">{t("coaches.audience.title")}</h2>
          <p className="mb-10 text-lg leading-relaxed text-gray-600">{t("coaches.audience.text")}</p>
          <CheckList items={lines(t("coaches.audience.groups"))} />
        </div>
      </section>

      {/* 5. Formate */}
      <section id="coaches-formats" className="bg-gradient-to-b from-white via-sky-50 to-white py-20 sm:py-24">
        <div className="mx-auto max-w-5xl px-6">
          <Tag>{t("coaches.formats.tag")}</Tag>
          <h2 className="mb-5 text-3xl font-bold text-gray-900 sm:text-4xl">{t("coaches.formats.title")}</h2>
          <p className="mb-10 text-lg leading-relaxed text-gray-600">{t("coaches.formats.text")}</p>
          <div className="rounded-3xl border border-sky-200 bg-white p-8 shadow-sm">
            <CheckList items={lines(t("coaches.formats.list"))} />
          </div>
          <p className="mt-8 border-l-4 border-sky-400 pl-5 text-lg font-medium italic text-gray-700">
            {t("coaches.formats.note")}
          </p>
        </div>
      </section>

      {/* 6. Was Pontarea übernimmt */}
      <section id="coaches-handled" className="py-20 sm:py-24">
        <div className="mx-auto max-w-5xl px-6">
          <Tag>{t("coaches.handled.tag")}</Tag>
          <h2 className="mb-5 text-3xl font-bold text-gray-900 sm:text-4xl">{t("coaches.handled.title")}</h2>
          <p className="mb-10 text-lg leading-relaxed text-gray-600">{t("coaches.handled.text")}</p>
          <div className="rounded-3xl border border-gray-200 bg-gray-50 p-8">
            <CheckList items={lines(t("coaches.handled.list"))} />
          </div>
          <p className="mt-8 text-center text-xl font-bold text-sky-700">{t("coaches.handled.note")}</p>
        </div>
      </section>

      {/* 7. Segeln als Bonus — USP */}
      <section
        id="coaches-sailing"
        className="relative overflow-hidden bg-gradient-to-br from-sky-900 via-blue-900 to-sky-800 py-20 text-white sm:py-24"
      >
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="mb-4 inline-block rounded-full bg-amber-400/20 px-4 py-1.5 text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
                {t("coaches.sailing.tag")}
              </span>
              <h2 className="mb-5 text-3xl font-bold leading-tight sm:text-4xl">{t("coaches.sailing.title")}</h2>
              <p className="mb-6 text-xl font-medium text-amber-200">{t("coaches.sailing.subtitle")}</p>
              <p className="mb-4 text-lg leading-relaxed text-sky-100">{t("coaches.sailing.text1")}</p>
              <p className="text-lg leading-relaxed text-sky-100">{t("coaches.sailing.text2")}</p>
            </div>
            <div className="overflow-hidden rounded-3xl shadow-2xl">
              <img
                src={imgs.sailing || "/sailing-instructor-new.webp"}
                alt={t("coaches.alt.sailing")}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="mt-14 rounded-3xl border border-white/20 bg-white/10 p-8 backdrop-blur">
            <div className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
              {lines(t("coaches.sailing.list")).map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="mt-1 shrink-0 text-amber-300">✓</span>
                  <span className="text-sky-50">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="mt-10 text-center text-xl font-semibold text-amber-200">{t("coaches.sailing.note")}</p>
        </div>
      </section>

      {/* 8. Warum eine Yacht */}
      <section id="coaches-yacht" className="py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div className="overflow-hidden rounded-3xl shadow-xl lg:order-2">
              <img
                src={imgs.yacht || "/captain-helm_new_resized.webp"}
                alt={t("coaches.alt.yacht")}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="lg:order-1">
              <Tag>{t("coaches.yacht.tag")}</Tag>
              <h2 className="mb-5 text-3xl font-bold text-gray-900 sm:text-4xl">{t("coaches.yacht.title")}</h2>
              <p className="mb-8 text-lg leading-relaxed text-gray-600">{t("coaches.yacht.text")}</p>
              <CheckList items={lines(t("coaches.yacht.points"))} cols={1} />
            </div>
          </div>
        </div>
      </section>

      {/* 9. Ablauf */}
      <section id="coaches-process" className="bg-gray-50 py-20 sm:py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-14 text-center">
            <Tag>{t("coaches.process.tag")}</Tag>
            <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">{t("coaches.process.title")}</h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">{t("coaches.process.text")}</p>
          </div>
          <div className="space-y-6">
            {steps.map((s, i) => (
              <div key={i} className="flex gap-5 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-blue-600 text-lg font-bold text-white">
                  {i + 1}
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-bold text-gray-900">{s.title}</h3>
                  <p className="leading-relaxed text-gray-600">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Logistik */}
      <section id="coaches-logistics" className="py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div>
              <Tag>{t("coaches.logistics.tag")}</Tag>
              <h2 className="mb-5 text-3xl font-bold text-gray-900 sm:text-4xl">{t("coaches.logistics.title")}</h2>
              <p className="mb-4 text-lg leading-relaxed text-gray-600">{t("coaches.logistics.text1")}</p>
              <p className="text-lg leading-relaxed text-gray-600">{t("coaches.logistics.text2")}</p>
            </div>
            <div className="overflow-hidden rounded-3xl shadow-xl">
              <img
                src={imgs.logistics || "/marina-docking_resized.webp"}
                alt={t("coaches.alt.logistics")}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          <div className="mt-12 rounded-3xl border border-sky-200 bg-sky-50 p-8">
            <CheckList items={lines(t("coaches.logistics.list"))} />
          </div>
        </div>
      </section>

      {/* 11. Leben an Bord */}
      <section id="coaches-onboard" className="bg-gradient-to-b from-white via-sky-50 to-white py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-14 text-center">
            <Tag>{t("coaches.onboard.tag")}</Tag>
            <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">{t("coaches.onboard.title")}</h2>
            <p className="mx-auto max-w-3xl text-lg text-gray-600">{t("coaches.onboard.text")}</p>
          </div>
          <div className="mb-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {onboardCards.map((c, i) => (
              <div key={i} className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm">
                <h3 className="mb-3 text-lg font-bold text-gray-900">{c.title}</h3>
                <p className="leading-relaxed text-gray-600">{c.desc}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {["onboard1", "onboard2", "onboard3"].map((k, i) => (
              <div key={k} className="overflow-hidden rounded-2xl shadow-md">
                <img
                  src={imgs[k] || ["/harbor-maneuvers-new.webp", "/sailing-instructor-new.webp", "/catamaran-retreat.webp"][i]}
                  alt={t(`coaches.alt.${k}`)}
                  loading="lazy"
                  className="h-56 w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. Sicherheit */}
      <section id="coaches-safety" className="py-20 sm:py-24">
        <div className="mx-auto max-w-5xl px-6">
          <Tag>{t("coaches.safety.tag")}</Tag>
          <h2 className="mb-5 text-3xl font-bold text-gray-900 sm:text-4xl">{t("coaches.safety.title")}</h2>
          <p className="mb-10 text-lg leading-relaxed text-gray-600">{t("coaches.safety.text")}</p>
          <div className="rounded-3xl border-2 border-emerald-200 bg-emerald-50 p-8">
            <div className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
              {lines(t("coaches.safety.list")).map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="mt-1 shrink-0 text-emerald-600">✓</span>
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <p className="mt-8 border-l-4 border-emerald-400 pl-5 leading-relaxed text-gray-700">
            {t("coaches.safety.note")}
          </p>
        </div>
      </section>

      {/* 13. Kosten */}
      <section id="coaches-costs" className="bg-gray-50 py-20 sm:py-24">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center">
            <Tag>{t("coaches.costs.tag")}</Tag>
            <h2 className="mb-5 text-3xl font-bold text-gray-900 sm:text-4xl">{t("coaches.costs.title")}</h2>
            <p className="mb-12 text-lg leading-relaxed text-gray-600">{t("coaches.costs.text")}</p>
          </div>
          <div className="rounded-3xl border border-sky-200 bg-white p-8 shadow-lg sm:p-10">
            <h3 className="mb-6 text-xl font-bold text-gray-900">{t("coaches.costs.includesTitle")}</h3>
            <CheckList items={lines(t("coaches.costs.includes"))} />
            <p className="mt-8 rounded-2xl bg-sky-50 p-5 text-gray-700">{t("coaches.costs.note")}</p>
            <a
              href="#coaches-form"
              onClick={(e) => { e.preventDefault(); scrollTo("#coaches-form"); }}
              className="mt-8 block w-full rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 py-4 text-center font-bold text-white transition-all hover:shadow-xl"
            >
              {t("coaches.costs.button")}
            </a>
          </div>
        </div>
      </section>

      {/* 14. Anfrageformular */}
      <section id="coaches-form" className="py-20 sm:py-24">
        <div className="mx-auto max-w-3xl px-6">
          <div className="mb-12 text-center">
            <Tag>{t("coaches.form.tag")}</Tag>
            <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">{t("coaches.form.title")}</h2>
            <p className="text-lg text-gray-600">{t("coaches.form.text")}</p>
          </div>
          <InquiryForm />
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-br from-sky-900 via-blue-900 to-sky-800 py-20 text-center text-white">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="mb-5 text-3xl font-bold sm:text-4xl">{t("coaches.final.title")}</h2>
          <p className="mb-10 text-lg leading-relaxed text-sky-100">{t("coaches.final.text")}</p>
          <a
            href="#coaches-form"
            onClick={(e) => { e.preventDefault(); scrollTo("#coaches-form"); }}
            className="inline-block rounded-2xl bg-gradient-to-r from-amber-400 to-amber-300 px-10 py-4 font-bold text-gray-900 transition-all hover:shadow-2xl"
          >
            {t("coaches.final.button")}
          </a>
          <p className="mt-6 text-sky-200">
            <a href="mailto:info@pontarea.de" className="underline transition-colors hover:text-white">
              {t("coaches.final.secondary")}
            </a>
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-10 text-center text-gray-400">
        <div className="mx-auto max-w-6xl px-6">
          <p className="mb-4 font-semibold text-white">Pontarea – Yachting, Training &amp; Events</p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <Link href="/" className="transition-colors hover:text-sky-400">{t("coaches.nav.back")}</Link>
            <Link href="/impressum" className="transition-colors hover:text-sky-400">Impressum</Link>
            <Link href="/agb" className="transition-colors hover:text-sky-400">AGB</Link>
            <Link href="/datenschutz" className="transition-colors hover:text-sky-400">Datenschutz</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
