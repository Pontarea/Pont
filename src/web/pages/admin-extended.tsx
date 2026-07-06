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
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showExport, setShowExport] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const ADMIN_PASSWORD = "pontarea2026";

  useEffect(() => {
    const savedContent = localStorage.getItem("pontareaContent");
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
      alert("❌ Неверный пароль!");
    }
  };

  const handleSave = () => {
    localStorage.setItem("pontareaContent", JSON.stringify(content));
    setSaveMessage("✓ Сохранено успешно!");
    setTimeout(() => setSaveMessage(""), 2000);
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(content, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `pontarea-backup-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const imported = JSON.parse(event.target?.result as string);
          setContent(imported);
          localStorage.setItem("pontareaContent", JSON.stringify(imported));
          setSaveMessage("✓ Импорт успешен!");
          setTimeout(() => setSaveMessage(""), 2000);
        } catch (err) {
          alert("❌ Ошибка при импорте файла");
        }
      };
      reader.readAsText(file);
    }
  };

  const updateContent = (section: string, field: string, value: string | number | boolean) => {
    setContent((prev: any) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const addItem = (section: string, item: string) => {
    setContent((prev: any) => ({
      ...prev,
      [section]: [...(prev[section] || []), item],
    }));
  };

  const removeItem = (section: string, index: number) => {
    setContent((prev: any) => ({
      ...prev,
      [section]: prev[section].filter((_: any, i: number) => i !== index),
    }));
  };

  const tabs = [
    { id: "dashboard", label: "📊 Dashboard", icon: "▌" },
    { id: "hero", label: "🎯 Hero", icon: "✦" },
    { id: "courses", label: "⛵ Курсы", icon: "◈" },
    { id: "instructor", label: "👨‍🏫 Тренер", icon: "◉" },
    { id: "faq", label: "❓ FAQ", icon: "◎" },
    { id: "contact", label: "📞 Контакт", icon: "◇" },
    { id: "settings", label: "⚙️ Настройки", icon: "☰" },
  ];

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white flex items-center justify-center relative overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-purple-500/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-blue-500/30 rounded-full blur-[120px]" />
        
        <div className="relative z-10 w-full max-w-md px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-sky-400 to-blue-600 mb-6">
              <span className="text-3xl">⛵</span>
            </div>
            <h1 className="text-4xl font-bold text-gray-800 tracking-tight">
              Pontarea Admin
            </h1>
            <p className="text-gray-600 mt-2 text-lg">Управление сайтом</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="🔐 Пароль"
                className="w-full h-14 bg-sky-50 border border-sky-200 rounded-2xl text-gray-800 text-center text-lg placeholder:text-gray-400 focus:border-sky-400 focus:ring-2 focus:ring-sky-200"
                autoFocus
              />
            </div>
            <Button
              type="submit"
              className="w-full h-14 bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold text-lg rounded-2xl hover:shadow-lg transition-all"
            >
              Вход
            </Button>
          </form>

          <p className="text-gray-500 text-sm text-center mt-8">
            © 2026 Pontarea Admin Panel
          </p>
        </div>
      </div>
    );
  }

  // Main Admin Panel
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white text-gray-800">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-sky-200">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center">
              <span className="text-lg">⛵</span>
            </div>
            <div>
              <h1 className="font-bold text-lg">Pontarea Admin</h1>
              <p className="text-xs text-gray-500">Управление контентом</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {saveMessage && (
              <span className="text-green-600 text-sm font-medium animate-pulse">
                {saveMessage}
              </span>
            )}
            <Button
              onClick={handleSave}
              className="h-10 px-6 bg-green-500 text-white font-medium rounded-full hover:bg-green-600 transition-all"
            >
              💾 Сохранить
            </Button>
            <Button
              onClick={() => setShowExport(!showExport)}
              className="h-10 px-6 bg-blue-500 text-white font-medium rounded-full hover:bg-blue-600 transition-all"
            >
              📥 Копия
            </Button>
            <Button
              onClick={() => window.location.href = "/"}
              variant="ghost"
              className="h-10 px-4 text-gray-600 hover:bg-sky-100 rounded-full"
            >
              🌐 Сайт
            </Button>
            <Button
              onClick={() => {
                localStorage.removeItem("pontareaContent");
                setIsAuthenticated(false);
              }}
              variant="ghost"
              className="h-10 px-4 text-red-600 hover:bg-red-100 rounded-full"
            >
              🚪 Выход
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="pt-20 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          
          {/* Navigation Tabs */}
          <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-xl font-medium text-sm whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? "bg-sky-500 text-white shadow-lg"
                    : "bg-white text-gray-600 border border-sky-200 hover:border-sky-400"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Export/Import Panel */}
          {showExport && (
            <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6 mb-8">
              <h3 className="text-lg font-bold mb-4">📦 Резервная копия</h3>
              <div className="flex gap-4">
                <Button
                  onClick={handleExport}
                  className="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600"
                >
                  ⬇️ Скачать JSON
                </Button>
                <label className="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 cursor-pointer flex items-center gap-2">
                  ⬆️ Загрузить JSON
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImport}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          )}

          {/* DASHBOARD TAB */}
          {activeTab === "dashboard" && (
            <div className="grid md:grid-cols-3 gap-6">
              <StatCard title="👥 Посетители" value="1,234" subtitle="за последний месяц" />
              <StatCard title="📧 Заявки" value={`${Object.keys(content.contacts || {}).length}`} subtitle="всего контактов" />
              <StatCard title="⛵ Курсы" value="2" subtitle="активных курсов" />
            </div>
          )}

          {/* HERO TAB */}
          {activeTab === "hero" && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold mb-6">🎯 Главный раздел</h2>
              
              <GlassCard>
                <label className="block text-sm font-semibold mb-2">Заголовок</label>
                <Input
                  value={content.hero?.title || "PONTAREA"}
                  onChange={(e) => updateContent("hero", "title", e.target.value)}
                  className="w-full h-12 rounded-xl border border-sky-200"
                />
              </GlassCard>

              <GlassCard>
                <label className="block text-sm font-semibold mb-2">Подзаголовок</label>
                <Input
                  value={content.hero?.subtitle || "Профессиональные курсы парусного спорта"}
                  onChange={(e) => updateContent("hero", "subtitle", e.target.value)}
                  className="w-full h-12 rounded-xl border border-sky-200"
                />
              </GlassCard>

              <GlassCard>
                <label className="block text-sm font-semibold mb-2">Описание</label>
                <textarea
                  value={content.hero?.description || "Учитесь парусному спорту с профессиональным тренером..."}
                  onChange={(e) => updateContent("hero", "description", e.target.value)}
                  className="w-full rounded-xl border border-sky-200 p-4 resize-none h-24"
                />
              </GlassCard>
            </div>
          )}

          {/* COURSES TAB */}
          {activeTab === "courses" && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold mb-6">⛵ Управление курсами</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* Курс 1 */}
                <GlassCard className="p-8 border-2 border-amber-200">
                  <h3 className="text-2xl font-bold mb-4">🎓 Капитанский курс</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Название</label>
                      <Input
                        value={content.course1?.title || "Капитанский курс"}
                        onChange={(e) => updateContent("course1", "title", e.target.value)}
                        className="w-full h-10 rounded-lg border border-sky-200"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">Цена</label>
                      <Input
                        value={content.course1?.price || "€1.500"}
                        onChange={(e) => updateContent("course1", "price", e.target.value)}
                        className="w-full h-10 rounded-lg border border-sky-200"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">Длительность (дни)</label>
                      <Input
                        value={content.course1?.duration || "7"}
                        onChange={(e) => updateContent("course1", "duration", e.target.value)}
                        className="w-full h-10 rounded-lg border border-sky-200"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">Описание</label>
                      <textarea
                        value={content.course1?.description || "7-дневный интенсивный курс..."}
                        onChange={(e) => updateContent("course1", "description", e.target.value)}
                        className="w-full rounded-lg border border-sky-200 p-2 resize-none h-20"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">Макс. участников</label>
                      <Input
                        value={content.course1?.maxParticipants || "6"}
                        onChange={(e) => updateContent("course1", "maxParticipants", e.target.value)}
                        className="w-full h-10 rounded-lg border border-sky-200"
                      />
                    </div>
                  </div>
                </GlassCard>

                {/* Курс 2 */}
                <GlassCard className="p-8 border-2 border-blue-200">
                  <h3 className="text-2xl font-bold mb-4">🚤 Курс манёвров</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Название</label>
                      <Input
                        value={content.course2?.title || "Курс манёвров в гавани"}
                        onChange={(e) => updateContent("course2", "title", e.target.value)}
                        className="w-full h-10 rounded-lg border border-sky-200"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">Цена</label>
                      <Input
                        value={content.course2?.price || "€1.600"}
                        onChange={(e) => updateContent("course2", "price", e.target.value)}
                        className="w-full h-10 rounded-lg border border-sky-200"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">Длительность (дни)</label>
                      <Input
                        value={content.course2?.duration || "7"}
                        onChange={(e) => updateContent("course2", "duration", e.target.value)}
                        className="w-full h-10 rounded-lg border border-sky-200"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">Описание</label>
                      <textarea
                        value={content.course2?.description || "Специализированный курс манёвров..."}
                        onChange={(e) => updateContent("course2", "description", e.target.value)}
                        className="w-full rounded-lg border border-sky-200 p-2 resize-none h-20"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">Макс. участников</label>
                      <Input
                        value={content.course2?.maxParticipants || "6"}
                        onChange={(e) => updateContent("course2", "maxParticipants", e.target.value)}
                        className="w-full h-10 rounded-lg border border-sky-200"
                      />
                    </div>
                  </div>
                </GlassCard>
              </div>

              {/* Additional costs */}
              <GlassCard className="p-6 border-2 border-green-200">
                <h3 className="text-xl font-bold mb-4">💰 Дополнительные затраты</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Борткасса (€/чел)</label>
                    <Input
                      value={content.additionalCosts?.bortkasse || "135"}
                      onChange={(e) => updateContent("additionalCosts", "bortkasse", e.target.value)}
                      className="w-full h-10 rounded-lg border border-sky-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Залог (€/группа)</label>
                    <Input
                      value={content.additionalCosts?.kaution || "3000"}
                      onChange={(e) => updateContent("additionalCosts", "kaution", e.target.value)}
                      className="w-full h-10 rounded-lg border border-sky-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Страховка залога (€)</label>
                    <Input
                      value={content.additionalCosts?.insurance || "250"}
                      onChange={(e) => updateContent("additionalCosts", "insurance", e.target.value)}
                      className="w-full h-10 rounded-lg border border-sky-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Еда (€/неделя)</label>
                    <Input
                      value={content.additionalCosts?.food || "100"}
                      onChange={(e) => updateContent("additionalCosts", "food", e.target.value)}
                      className="w-full h-10 rounded-lg border border-sky-200"
                    />
                  </div>
                </div>
              </GlassCard>
            </div>
          )}

          {/* INSTRUCTOR TAB */}
          {activeTab === "instructor" && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold mb-6">👨‍🏫 Информация о тренере</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <GlassCard>
                  <label className="block text-sm font-semibold mb-2">Имя</label>
                  <Input
                    value={content.instructor?.name || "Bogdan Zambrovskij"}
                    onChange={(e) => updateContent("instructor", "name", e.target.value)}
                    className="w-full h-12 rounded-xl border border-sky-200"
                  />
                </GlassCard>

                <GlassCard>
                  <label className="block text-sm font-semibold mb-2">Email</label>
                  <Input
                    value={content.instructor?.email || "info@pontarea.de"}
                    onChange={(e) => updateContent("instructor", "email", e.target.value)}
                    className="w-full h-12 rounded-xl border border-sky-200"
                  />
                </GlassCard>

                <GlassCard>
                  <label className="block text-sm font-semibold mb-2">Телефон</label>
                  <Input
                    value={content.instructor?.phone || "+49 176 44437667"}
                    onChange={(e) => updateContent("instructor", "phone", e.target.value)}
                    className="w-full h-12 rounded-xl border border-sky-200"
                  />
                </GlassCard>

                <GlassCard>
                  <label className="block text-sm font-semibold mb-2">Местоположение</label>
                  <Input
                    value={content.instructor?.location || "80809 München"}
                    onChange={(e) => updateContent("instructor", "location", e.target.value)}
                    className="w-full h-12 rounded-xl border border-sky-200"
                  />
                </GlassCard>
              </div>

              <GlassCard>
                <label className="block text-sm font-semibold mb-2">Биография</label>
                <textarea
                  value={content.instructor?.bio || "Опытный инструктор парусного спорта..."}
                  onChange={(e) => updateContent("instructor", "bio", e.target.value)}
                  className="w-full rounded-xl border border-sky-200 p-4 resize-none h-32"
                />
              </GlassCard>

              <GlassCard>
                <label className="block text-sm font-semibold mb-2">Сертификаты (через запятую)</label>
                <textarea
                  value={content.instructor?.certificates || "Segeltrainer, ISO 9001, SCRUM Master"}
                  onChange={(e) => updateContent("instructor", "certificates", e.target.value)}
                  className="w-full rounded-xl border border-sky-200 p-4 resize-none h-24"
                />
              </GlassCard>
            </div>
          )}

          {/* FAQ TAB */}
          {activeTab === "faq" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold">❓ Часто задаваемые вопросы</h2>
                <Button
                  onClick={() => addItem("faq", { question: "Новый вопрос?", answer: "Ответ здесь" })}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  ➕ Добавить
                </Button>
              </div>

              <div className="space-y-4">
                {(content.faq || []).map((item: any, idx: number) => (
                  <GlassCard key={idx} className="p-6">
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <label className="block text-sm font-semibold mb-2">Вопрос</label>
                        <Input
                          value={item.question || ""}
                          onChange={(e) => {
                            const updated = [...(content.faq || [])];
                            updated[idx].question = e.target.value;
                            setContent(prev => ({ ...prev, faq: updated }));
                          }}
                          className="w-full h-10 rounded-lg border border-sky-200 mb-3"
                        />
                        
                        <label className="block text-sm font-semibold mb-2">Ответ</label>
                        <textarea
                          value={item.answer || ""}
                          onChange={(e) => {
                            const updated = [...(content.faq || [])];
                            updated[idx].answer = e.target.value;
                            setContent(prev => ({ ...prev, faq: updated }));
                          }}
                          className="w-full rounded-lg border border-sky-200 p-2 resize-none h-20"
                        />
                      </div>

                      <Button
                        onClick={() => removeItem("faq", idx)}
                        className="self-start mt-0 h-10 w-10 p-0 bg-red-500 text-white rounded-lg hover:bg-red-600"
                      >
                        ✕
                      </Button>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </div>
          )}

          {/* CONTACT TAB */}
          {activeTab === "contact" && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold mb-6">📞 Контактная информация</h2>

              <div className="grid md:grid-cols-2 gap-6">
                <GlassCard>
                  <label className="block text-sm font-semibold mb-2">Email</label>
                  <Input
                    value={content.contact?.email || "info@pontarea.de"}
                    onChange={(e) => updateContent("contact", "email", e.target.value)}
                    className="w-full h-12 rounded-xl border border-sky-200"
                  />
                </GlassCard>

                <GlassCard>
                  <label className="block text-sm font-semibold mb-2">Телефон</label>
                  <Input
                    value={content.contact?.phone || "+49 176 44437667"}
                    onChange={(e) => updateContent("contact", "phone", e.target.value)}
                    className="w-full h-12 rounded-xl border border-sky-200"
                  />
                </GlassCard>

                <GlassCard>
                  <label className="block text-sm font-semibold mb-2">Адрес</label>
                  <Input
                    value={content.contact?.address || "Konstanzer Str. 46, 80809 München"}
                    onChange={(e) => updateContent("contact", "address", e.target.value)}
                    className="w-full h-12 rounded-xl border border-sky-200"
                  />
                </GlassCard>

                <GlassCard>
                  <label className="block text-sm font-semibold mb-2">Город</label>
                  <Input
                    value={content.contact?.city || "80809 München"}
                    onChange={(e) => updateContent("contact", "city", e.target.value)}
                    className="w-full h-12 rounded-xl border border-sky-200"
                  />
                </GlassCard>
              </div>

              <GlassCard>
                <label className="block text-sm font-semibold mb-2">Местоположение курсов</label>
                <Input
                  value={content.contact?.courseLocation || "Marina Dalmacija, Sukošan, Kroatien"}
                  onChange={(e) => updateContent("contact", "courseLocation", e.target.value)}
                  className="w-full h-12 rounded-xl border border-sky-200"
                />
              </GlassCard>

              <GlassCard>
                <label className="block text-sm font-semibold mb-2">Время работы</label>
                <Input
                  value={content.contact?.workingHours || "Пн-Пт: 9:00-18:00"}
                  onChange={(e) => updateContent("contact", "workingHours", e.target.value)}
                  className="w-full h-12 rounded-xl border border-sky-200"
                />
              </GlassCard>
            </div>
          )}

          {/* SETTINGS TAB */}
          {activeTab === "settings" && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold mb-6">⚙️ Настройки сайта</h2>

              <GlassCard className="p-8 border-2 border-purple-200">
                <h3 className="text-xl font-bold mb-4">🌍 Основные</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Название сайта</label>
                    <Input
                      value={content.settings?.siteName || "Pontarea"}
                      onChange={(e) => updateContent("settings", "siteName", e.target.value)}
                      className="w-full h-12 rounded-xl border border-sky-200"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Описание</label>
                    <textarea
                      value={content.settings?.siteDescription || "Профессиональные курсы парусного спорта"}
                      onChange={(e) => updateContent("settings", "siteDescription", e.target.value)}
                      className="w-full rounded-xl border border-sky-200 p-4 resize-none h-24"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">URL сайта</label>
                    <Input
                      value={content.settings?.siteUrl || "https://pontarea.de"}
                      onChange={(e) => updateContent("settings", "siteUrl", e.target.value)}
                      className="w-full h-12 rounded-xl border border-sky-200"
                    />
                  </div>
                </div>
              </GlassCard>

              <GlassCard className="p-8 border-2 border-orange-200">
                <h3 className="text-xl font-bold mb-4">🔐 Безопасность</h3>
                
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">
                  <p className="text-sm text-orange-800">
                    ⚠️ Пароль для админки: <code className="font-mono font-bold">pontarea2026</code>
                  </p>
                </div>

                <Button
                  className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                >
                  🔑 Изменить пароль
                </Button>
              </GlassCard>

              <GlassCard className="p-8 border-2 border-red-200">
                <h3 className="text-xl font-bold mb-4 text-red-600">⚠️ Опасная зона</h3>
                
                <Button
                  onClick={() => {
                    if (window.confirm("❌ Вы уверены? Это удалит ВСЕ данные!")) {
                      localStorage.removeItem("pontareaContent");
                      setContent({});
                      setSaveMessage("✓ Данные очищены");
                    }
                  }}
                  className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  🗑️ Очистить все данные
                </Button>
              </GlassCard>
            </div>
          )}

        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

// Glass Card Component
const GlassCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white border border-sky-200 rounded-2xl backdrop-blur-xl ${className}`}>
    {children}
  </div>
);

// Stat Card Component
const StatCard = ({ title, value, subtitle }: { title: string; value: string; subtitle: string }) => (
  <GlassCard className="p-6">
    <p className="text-gray-500 text-sm mb-2">{title}</p>
    <p className="text-4xl font-bold text-sky-600 mb-2">{value}</p>
    <p className="text-gray-400 text-xs">{subtitle}</p>
  </GlassCard>
);

export default AdminPanel;
