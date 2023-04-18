import Layout from 'src/components/layout/Layout';
import 'antd/dist/reset.css';
import 'src/css/globals.css';
import Router from 'src/router';
import { ConfigProvider } from 'antd';

function App() {
	return (
		<ConfigProvider
		/* theme={{
				token: {
					fontFamily: 'Star Jedi, sans serif',
				},
			}} */
		>
			<Layout>
				<Router />
			</Layout>
		</ConfigProvider>
	);
}

export default App;
