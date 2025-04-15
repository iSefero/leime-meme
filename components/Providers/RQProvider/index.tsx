"use client";
// libs
import { getQueryClient } from "@/app/get-query-client";
import { QueryClientProvider } from "@tanstack/react-query";
import type * as React from "react";

export function RQProvider({ children }: { children: React.ReactNode }) {
	const queryClient = getQueryClient();

	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);
}
