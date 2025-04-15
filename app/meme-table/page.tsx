// libs
import {
	dehydrate,
	HydrationBoundary,
	queryOptions,
} from "@tanstack/react-query";

// common
import { getQueryClient } from "../get-query-client";
import MemeTableView from "@/views/memeTable";
import { listMemes } from "@/calls/memes";

export const memesOptions = queryOptions({
	queryKey: ["listMemes"],
	queryFn: listMemes,
});

export default async function MemeTablePage() {
	const queryClient = getQueryClient();
	void queryClient.prefetchQuery(memesOptions);

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<MemeTableView />
		</HydrationBoundary>
	);
}
