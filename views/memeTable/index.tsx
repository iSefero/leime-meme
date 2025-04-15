"use client";
// libs
import { useCallback, useState } from "react";
import { Heart, Pencil } from "lucide-react";

// hero-ui
import {
	Table,
	TableHeader,
	TableRow,
	TableCell,
	TableColumn,
	TableBody,
} from "@heroui/table";
import { Tooltip } from "@heroui/tooltip";
import { useDisclosure } from "@heroui/modal";
import { Button } from "@heroui/button";

// common
import { EditMemeForm } from "./MemeForm";
import { MemeType } from "@/models/meme";
import { useSuspenseQuery } from "@tanstack/react-query";
import { memesOptions } from "@/app/meme-table/page";

export const columns = [
	{ name: "ID", uid: "id" },
	{ name: "Name", uid: "name" },
	{ name: "Likes", uid: "likes" },
	{ name: "Action", uid: "actions" },
];

export default function MemeTableView() {
	const { data } = useSuspenseQuery(memesOptions);
	const { isOpen, onClose, onOpen } = useDisclosure();
	const [editMemeID, setEditMemeID] = useState<string | null>(null);

	function onOpenModal(id: string) {
		setEditMemeID(id);
		onOpen();
	}

	function onCloseModal() {
		setEditMemeID(null);
		onClose();
	}

	const renderCell = useCallback((meme: MemeType, columnKey: string) => {
		const cellValue = meme[columnKey as keyof MemeType];

		switch (columnKey) {
			case "id":
				return meme.id;
			case "name":
				return <span className="break-words">{meme.name}</span>;
			case "likes":
				return (
					<div className="flex gap-3">
						{meme.likes}
						<Heart fill="red" color="red" />
					</div>
				);
			case "actions":
				return (
					<Button onPress={() => onOpenModal(meme.id)}>
						<Tooltip content="Edit meme">
							<Pencil size={20} />
						</Tooltip>
					</Button>
				);
			default:
				return cellValue;
		}
	}, []);

	const selectedMeme = data.find(({ id }) => id === editMemeID);

	return (
		<div className="p-4">
			{selectedMeme && (
				<EditMemeForm
					onClose={onCloseModal}
					editMeme={isOpen}
					selectedMeme={selectedMeme}
				/>
			)}
			<h1 className="text-2xl font-bold mb-4">Meme Table</h1>
			<Table aria-label="meme-table">
				<TableHeader columns={columns}>
					{column => (
						<TableColumn
							key={column.uid}
							align={column.uid === "actions" ? "center" : "start"}
						>
							{column.name}
						</TableColumn>
					)}
				</TableHeader>
				<TableBody items={data}>
					{item => (
						<TableRow key={item.id}>
							{columnKey => (
								<TableCell>{renderCell(item, String(columnKey))}</TableCell>
							)}
						</TableRow>
					)}
				</TableBody>
			</Table>
		</div>
	);
}
