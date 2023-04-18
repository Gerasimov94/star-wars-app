import { Route, Switch } from 'wouter';
import ErrorPage from 'src/modules/404';
import CharactersRoot from 'src/modules/characters';

export default function Router() {
	return (
		<Switch>
			<Route component={CharactersRoot} path="/" />
			<Route component={CharactersRoot} path="/characters/:id" />
			<Route component={ErrorPage} path="/:rest*" />
		</Switch>
	);
}
