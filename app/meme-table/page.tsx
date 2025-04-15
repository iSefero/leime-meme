// libs
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

// common
import { getQueryClient } from "../get-query-client";
import MemeTableView from "@/views/memeTable";
import { memesOptions } from "@/calls/memes";

export default async function MemeTablePage() {
	const queryClient = getQueryClient();
	void queryClient.prefetchQuery(memesOptions);

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<MemeTableView />
		</HydrationBoundary>
	);
}
