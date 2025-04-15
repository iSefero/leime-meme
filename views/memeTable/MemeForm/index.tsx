// libs
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// hero-ui
import { Button } from "@heroui/button";
import { addToast } from "@heroui/toast";
import { Input } from "@heroui/input";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@heroui/modal";
import { Form } from "@heroui/form";

// common
import { MemeFormProps, MemeFormValues } from "./types";
import { updateMeme } from "@/calls/memes";

const isValidUrl = (url: string): boolean =>
	/^https?:\/\/.*\.(jpg|jpeg)$/i.test(url);

export function EditMemeForm({
	editMeme,
	onClose,
	selectedMeme,
}: MemeFormProps) {
	const queryClient = useQueryClient();

	const {
		register,
		handleSubmit,
		formState: { isSubmitting, isDirty, errors },
	} = useForm<MemeFormValues>({
		defaultValues: {
			id: selectedMeme.id,
			name: selectedMeme.name,
			url: selectedMeme.url,
			likes: selectedMeme.likes,
		},
	});

	const { mutate } = useMutation({
		mutationFn: (data: MemeFormValues) => updateMeme(data.id, data),
		onSuccess: data => {
			addToast({
				title: "Success",
				description: `Meme ${data.name} has been updated successfully`,
				color: "success",
			});
			queryClient.invalidateQueries({ queryKey: ["listMemes"] });
			onClose();
		},
		onError: () => {
			addToast({
				title: "Error!",
				description: "Something went wrong with the update meme.",
				color: "danger",
			});
		},
	});

	const onSubmit = (data: MemeFormValues) => {
		mutate(data);
	};

	return (
		<Modal isOpen={!!editMeme} onClose={onClose}>
			<ModalContent>
				<ModalHeader>Edit Meme</ModalHeader>
				<ModalBody>
					<Form onSubmit={handleSubmit(onSubmit)}>
						<Input
							labelPlacement="outside"
							label="Name"
							isRequired
							minLength={3}
							maxLength={99}
							placeholder="Name"
							{...register("name")}
						/>
						<Input
							labelPlacement="outside"
							label="URL"
							isRequired
							isInvalid={!!errors.url?.message}
							errorMessage={errors.url?.message}
							placeholder="Image URL (.jpg)"
							{...register("url", {
								validate: {
									isValidURL: url => {
										if (!url.length) return "URL is required!";
										if (!isValidUrl(url))
											return "Only images in jpg/jpeg format ";
									},
								},
							})}
						/>
						<Input
							labelPlacement="outside"
							label="Likes"
							type="number"
							isRequired
							isInvalid={!!errors.likes?.message}
							errorMessage={errors.likes?.message}
							placeholder="Likes (0-99)"
							{...register("likes", {
								validate: {
									isValidLikesRange: likes => {
										if (likes > 99 || likes < 0)
											return "The number of likes should be between 0 and 99";
									},
								},
								valueAsNumber: true,
							})}
						/>
						<div className="pt-3 flex justify-end w-full">
							<Button
								isDisabled={!isDirty}
								variant="bordered"
								isLoading={isSubmitting}
								type="submit"
							>
								Save
							</Button>
						</div>
					</Form>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
}
