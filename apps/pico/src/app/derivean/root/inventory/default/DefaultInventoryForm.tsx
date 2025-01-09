import { zodResolver } from "@hookform/resolvers/zod";
import {
	Button,
	FormCss,
	FormError,
	FormInput,
	ModalContext,
	onSubmit,
	Tx,
	type Form,
} from "@use-pico/client";
import { useContext, type FC } from "react";
import { Controller, useForm } from "react-hook-form";
import { InventoryIcon } from "~/app/derivean/icon/InventoryIcon";
import { DefaultInventorySchema } from "~/app/derivean/inventory/default/DefaultInventorySchema";
import { ResourcePopupSelect } from "~/app/derivean/root/resource/ResourcePopupSelect";

export namespace DefaultInventoryForm {
	export interface Props extends Form.Props<DefaultInventorySchema["shape"]> {
		//
	}
}

export const DefaultInventoryForm: FC<DefaultInventoryForm.Props> = ({
	mutation,
	defaultValues,
	variant,
	tva = FormCss,
	css,
}) => {
	const form = useForm<DefaultInventorySchema["~shape"]>({
		resolver: zodResolver(DefaultInventorySchema.shape),
		defaultValues: {
			amount: 1,
			limit: 0,
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
			onSubmit={onSubmit<DefaultInventorySchema["shape"]>({
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
				label={<Tx label={"Limit (label)"} />}
				hint={<Tx label={"Inventory limit (hint)"} />}
			>
				<input
					type={"number"}
					className={tv.input()}
					{...form.register("limit")}
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
