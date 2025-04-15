import { ThemeProviderProps } from "next-themes";

export interface HeroUIProviderProps {
	children: React.ReactNode;
	themeProps?: ThemeProviderProps;
}
