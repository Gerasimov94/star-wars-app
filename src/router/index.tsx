import { Route, Switch } from 'wouter';
import ErrorPage from 'src/modules/404';
import CharactersRoot from 'src/modules/characters';
import CharacterRoot from 'src/modules/character';

export default function Router() {
	return (
		<Switch>
			<Route component={CharactersRoot} path="/" />
			<Route component={CharacterRoot} path="/character/:id" />
			<Route component={ErrorPage} />
		</Switch>
	);
}
