import React, { useCallback, useContext, useMemo, useState } from 'react';

interface IProps {
	children: React.ReactNode | React.ReactNode[];
}
// eslint-disable-next-line no-shadow
export enum ThemeModes {
	LIGHT = 'light',
	DARK = 'dark',
}

interface IContext {
	mode: ThemeModes;
	setThemeMode: (mode: ThemeModes) => void;
}

export const ThemeContext = React.createContext<IContext>({
	mode: ThemeModes.LIGHT,
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	setThemeMode: () => {},
});

export const useThemeContext = () => useContext(ThemeContext);

export default function ThemeContextWrapper({ children }: IProps) {
	const [mode, updateMode] = useState((localStorage.getItem('mode') as ThemeModes) ?? ThemeModes.LIGHT);

	const setThemeMode = useCallback((newMode: ThemeModes) => {
		updateMode(newMode);

		localStorage.setItem('mode', newMode);
	}, []);

	const context = useMemo(
		() => ({
			mode,
			setThemeMode,
		}),
		[mode],
	);

	return <ThemeContext.Provider value={context}>{children}</ThemeContext.Provider>;
}
