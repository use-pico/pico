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
import { Controller, useForm } from "react-hook-form";
import { SlotIcon } from "~/app/derivean/icon/SlotIcon";
import { ItemKindSelect } from "~/app/derivean/item/ItemKindSelect";
import { SlotSchema } from "~/app/derivean/slot/SlotSchema";

export namespace SlotForm {
	export interface Props
		extends Form.Props<SlotSchema["output"], SlotSchema["shape"]> {
		//
	}
}

export const SlotForm: FC<SlotForm.Props> = ({
	mutation,
	defaultValues,
	onSuccess,
	variant,
	tva = FormCss,
	css,
}) => {
	const form = useForm<withRepositorySchema.Shape<SlotSchema>>({
		resolver: zodResolver(SlotSchema.shape),
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
			onSubmit={onSubmit<SlotSchema["output"], SlotSchema["shape"]>({
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

			<FormInput
				formState={form.formState}
				name={"size"}
				label={<Tx label={"Slot size (label)"} />}
			>
				<input
					type={"number"}
					className={tv.input()}
					{...form.register("size")}
				/>
			</FormInput>

			<FormInput
				formState={form.formState}
				name={"kind"}
				label={<Tx label={"Item kind (label)"} />}
			>
				<Controller
					name={"kind"}
					control={form.control}
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					render={({ field: { ref, ...field } }) => {
						return (
							<ItemKindSelect
								css={{
									base: tv.input(),
								}}
								{...field}
							/>
						);
					}}
				/>
			</FormInput>

			<div className={"flex flex-row justify-between gap-8"}>
				<Button
					iconEnabled={SlotIcon}
					type={"submit"}
				>
					<Tx label={"Save slot (submit)"} />
				</Button>
			</div>
		</form>
	);
};
