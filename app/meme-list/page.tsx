// libs
import {
	dehydrate,
	HydrationBoundary,
	queryOptions,
} from "@tanstack/react-query";

// common
import { getQueryClient } from "../get-query-client";
import MemeListView from "@/views/memeList";
import { listMemes } from "@/calls/memes";

export const memesOptions = queryOptions({
	queryKey: ["listMemes"],
	queryFn: listMemes,
});

export default async function MemeListPage() {
	const queryClient = getQueryClient();
	await queryClient.prefetchQuery(memesOptions);

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<MemeListView />
		</HydrationBoundary>
	);
}
