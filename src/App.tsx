import { memo } from 'react';
import 'src/css/app.css';
import Router from 'src/router';
import apiRequest from 'src/utils/request';

function App() {
	return (
		<div className="App">
			<Router />
		</div>
	);
}

export default memo(App);
