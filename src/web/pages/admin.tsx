import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ContentData {
  [key: string]: any;
}

const AdminPanel = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [content, setContent] = useState<ContentData>({});
  const [saveMessage, setSaveMessage] = useState("");
  const [activeTab, setActiveTab] = useState("hero");

  const ADMIN_PASSWORD = "mentor2026";

  useEffect(() => {
    const savedContent = localStorage.getItem("mentorContent");
    if (savedContent) {
      setContent(JSON.parse(savedContent));
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setPassword("");
    } else {
      alert("Неверный пароль!");
    }
  };

  const handleSave = () => {
    localStorage.setItem("mentorContent", JSON.stringify(content));
    setSaveMessage("Сохранено");
    setTimeout(() => setSaveMessage(""), 2000);
  };

  const updateContent = (section: string, field: string, value: string) => {
    setContent((prev: any) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const tabs = [
    { id: "hero", label: "Hero", icon: "✦" },
    { id: "courses", label: "Kurse", icon: "◈" },
    { id: "instructor", label: "Trainer", icon: "◉" },
    { id: "about", label: "Über uns", icon: "◎" },
    { id: "impressum", label: "Impressum", icon: "◇" },
  ];

  // Login Screen - Apple Style
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white flex items-center justify-center relative overflow-hidden">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-purple-500/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-blue-500/30 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#d4a853]/20 rounded-full blur-[150px]" />
        
        <div className="relative z-10 w-full max-w-md px-8">
          {/* Logo */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-sky/10 mb-6">
              <span className="text-3xl">⛵</span>
            </div>
            <h1 className="text-4xl font-semibold text-gray-800 tracking-tight">
              Admin Panel
            </h1>
            <p className="text-gray-800/40 mt-2 text-lg">Mentor in Boat</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="relative">
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Passwort eingeben"
                className="w-full h-14 bg-sky-50 backdrop-blur-xl border-sky/10 rounded-2xl text-gray-800 text-center text-lg placeholder:text-gray-800/30 focus:border-[#d4a853]/50 focus:ring-[#d4a853]/20 transition-all duration-300"
              />
            </div>
            <Button
              type="submit"
              className="w-full h-14 bg-gradient-to-r from-[#d4a853] to-[#e8c476] text-black font-semibold text-lg rounded-2xl hover:opacity-90 transition-all duration-300 shadow-[0_0_40px_rgba(212,168,83,0.3)]"
            >
              Anmelden
            </Button>
          </form>
        </div>
      </div>
    );
  }

  // Main Admin Panel - Apple Style
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white text-gray-800">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[150px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#d4a853]/10 rounded-full blur-[200px]" />
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-sky-50 to-white/50 backdrop-blur-xl border-b border-sky/5">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">⛵</span>
            <span className="font-semibold text-lg">Admin</span>
          </div>
          
          <div className="flex items-center gap-4">
            {saveMessage && (
              <span className="text-[#d4a853] text-sm animate-pulse">
                ✓ {saveMessage}
              </span>
            )}
            <Button
              onClick={handleSave}
              className="h-10 px-6 bg-[#d4a853] text-black font-medium rounded-full hover:bg-[#e8c476] transition-all duration-300"
            >
              Speichern
            </Button>
            <Button
              onClick={() => window.location.href = "/"}
              variant="ghost"
              className="h-10 px-4 text-gray-800/60 hover:text-gray-800 hover:bg-sky-50 rounded-full"
            >
              Website →
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 pt-24 pb-12 px-6">
        <div className="max-w-6xl mx-auto">
          
          {/* Navigation Tabs */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex bg-sky-50 backdrop-blur-xl rounded-2xl p-1.5 border border-sky/10">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 rounded-xl font-medium text-sm transition-all duration-300 flex items-center gap-2 ${
                    activeTab === tab.id
                      ? "bg-white text-black shadow-lg"
                      : "text-gray-800/60 hover:text-gray-800"
                  }`}
                >
                  <span className="text-xs">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Content Panels */}
          <div className="space-y-8">
            
            {/* HERO TAB */}
            {activeTab === "hero" && (
              <div className="animate-fadeIn">
                <div className="text-center mb-10">
                  <h2 className="text-5xl font-semibold tracking-tight mb-3">Hero Bereich</h2>
                  <p className="text-gray-800/40 text-lg">Der erste Eindruck zählt</p>
                </div>
                
                <div className="grid gap-6 max-w-3xl mx-auto">
                  <GlassCard>
                    <label className="text-gray-800/40 text-xs uppercase tracking-wider mb-2 block">Kleiner Text</label>
                    <Input
                      value={content.hero?.smallText || "SEGELN LERNEN"}
                      onChange={(e) => updateContent("hero", "smallText", e.target.value)}
                      className="bg-transparent border-0 border-b border-sky/10 rounded-none text-xl font-light focus:border-[#d4a853] transition-colors px-0 h-12"
                    />
                  </GlassCard>
                  
                  <GlassCard>
                    <label className="text-gray-800/40 text-xs uppercase tracking-wider mb-2 block">Titel</label>
                    <Input
                      value={content.hero?.title || "MENTOR IN BOAT"}
                      onChange={(e) => updateContent("hero", "title", e.target.value)}
                      className="bg-transparent border-0 border-b border-sky/10 rounded-none text-3xl font-semibold focus:border-[#d4a853] transition-colors px-0 h-14"
                    />
                  </GlassCard>
                  
                  <GlassCard>
                    <label className="text-gray-800/40 text-xs uppercase tracking-wider mb-2 block">Untertitel</label>
                    <Input
                      value={content.hero?.subtitle || "Kapitänkurse in Kroatien"}
                      onChange={(e) => updateContent("hero", "subtitle", e.target.value)}
                      className="bg-transparent border-0 border-b border-sky/10 rounded-none text-xl text-[#d4a853] focus:border-[#d4a853] transition-colors px-0 h-12"
                    />
                  </GlassCard>
                  
                  <GlassCard>
                    <label className="text-gray-800/40 text-xs uppercase tracking-wider mb-2 block">Beschreibung</label>
                    <textarea
                      value={content.hero?.description || "Die Kurse sind für all diejenigen..."}
                      onChange={(e) => updateContent("hero", "description", e.target.value)}
                      className="w-full bg-transparent border-0 border-b border-sky/10 text-lg font-light text-gray-800/80 focus:border-[#d4a853] transition-colors resize-none h-32 focus:outline-none"
                    />
                  </GlassCard>
                </div>
              </div>
            )}

            {/* COURSES TAB */}
            {activeTab === "courses" && (
              <div className="animate-fadeIn">
                <div className="text-center mb-10">
                  <h2 className="text-5xl font-semibold tracking-tight mb-3">Kurse</h2>
                  <p className="text-gray-800/40 text-lg">Ihre Angebote verwalten</p>
                </div>
                
                <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
                  {/* Course 1 */}
                  <GlassCard className="p-8">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#d4a853] to-[#e8c476] flex items-center justify-center">
                        <span className="text-black text-xl">1</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">Kapitänkurs</h3>
                        <p className="text-gray-800/40 text-sm">Skipper-Lizenz</p>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      <div>
                        <label className="text-gray-800/40 text-xs uppercase tracking-wider mb-2 block">Titel</label>
                        <Input
                          value={content.course1?.title || "Kapitänkurs Skipper-Lizenz"}
                          onChange={(e) => updateContent("course1", "title", e.target.value)}
                          className="bg-sky-50 border-sky/10 rounded-xl h-12"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-gray-800/40 text-xs uppercase tracking-wider mb-2 block">Preis</label>
                          <Input
                            value={content.course1?.price || "ab €1.500"}
                            onChange={(e) => updateContent("course1", "price", e.target.value)}
                            className="bg-sky-50 border-sky/10 rounded-xl h-12 text-[#d4a853]"
                          />
                        </div>
                        <div>
                          <label className="text-gray-800/40 text-xs uppercase tracking-wider mb-2 block">Termine</label>
                          <Input
                            value={content.course1?.dates || "02.05.2026"}
                            onChange={(e) => updateContent("course1", "dates", e.target.value)}
                            className="bg-sky-50 border-sky/10 rounded-xl h-12"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-gray-800/40 text-xs uppercase tracking-wider mb-2 block">Beschreibung</label>
                        <textarea
                          value={content.course1?.description || "Intensiver Wochenkurs..."}
                          onChange={(e) => updateContent("course1", "description", e.target.value)}
                          className="w-full bg-sky-50 border border-sky/10 rounded-xl p-4 text-gray-800/80 resize-none h-24 focus:outline-none focus:border-[#d4a853]"
                        />
                      </div>
                    </div>
                  </GlassCard>

                  {/* Course 2 */}
                  <GlassCard className="p-8">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                        <span className="text-gray-800 text-xl">2</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">Hafenmanöver</h3>
                        <p className="text-gray-800/40 text-sm">Aufbaukurs</p>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      <div>
                        <label className="text-gray-800/40 text-xs uppercase tracking-wider mb-2 block">Titel</label>
                        <Input
                          value={content.course2?.title || "Aufbaukurs Hafenmanöver"}
                          onChange={(e) => updateContent("course2", "title", e.target.value)}
                          className="bg-sky-50 border-sky/10 rounded-xl h-12"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-gray-800/40 text-xs uppercase tracking-wider mb-2 block">Preis</label>
                          <Input
                            value={content.course2?.price || "ab €1.600"}
                            onChange={(e) => updateContent("course2", "price", e.target.value)}
                            className="bg-sky-50 border-sky/10 rounded-xl h-12 text-[#d4a853]"
                          />
                        </div>
                        <div>
                          <label className="text-gray-800/40 text-xs uppercase tracking-wider mb-2 block">Termine</label>
                          <Input
                            value={content.course2?.dates || "09.05.2026"}
                            onChange={(e) => updateContent("course2", "dates", e.target.value)}
                            className="bg-sky-50 border-sky/10 rounded-xl h-12"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-gray-800/40 text-xs uppercase tracking-wider mb-2 block">Beschreibung</label>
                        <textarea
                          value={content.course2?.description || "Perfektionieren Sie..."}
                          onChange={(e) => updateContent("course2", "description", e.target.value)}
                          className="w-full bg-sky-50 border border-sky/10 rounded-xl p-4 text-gray-800/80 resize-none h-24 focus:outline-none focus:border-[#d4a853]"
                        />
                      </div>
                    </div>
                  </GlassCard>
                </div>
              </div>
            )}

            {/* INSTRUCTOR TAB */}
            {activeTab === "instructor" && (
              <div className="animate-fadeIn">
                <div className="text-center mb-10">
                  <h2 className="text-5xl font-semibold tracking-tight mb-3">Trainer</h2>
                  <p className="text-gray-800/40 text-lg">Ihr Profil bearbeiten</p>
                </div>
                
                <div className="max-w-3xl mx-auto">
                  <GlassCard className="p-10">
                    <div className="flex items-center gap-6 mb-10">
                      <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[#d4a853]/20 to-[#d4a853]/5 border border-[#d4a853]/20 flex items-center justify-center">
                        <span className="text-4xl">👨‍✈️</span>
                      </div>
                      <div>
                        <h3 className="text-2xl font-semibold">Ihr Profil</h3>
                        <p className="text-gray-800/40">Biografie und Zitat</p>
                      </div>
                    </div>
                    
                    <div className="space-y-8">
                      <div>
                        <label className="text-gray-800/40 text-xs uppercase tracking-wider mb-3 block">Biografie</label>
                        <textarea
                          value={content.instructor?.bio || "Als erfahrener Segellehrer..."}
                          onChange={(e) => updateContent("instructor", "bio", e.target.value)}
                          className="w-full bg-sky-50 border border-sky/10 rounded-2xl p-6 text-lg text-gray-800/80 resize-none h-40 focus:outline-none focus:border-[#d4a853] transition-colors"
                        />
                      </div>
                      <div>
                        <label className="text-gray-800/40 text-xs uppercase tracking-wider mb-3 block">Zitat</label>
                        <div className="relative">
                          <span className="absolute -top-2 -left-2 text-6xl text-[#d4a853]/20">"</span>
                          <textarea
                            value={content.instructor?.quote || "Segeln ist mehr als..."}
                            onChange={(e) => updateContent("instructor", "quote", e.target.value)}
                            className="w-full bg-sky-50 border border-sky/10 rounded-2xl p-6 pl-10 text-xl italic text-gray-800/60 resize-none h-32 focus:outline-none focus:border-[#d4a853] transition-colors"
                          />
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                </div>
              </div>
            )}

            {/* ABOUT TAB */}
            {activeTab === "about" && (
              <div className="animate-fadeIn">
                <div className="text-center mb-10">
                  <h2 className="text-5xl font-semibold tracking-tight mb-3">Über uns</h2>
                  <p className="text-gray-800/40 text-lg">Ihre Geschichte erzählen</p>
                </div>
                
                <div className="max-w-3xl mx-auto">
                  <GlassCard className="p-10">
                    <label className="text-gray-800/40 text-xs uppercase tracking-wider mb-4 block">Haupttext</label>
                    <textarea
                      value={content.about?.text || "Als Ihr Mentor bringe ich..."}
                      onChange={(e) => updateContent("about", "text", e.target.value)}
                      className="w-full bg-transparent border-0 border-b border-sky/10 text-xl font-light text-gray-800/80 resize-none h-48 focus:outline-none focus:border-[#d4a853] transition-colors leading-relaxed"
                    />
                  </GlassCard>
                </div>
              </div>
            )}

            {/* IMPRESSUM TAB */}
            {activeTab === "impressum" && (
              <div className="animate-fadeIn">
                <div className="text-center mb-10">
                  <h2 className="text-5xl font-semibold tracking-tight mb-3">Impressum</h2>
                  <p className="text-gray-800/40 text-lg">Rechtliche Informationen</p>
                </div>
                
                <div className="max-w-4xl mx-auto space-y-8">
                  {/* Contact Info */}
                  <GlassCard className="p-8">
                    <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
                      <span className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">📍</span>
                      Kontaktdaten
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="text-gray-800/40 text-xs uppercase tracking-wider mb-2 block">Name / Firma</label>
                        <Input
                          value={content.impressum?.contactName || "Bogdan Zambrovskij"}
                          onChange={(e) => updateContent("impressum", "contactName", e.target.value)}
                          className="bg-sky-50 border-sky/10 rounded-xl h-12"
                        />
                      </div>
                      <div>
                        <label className="text-gray-800/40 text-xs uppercase tracking-wider mb-2 block">E-Mail</label>
                        <Input
                          value={content.impressum?.email || "info@pontarea.de"}
                          onChange={(e) => updateContent("impressum", "email", e.target.value)}
                          className="bg-sky-50 border-sky/10 rounded-xl h-12"
                        />
                      </div>
                      <div>
                        <label className="text-gray-800/40 text-xs uppercase tracking-wider mb-2 block">Telefon / WhatsApp</label>
                        <Input
                          value={content.impressum?.phone || "+49 176 44437667"}
                          onChange={(e) => updateContent("impressum", "phone", e.target.value)}
                          className="bg-sky-50 border-sky/10 rounded-xl h-12"
                        />
                      </div>
                      <div>
                        <label className="text-gray-800/40 text-xs uppercase tracking-wider mb-2 block">Adresse</label>
                        <Input
                          value={content.impressum?.address || "Marina Dalmacija, Sukošan, Kroatien"}
                          onChange={(e) => updateContent("impressum", "address", e.target.value)}
                          className="bg-sky-50 border-sky/10 rounded-xl h-12"
                        />
                      </div>
                    </div>
                  </GlassCard>

                  {/* Juleica */}
                  <GlassCard className="p-8">
                    <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
                      <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#d4a853]/20 to-[#d4a853]/5 flex items-center justify-center">🎖️</span>
                      Jugendleiter (Juleica)
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="text-gray-800/40 text-xs uppercase tracking-wider mb-2 block">Ausgestellt am</label>
                        <Input
                          type="date"
                          value={content.impressum?.juleicaDate || "2025-08-06"}
                          onChange={(e) => updateContent("impressum", "juleicaDate", e.target.value)}
                          className="bg-sky-50 border-sky/10 rounded-xl h-12"
                        />
                      </div>
                      <div>
                        <label className="text-gray-800/40 text-xs uppercase tracking-wider mb-2 block">Ausgestellt durch</label>
                        <Input
                          value={content.impressum?.juleicaIssuedBy || "Bayerischer Jugendring (K.d.ö.R.)"}
                          onChange={(e) => updateContent("impressum", "juleicaIssuedBy", e.target.value)}
                          className="bg-sky-50 border-sky/10 rounded-xl h-12"
                        />
                      </div>
                      <div>
                        <label className="text-gray-800/40 text-xs uppercase tracking-wider mb-2 block">Gültig bis</label>
                        <Input
                          value={content.impressum?.juleicaValidUntil || "Ende August 2028"}
                          onChange={(e) => updateContent("impressum", "juleicaValidUntil", e.target.value)}
                          className="bg-sky-50 border-sky/10 rounded-xl h-12"
                        />
                      </div>
                      <div>
                        <label className="text-gray-800/40 text-xs uppercase tracking-wider mb-2 block">Beschreibung</label>
                        <Input
                          value={content.impressum?.juleicaDescription || "Bescheinigung über in der Jugendarbeit erworbene Qualifikationen"}
                          onChange={(e) => updateContent("impressum", "juleicaDescription", e.target.value)}
                          className="bg-sky-50 border-sky/10 rounded-xl h-12"
                        />
                      </div>
                    </div>
                  </GlassCard>

                  {/* Verfahrensbeistand */}
                  <GlassCard className="p-8">
                    <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
                      <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-500/5 flex items-center justify-center">⚖️</span>
                      Zertifizierter Verfahrensbeistand
                    </h3>
                    <p className="text-gray-800/40 text-sm mb-6">nach § 158 FamFG</p>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="text-gray-800/40 text-xs uppercase tracking-wider mb-2 block">Ausgestellt am</label>
                        <Input
                          type="date"
                          value={content.impressum?.verfahrenDate || "2025-08-13"}
                          onChange={(e) => updateContent("impressum", "verfahrenDate", e.target.value)}
                          className="bg-sky-50 border-sky/10 rounded-xl h-12"
                        />
                      </div>
                      <div>
                        <label className="text-gray-800/40 text-xs uppercase tracking-wider mb-2 block">Ausgestellt durch</label>
                        <Input
                          value={content.impressum?.verfahrenIssuedBy || "Investment Zukunft"}
                          onChange={(e) => updateContent("impressum", "verfahrenIssuedBy", e.target.value)}
                          className="bg-sky-50 border-sky/10 rounded-xl h-12"
                        />
                      </div>
                      <div>
                        <label className="text-gray-800/40 text-xs uppercase tracking-wider mb-2 block">Gültig bis</label>
                        <Input
                          type="date"
                          value={content.impressum?.verfahrenValidUntil || "2025-08-13"}
                          onChange={(e) => updateContent("impressum", "verfahrenValidUntil", e.target.value)}
                          className="bg-sky-50 border-sky/10 rounded-xl h-12"
                        />
                      </div>
                      <div>
                        <label className="text-gray-800/40 text-xs uppercase tracking-wider mb-2 block">Unterrichtsstunden</label>
                        <Input
                          value={content.impressum?.verfahrenHours || "258"}
                          onChange={(e) => updateContent("impressum", "verfahrenHours", e.target.value)}
                          className="bg-sky-50 border-sky/10 rounded-xl h-12"
                        />
                      </div>
                    </div>
                    <div className="mt-6">
                      <label className="text-gray-800/40 text-xs uppercase tracking-wider mb-2 block">Beschreibung</label>
                      <textarea
                        value={content.impressum?.verfahrenDescription || "Zertifizierte Ausbildung zum Verfahrensbeistand mit bestandener Abschlussprüfung"}
                        onChange={(e) => updateContent("impressum", "verfahrenDescription", e.target.value)}
                        className="w-full bg-sky-50 border border-sky/10 rounded-xl p-4 text-gray-800/80 resize-none h-24 focus:outline-none focus:border-[#d4a853]"
                      />
                    </div>
                  </GlassCard>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* CSS for animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

// Glass Card Component
const GlassCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-sky-50 backdrop-blur-xl border border-sky/10 rounded-3xl p-6 ${className}`}>
    {children}
  </div>
);

export default AdminPanel;
