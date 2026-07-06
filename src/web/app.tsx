import { Route, Switch } from "wouter";
import Index from "./pages/index";
import AdminPanel from "./pages/admin-extended";
import AdminFullPage from "./pages/admin-full";
import AdminResetPassword from "./pages/admin-reset-password";
import ImpressumPage from "./pages/impressum";
import { AGBPageStyled, DatenschutzPageStyled } from "./pages/legal-styled";
import { Provider } from "./components/provider";

function App() {
	return (
		<Provider hideRunableBadge={true}>
			<Switch>
				<Route path="/" component={Index} />
				<Route path="/admin" component={AdminFullPage} />
				<Route path="/admin/login" component={AdminFullPage} />
				<Route path="/admin/reset-password" component={AdminResetPassword} />
				<Route path="/admin-old" component={AdminPanel} />
				<Route path="/impressum" component={ImpressumPage} />
				<Route path="/agb" component={AGBPageStyled} />
				<Route path="/datenschutz" component={DatenschutzPageStyled} />
			</Switch>
		</Provider>
	);
}

export default App;
