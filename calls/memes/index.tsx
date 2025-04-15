// libs
import axios from "axios";
import { queryOptions } from "@tanstack/react-query";

// common
import { UpdateMemeRequest } from "./types";
import { MemeType } from "@/models/meme";

export const memesOptions = queryOptions({
	queryKey: ["listMemes"],
	queryFn: listMemes,
});

export async function listMemes(): Promise<Array<MemeType>> {
	const response = await axios.get(
		"https://62017a1afdf5090017249a2e.mockapi.io/items"
	);

	return response.data;
}

export async function updateMeme(
	id: string,
	data: Partial<UpdateMemeRequest>
): Promise<MemeType> {
	const response = await axios.put(
		`https://62017a1afdf5090017249a2e.mockapi.io/items/${id}`,
		data
	);
	return response.data;
}
