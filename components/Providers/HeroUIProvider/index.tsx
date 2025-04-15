"use client";
// libs
import * as React from "react";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";

// hero-ui
import { HeroUIProvider as HeroProvider } from "@heroui/system";
import { ToastProvider } from "@heroui/toast";

// common
import { HeroUIProviderProps } from "./types";

declare module "@react-types/shared" {
	interface RouterConfig {
		routerOptions: NonNullable<
			Parameters<ReturnType<typeof useRouter>["push"]>[1]
		>;
	}
}

export function HeroUIProvider({ children, themeProps }: HeroUIProviderProps) {
	const router = useRouter();

	return (
		<HeroProvider navigate={router.push}>
			<ToastProvider placement="top-right" />
			<NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
		</HeroProvider>
	);
}
