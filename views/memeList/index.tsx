"use client";
// libs
import { useSuspenseQuery } from "@tanstack/react-query";
import { memesOptions } from "@/app/meme-list/page";
import { Heart } from "lucide-react";

// hero-ui
import { Image } from "@heroui/image";
import { Card, CardBody, CardHeader } from "@heroui/card";

// common
import { MemeType } from "@/models/meme";

// Tailwind for grid
export default function MemeListView() {
	const { data } = useSuspenseQuery(memesOptions);

	return (
		<div className="p-4">
			<h1 className="text-2xl font-bold mb-4">Meme List</h1>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
				{data.map((meme: MemeType) => (
					<Card key={meme.id} className="h-full">
						<CardHeader>
							<h3 className="text-lg font-semibold">{meme.name}</h3>
						</CardHeader>
						<CardBody>
							<div className="flex justify-center">
								<Image
									src={meme.url}
									alt={meme.name}
									className="object-cover w-full h-48 rounded-xl"
								/>
							</div>
							<div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
								<Heart fill="red" color="red" size={18} />
								{meme.likes}
							</div>
							<a
								href={meme.url}
								target="_blank"
								rel="noopener noreferrer"
								className="text-blue-500 underline mt-2 inline-block text-sm"
							>
								View Meme
							</a>
						</CardBody>
					</Card>
				))}
			</div>
		</div>
	);
}
