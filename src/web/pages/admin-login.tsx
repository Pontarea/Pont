/**
 * /admin  — страница входа через magic link
 * /admin/login?token=... — автоматический вход по ссылке из письма
 */
import { useState, useEffect } from "react";

type State = "idle" | "sending" | "sent" | "verifying" | "error";

const AdminLogin = ({ onSuccess }: { onSuccess: (token: string) => void }) => {
  const [state, setState] = useState<State>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [devUrl, setDevUrl] = useState("");

  // — Если в URL уже есть ?token= — сразу верифицируем
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (token) {
      autoVerify(token);
    }
  }, []);

  async function autoVerify(token: string) {
    setState("verifying");
    try {
      const res = await fetch("/api/admin/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const data = await res.json() as any;
      if (data.valid) {
        // Token speichern und einloggen
        localStorage.setItem("pontarea_admin_token", token);
        // Token aus URL entfernen (Sicherheit)
        window.history.replaceState({}, "", "/admin");
        onSuccess(token);
      } else {
        const msg =
          data.reason === "expired"
            ? "⏱️ Link abgelaufen (15 Min). Bitte neuen Link anfordern."
            : data.reason === "bad_sig"
            ? "🔒 Ungültiger Link. Bitte neuen Link anfordern."
            : data.reason === "wrong_type"
            ? "❌ Falscher Link-Typ. Bitte neuen Link anfordern."
            : "❌ Link ungültig. Bitte neuen Link anfordern.";
        setErrorMsg(msg);
        setState("error");
        window.history.replaceState({}, "", "/admin");
      }
    } catch (err) {
      // API nicht erreichbar (kein Internet, Server-Fehler)
      setErrorMsg("⚠️ Verbindungsfehler. Bitte Seite neu laden und erneut versuchen.");
      setState("error");
      window.history.replaceState({}, "", "/admin");
    }
  }

  async function handleSendLink() {
    setState("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/admin/send-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json() as any;
      if (data.success) {
        setState("sent");
        if (data.devLoginUrl) setDevUrl(data.devLoginUrl);
      } else {
        setErrorMsg(data.error || "Fehler beim Senden.");
        setState("error");
      }
    } catch {
      // Dev-fallback: нет сервера — генерируем токен локально
      setState("idle");
      setErrorMsg("API nicht erreichbar. Starte 'vercel dev' für den vollen Funktionsumfang.");
    }
  }

  // ── Состояние: автоматическая верификация токена ──
  if (state === "verifying") {
    return (
      <Screen>
        <div className="text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#d4a853]/10 flex items-center justify-center mx-auto animate-pulse">
            <span className="text-3xl">⛵</span>
          </div>
          <p className="text-gray-500 text-lg">Wird eingeloggt…</p>
        </div>
      </Screen>
    );
  }

  // ── Состояние: письмо отправлено ──
  if (state === "sent") {
    return (
      <Screen>
        <div className="text-center space-y-6">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto">
            <span className="text-4xl">📬</span>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">E-Mail verschickt!</h2>
            <p className="text-gray-500 mt-3 text-base leading-relaxed">
              Schau in dein Postfach:<br />
              <strong className="text-gray-700">zambrovskij@gmail.com</strong>
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Der Link ist 15 Minuten gültig.
            </p>
          </div>

          {devUrl && (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-left">
              <p className="text-amber-800 text-xs font-semibold mb-2">🛠️ Dev-Modus (kein Resend-Key)</p>
              <a href={devUrl} className="text-blue-600 text-xs break-all hover:underline font-mono">
                {devUrl}
              </a>
            </div>
          )}

          <button
            onClick={() => { setState("idle"); setDevUrl(""); }}
            className="text-gray-400 hover:text-gray-600 text-sm transition-colors"
          >
            ← Erneut senden
          </button>
        </div>
      </Screen>
    );
  }

  // ── Основной экран ──
  return (
    <Screen>
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-[#d4a853]/20 to-[#d4a853]/5 border border-[#d4a853]/20 mb-6">
          <span className="text-3xl">⛵</span>
        </div>
        <h1 className="text-4xl font-semibold text-gray-800 tracking-tight">Admin Panel</h1>
        <p className="text-gray-400 mt-2 text-lg">Pontarea</p>
      </div>

      <div className="space-y-5">
        {state === "error" && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-red-700 text-sm text-center">
            {errorMsg || "Fehler. Bitte erneut versuchen."}
          </div>
        )}

        {state === "idle" && errorMsg && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3 text-amber-700 text-sm text-center">
            {errorMsg}
          </div>
        )}

        <button
          onClick={handleSendLink}
          disabled={state === "sending"}
          className="w-full h-14 bg-gradient-to-r from-[#d4a853] to-[#e8c476] text-black font-semibold text-lg rounded-2xl hover:opacity-90 active:scale-[0.98] transition-all duration-200 shadow-[0_4px_24px_rgba(212,168,83,0.3)] disabled:opacity-60 flex items-center justify-center gap-2"
        >
          {state === "sending" ? (
            <><span className="animate-spin">⏳</span> Wird gesendet…</>
          ) : (
            <><span>📧</span> Zugangslink senden</>
          )}
        </button>

        <p className="text-center text-gray-400 text-sm">
          Der Link wird an <strong className="text-gray-600">zambrovskij@gmail.com</strong> geschickt.
        </p>
      </div>
    </Screen>
  );
};

// Обёртка с фоном
const Screen = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white flex items-center justify-center relative overflow-hidden px-6">
    <div className="absolute top-1/4 -left-32 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px]" />
    <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px]" />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#d4a853]/15 rounded-full blur-[150px]" />
    <div className="relative z-10 w-full max-w-sm">{children}</div>
  </div>
);

export default AdminLogin;
