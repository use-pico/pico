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
import type { FC } from "react";
import { useForm } from "react-hook-form";
import { InventoryIcon } from "~/app/derivean/icon/InventoryIcon";
import type { InventorySchema } from "~/app/derivean/inventory/schema/InventorySchema";
import { InventoryShapeSchema } from "~/app/derivean/inventory/schema/InventoryShapeSchema";

export namespace InventoryForm {
	export interface Props
		extends Form.Props<InventorySchema, InventoryShapeSchema> {
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
	const form = useForm<InventoryShapeSchema.Type>({
		resolver: zodResolver(InventoryShapeSchema),
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
			onSubmit={onSubmit<InventoryShapeSchema, InventorySchema>({
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
