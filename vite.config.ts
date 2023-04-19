import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import postcssNesting from 'postcss-nesting';
import path from 'node:path';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	css: {
		postcss: {
			plugins: [postcssNesting],
		},
	},
	resolve: {
		alias: {
			src: path.resolve(__dirname, 'src'),
		},
	},
	define: {
		API_URL: `"${process.env.VITE_API_URL}"`,
	},
});
