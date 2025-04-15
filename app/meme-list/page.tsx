// libs
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

// common
import { getQueryClient } from "../get-query-client";
import MemeListView from "@/views/memeList";
import { memesOptions } from "@/calls/memes";

export default async function MemeListPage() {
	const queryClient = getQueryClient();
	await queryClient.prefetchQuery(memesOptions);

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<MemeListView />
		</HydrationBoundary>
	);
}
