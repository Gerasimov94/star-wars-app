import Layout from 'src/components/layout/Layout';
import 'antd/dist/reset.css';
import 'src/css/globals.css';
import Router from 'src/router';
import { ConfigProvider, theme } from 'antd';
import { ThemeModes, useThemeContext } from 'src/common/context/ThemeContext';

function App() {
	const { mode } = useThemeContext();
	return (
		<ConfigProvider
			theme={{
				/* token: {
					fontFamily: 'Star Jedi, sans serif',
				}, */
				algorithm: mode === ThemeModes.DARK ? theme.darkAlgorithm : theme.defaultAlgorithm,
			}}
		>
			<Layout>
				<Router />
			</Layout>
		</ConfigProvider>
	);
}

export default App;
