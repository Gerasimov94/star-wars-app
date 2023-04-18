import React, { useContext, useMemo, useState } from 'react';

interface IProps {
	children: React.ReactNode | React.ReactNode[];
}
// eslint-disable-next-line no-shadow
export enum ThemeModes {
	LIGHT = 'light',
	DARK = 'dark',
}

export const ThemeContext = React.createContext<{
	mode: ThemeModes;
	setThemeMode: React.Dispatch<React.SetStateAction<ThemeModes>>;
}>({
	mode: ThemeModes.LIGHT,
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	setThemeMode: () => {},
});

export const useThemeContext = () => useContext(ThemeContext);

export default function ThemeContextWrapper({ children }: IProps) {
	const [mode, setThemeMode] = useState(ThemeModes.LIGHT);

	const context = useMemo(
		() => ({
			mode,
			setThemeMode,
		}),
		[mode],
	);

	return <ThemeContext.Provider value={context}>{children}</ThemeContext.Provider>;
}
