# 🔐 Pontarea Admin – Vercel Setup

## So funktioniert der Login

Kein Passwort. Kein Formular. Nur ein Klick.

1. Gehe auf `https://pontarea.de/admin`
2. Klicke **„Zugangslink senden"**
3. Du bekommst eine E-Mail an `zambrovskij@gmail.com`
4. Klicke den Button in der E-Mail → du bist sofort eingeloggt

Der Link ist 15 Minuten gültig und signiert (HMAC-SHA256). Kein Datenbankzugriff nötig.

---

## 1. Pflicht: Umgebungsvariablen in Vercel setzen

Gehe in Vercel zu: **Project → Settings → Environment Variables**

| Variable | Wert | Wozu |
|----------|------|------|
| `ADMIN_JWT_SECRET` | ≥ 32 zufällige Zeichen | Token-Signierung (z.B. `openssl rand -base64 32`) |
| `RESEND_API_KEY` | `re_xxxxx` | E-Mail-Versand (von [resend.com/api-keys](https://resend.com/api-keys)) |
| `SITE_URL` | `https://pontarea.de` | Login-Link in der E-Mail |

> ✅ `ADMIN_PASSWORD` wird **nicht** mehr benötigt — Magic Link Only.

---

## 2. Lokale Entwicklung

```bash
# Abhängigkeiten installieren:
bun install   # oder npm install

# .env.local anlegen und ausfüllen:
cp .env.local.example .env.local   # oder manuell erstellen

# Mit vercel dev starten (API + Vite zusammen):
npx vercel dev

# Nur Frontend (API nicht verfügbar, Login funktioniert per dev-fallback):
bun run dev   # oder npm run dev
```

### Dev-Fallback
Wenn kein Resend-Key gesetzt ist, gibt die API den Login-Link direkt als JSON zurück:
```json
{ "success": true, "devLoginUrl": "http://localhost:3000/admin/login?token=..." }
```
Im Browser-Netzwerk-Tab sichtbar → Link direkt aufrufen.

---

## 3. E-Mail-Absender: ✅ Domain pontarea.de verifiziert

Die Domain `pontarea.de` ist in Resend **vollständig verifiziert** (DKIM ✅, SPF ✅).

E-Mails werden jetzt von **`noreply@pontarea.de`** gesendet — kein `onboarding@resend.dev` mehr.

> Kein weiterer Setup-Schritt nötig. E-Mails landen sauber im Posteingang.

---

## 4. Sicherheitsübersicht

| Schutz | Status |
|--------|--------|
| Kein Passwort im Code oder in Git | ✅ |
| Magic Link – einmalig, 15 Min gültig | ✅ |
| HMAC-SHA256 signierte Tokens | ✅ |
| Rate Limiting: 3 Anfragen / 10 Min | ✅ |
| Stateless – kein Datenbank-Backend | ✅ |
| `.env.local` in `.gitignore` | ✅ |
| HTTPS (Vercel) | ✅ |

---

## 5. Troubleshooting

**Ich bekomme keine E-Mail**
- Prüfe, ob `RESEND_API_KEY` in Vercel korrekt gesetzt ist
- Prüfe den Resend-Dashboard unter [resend.com/emails](https://resend.com/emails) auf Fehler
- Domain `pontarea.de` ist verifiziert — Mails gehen direkt an `zambrovskij@gmail.com`

**„ADMIN_JWT_SECRET nicht konfiguriert"**
- Variable in Vercel setzen und neu deployen

**Link abgelaufen**
- Neuen Link anfordern unter `/admin` — dauert 2 Sekunden
