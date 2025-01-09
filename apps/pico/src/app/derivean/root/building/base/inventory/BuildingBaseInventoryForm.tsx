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
import { type FC } from "react";
import { Controller, useForm } from "react-hook-form";
import { BuildingBaseInventorySchema } from "~/app/derivean/building/base/inventory/BuildingBaseInventorySchema";
import { InventoryIcon } from "~/app/derivean/icon/InventoryIcon";
import { ResourcePopupSelect } from "~/app/derivean/root/resource/ResourcePopupSelect";

export namespace BuildingBaseInventoryForm {
	export interface Props
		extends Form.Props<BuildingBaseInventorySchema["shape"]> {
		//
	}
}

export const BuildingBaseInventoryForm: FC<BuildingBaseInventoryForm.Props> = ({
	mutation,
	defaultValues,

	variant,
	tva = FormCss,
	css,
}) => {
	const form = useForm<BuildingBaseInventorySchema["~shape"]>({
		resolver: zodResolver(BuildingBaseInventorySchema.shape),
		defaultValues: {
			amount: 1,
			limit: 0,
			level: 1,
			...defaultValues,
		},
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
			onSubmit={onSubmit({
				form,
				mutation,
			})}
		>
			<FormError
				variant={{ highlight: true }}
				error={form.formState.errors.root}
			/>

			<FormInput
				formState={form.formState}
				name={"resourceId"}
				label={<Tx label={"Resource name (label)"} />}
			>
				<Controller
					control={form.control}
					name={"resourceId"}
					render={({ field: { ref: _, ...field } }) => {
						return (
							<ResourcePopupSelect
								textTitle={<Tx label={"Select resource (title)"} />}
								allowEmpty
								{...field}
							/>
						);
					}}
				/>
			</FormInput>

			<FormInput
				formState={form.formState}
				name={"amount"}
				label={<Tx label={"Amount (label)"} />}
			>
				<input
					type={"number"}
					className={tv.input()}
					{...form.register("amount")}
				/>
			</FormInput>

			<FormInput
				formState={form.formState}
				name={"limit"}
				label={<Tx label={"Inventory limit (label)"} />}
			>
				<input
					type={"number"}
					className={tv.input()}
					{...form.register("limit")}
				/>
			</FormInput>

			<FormInput
				formState={form.formState}
				name={"level"}
				label={<Tx label={"Inventory level (label)"} />}
				hint={<Tx label={"Inventory level (hint)"} />}
			>
				<input
					type={"number"}
					className={tv.input()}
					{...form.register("level")}
				/>
			</FormInput>

			<div className={"flex flex-row justify-between gap-8"}>
				<Button
					iconEnabled={InventoryIcon}
					type={"submit"}
				>
					<Tx label={"Save (submit)"} />
				</Button>
			</div>
		</form>
	);
};
