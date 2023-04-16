import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from 'src/App';
import store from 'src/store';
import 'src/css/index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
	// <React.StrictMode>
	<Provider store={store}>
		<App />
	</Provider>,
	// p</React.StrictMode>,
);
