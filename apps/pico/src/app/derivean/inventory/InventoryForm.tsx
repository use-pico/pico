import { zodResolver } from "@hookform/resolvers/zod";
import {
    Button,
    FormCss,
    FormError,
    FormInput,
    onSubmit,
    Tx,
    type Form,
} from "@use-pico/client";
import type { withRepositorySchema } from "@use-pico/common";
import type { FC } from "react";
import { useForm } from "react-hook-form";
import { InventoryIcon } from "~/app/derivean/icon/InventoryIcon";
import { InventorySchema } from "~/app/derivean/inventory/InventorySchema";

export namespace InventoryForm {
	export interface Props
		extends Form.Props<InventorySchema["entity"], InventorySchema["shape"]> {
		//
	}
}

export const InventoryForm: FC<InventoryForm.Props> = ({
	mutation,
	defaultValues,
	onSuccess,
	variant,
	tva = FormCss,
	css,
}) => {
	const form = useForm<withRepositorySchema.Shape<InventorySchema>>({
		resolver: zodResolver(InventorySchema.shape),
		defaultValues,
	});

	const tv = tva({
		...variant,
		isLoading: form.formState.isLoading,
		isSubmitting: form.formState.isSubmitting,
		css,
	}).slots;

	return (
		<form
			className={tv.base()}
			onSubmit={onSubmit<InventorySchema["entity"], InventorySchema["shape"]>({
				form,
				mutation,
				onSuccess,
			})}
		>
			<FormError
				variant={{ highlight: true }}
				error={form.formState.errors.root}
			/>

			<FormInput
				formState={form.formState}
				name={"name"}
				label={<Tx label={"Slot name (label)"} />}
			>
				<input
					type={"text"}
					className={tv.input()}
					{...form.register("name")}
				/>
			</FormInput>

			<div className={"flex flex-row justify-between gap-8"}>
				<Button
					iconEnabled={InventoryIcon}
					type={"submit"}
				>
					<Tx label={"Save slot (submit)"} />
				</Button>
			</div>
		</form>
	);
};
