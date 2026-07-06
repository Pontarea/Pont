import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocation } from "wouter";

const AdminResetPassword = () => {
  const [, navigate] = useLocation();
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [manualPw, setManualPw] = useState(""); // когда нет Vercel API Token

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const t = params.get("token");
    if (t) setToken(t);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (newPassword.length < 8) {
      setErrorMsg("Passwort muss mindestens 8 Zeichen lang sein.");
      return;
    }
    if (newPassword !== confirm) {
      setErrorMsg("Passwörter stimmen nicht überein.");
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/admin/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword }),
      });
      const data = await res.json() as any;
      if (data.success) {
        if (data.manualAction) {
          setManualPw(data.newPassword);
        }
        setStatus("success");
      } else {
        setErrorMsg(data.error || "Fehler beim Zurücksetzen.");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Netzwerkfehler. Bitte versuche es erneut.");
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white flex items-center justify-center relative overflow-hidden">
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-purple-500/30 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-blue-500/30 rounded-full blur-[120px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#d4a853]/20 rounded-full blur-[150px]" />

      <div className="relative z-10 w-full max-w-md px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-sky-200 mb-6">
            <span className="text-3xl">⛵</span>
          </div>
          <h1 className="text-3xl font-semibold text-gray-800 tracking-tight">Neues Passwort</h1>
          <p className="text-gray-500 mt-2">Pontarea Admin</p>
        </div>

        {status === "success" ? (
          <div className="text-center space-y-5">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <span className="text-3xl">✅</span>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Passwort gesetzt!</h2>
            </div>

            {manualPw ? (
              // Нет Vercel API Token — показываем инструкцию
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 text-left space-y-3">
                <p className="text-amber-900 font-semibold text-sm">⚙️ Noch ein Schritt nötig:</p>
                <p className="text-amber-800 text-sm">
                  Gehe in Vercel zu <strong>Settings → Environment Variables</strong>
                  und setze <code className="bg-amber-100 px-1 rounded">ADMIN_PASSWORD</code> auf:
                </p>
                <div className="flex items-center gap-2 bg-white border border-amber-300 rounded-xl p-3">
                  <code className="flex-1 text-gray-800 font-mono text-sm break-all">{manualPw}</code>
                  <button
                    onClick={() => navigator.clipboard.writeText(manualPw)}
                    className="text-amber-600 hover:text-amber-800 text-sm shrink-0 font-medium"
                  >
                    Kopieren
                  </button>
                </div>
                <p className="text-amber-700 text-xs">
                  Danach <strong>Redeploy</strong> auslösen (oder neuer Commit pushen).
                  Alternativ: <code className="bg-amber-100 px-1 rounded">VERCEL_API_TOKEN</code> in den Env-Variablen setzen für automatisches Update.
                </p>
              </div>
            ) : (
              <p className="text-gray-500 text-sm">
                Dein neues Passwort wurde gesetzt. Du kannst dich jetzt anmelden.
              </p>
            )}

            <Button
              onClick={() => navigate("/admin")}
              className="w-full h-14 bg-gradient-to-r from-[#d4a853] to-[#e8c476] text-black font-semibold text-lg rounded-2xl hover:opacity-90 transition-all"
            >
              Zum Admin Panel →
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {!token && (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-red-700 text-sm text-center">
                ⚠️ Kein Reset-Token gefunden. Bitte den Link aus der E-Mail verwenden.
              </div>
            )}

            <div className="relative">
              <Input
                type={showPw ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Neues Passwort (mind. 8 Zeichen)"
                required
                className="w-full h-14 bg-sky-50 border-sky-200 rounded-2xl text-gray-800 text-center text-lg placeholder:text-gray-400 focus:border-[#d4a853]/50 pr-12 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPw(v => !v)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPw ? "🙈" : "👁️"}
              </button>
            </div>

            <Input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Passwort bestätigen"
              required
              className="w-full h-14 bg-sky-50 border-sky-200 rounded-2xl text-gray-800 text-center text-lg placeholder:text-gray-400 focus:border-[#d4a853]/50 transition-all"
            />

            {errorMsg && (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-3 text-red-700 text-sm text-center">
                {errorMsg}
              </div>
            )}

            <Button
              type="submit"
              disabled={status === "loading" || !token}
              className="w-full h-14 bg-gradient-to-r from-[#d4a853] to-[#e8c476] text-black font-semibold text-lg rounded-2xl hover:opacity-90 transition-all disabled:opacity-50"
            >
              {status === "loading" ? "Wird gespeichert…" : "Passwort speichern"}
            </Button>

            <div className="text-center">
              <button type="button" onClick={() => navigate("/admin")}
                className="text-gray-400 hover:text-gray-600 text-sm transition-colors">
                ← Zurück zum Login
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AdminResetPassword;
