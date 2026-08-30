import { useEffect, useRef } from "react";
import { Redirect, Route, Switch } from "wouter";
import Index from "./pages/index";
import CoachesPage from "./pages/coaches";
import AdminFullPage from "./pages/admin-full";
import AdminResetPassword from "./pages/admin-reset-password";
import ImpressumPage from "./pages/impressum";
import { AGBPageStyled, DatenschutzPageStyled } from "./pages/legal-styled";
import { Provider } from "./components/provider";
import { useLanguage } from "./contexts/LanguageContext";

/**
 * Sprachspezifische URLs (/ru/..., /de/...) — damit geteilte Links
 * (WhatsApp, E-Mail) immer in der richtigen Sprache öffnen.
 * Die Sprache wird beim Aufruf gesetzt und wie gewohnt in localStorage gemerkt.
 */
function withLanguage(lang: "de" | "ru", Component: React.ComponentType) {
	return function LocalizedPage() {
		const { language, setLanguage } = useLanguage();
		const applied = useRef(false);
		// Nur einmal beim Aufruf der URL setzen — danach bleibt der
		// Sprachschalter voll bedienbar.
		useEffect(() => {
			if (applied.current) return;
			applied.current = true;
			if (language !== lang) setLanguage(lang);
		}, []);
		return <Component />;
	};
}

const IndexDE = withLanguage("de", Index);
const IndexRU = withLanguage("ru", Index);
const CoachesDE = withLanguage("de", CoachesPage);
const CoachesRU = withLanguage("ru", CoachesPage);

function App() {
	return (
		<Provider hideRunableBadge={true}>
			<Switch>
				<Route path="/" component={Index} />
				<Route path="/coaches" component={CoachesPage} />

				{/* Kurzlink zum Frauenkurs: /ona (sprachneutral),
				    /ru/ona und /de/ona erzwingen die Sprache. */}
				<Route path="/ona" component={Index} />
				<Route path="/ona/" component={Index} />

				{/* Russisch */}
				<Route path="/ru" component={IndexRU} />
				<Route path="/ru/" component={IndexRU} />
				<Route path="/ru/coaches" component={CoachesRU} />
				<Route path="/ru/ona" component={IndexRU} />

				{/* Deutsch (explizit) */}
				<Route path="/de" component={IndexDE} />
				<Route path="/de/" component={IndexDE} />
				<Route path="/de/coaches" component={CoachesDE} />
				<Route path="/de/ona" component={IndexDE} />

				<Route path="/admin" component={AdminFullPage} />
				<Route path="/admin/login" component={AdminFullPage} />
				<Route path="/admin/reset-password" component={AdminResetPassword} />
				{/* /admin-old entfernt: Legacy-Panel ohne Server-Anbindung
				    (speicherte nur in localStorage) und mit hartkodiertem
				    Passwort im öffentlichen Bundle. Ersetzt durch /admin. */}
				<Route path="/admin-old">
					<Redirect to="/admin" />
				</Route>
				<Route path="/impressum" component={ImpressumPage} />
				<Route path="/agb" component={AGBPageStyled} />
				<Route path="/datenschutz" component={DatenschutzPageStyled} />

				{/* Fallback: keine leere Seite bei unbekannter URL */}
				<Route>
					<Redirect to="/" />
				</Route>
			</Switch>
		</Provider>
	);
}

export default App;
