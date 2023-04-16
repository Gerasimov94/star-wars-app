import { Route } from 'wouter';
import ErrorPage from 'src/modules/404';
import React from 'react';
import Loader from 'src/components/loader';

const CharactersRoot = React.lazy(() => import('src/modules/characters'));

export default function Router() {
	return (
		<>
			<Route
				component={() => (
					<React.Suspense fallback={<Loader />}>
						<CharactersRoot />
					</React.Suspense>
				)}
				path="/"
			/>
			<Route component={CharactersRoot} path="/characters/:id" />
			<Route component={ErrorPage} />
		</>
	);
}
