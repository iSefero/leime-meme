import { MemeType } from "@/models/meme";

export type MemeFormProps = {
	editMeme: boolean;
	onClose: () => void;
	selectedMeme: MemeType;
};

export type MemeFormValues = {
	id: string;
	name: string;
	url: string;
	likes: number;
};
