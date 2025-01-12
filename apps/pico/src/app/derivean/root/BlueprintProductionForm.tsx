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
import { ProductionIcon } from "~/app/derivean/icon/ProductionIcon";
import { ResourcePopupSelect } from "~/app/derivean/root/ResourcePopupSelect";
import { BlueprintProductionSchema } from "~/app/derivean/schema/BlueprintProductionSchema";

export namespace BlueprintProductionForm {
	export interface Props
		extends Form.Props<BlueprintProductionSchema["shape"]> {
		//
	}
}

export const BlueprintProductionForm: FC<BlueprintProductionForm.Props> = ({
	mutation,
	defaultValues,
	variant,
	tva = FormCss,
	css,
}) => {
	const form = useForm<BlueprintProductionSchema["~shape"]>({
		resolver: zodResolver(BlueprintProductionSchema.shape),
		defaultValues: {
			amount: 1,
			limit: 1,
			cycles: 1,
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
				name={"cycles"}
				label={<Tx label={"Production cycles (label)"} />}
				hint={<Tx label={"Production cycles (hint)"} />}
			>
				<input
					type={"number"}
					className={tv.input()}
					{...form.register("cycles")}
				/>
			</FormInput>

			<FormInput
				formState={form.formState}
				name={"limit"}
				label={<Tx label={"Production limit (label)"} />}
				hint={<Tx label={"Production limit (hint)"} />}
			>
				<input
					type={"number"}
					className={tv.input()}
					{...form.register("limit")}
				/>
			</FormInput>

			<div className={"flex flex-row justify-between gap-8"}>
				<Button
					iconEnabled={ProductionIcon}
					type={"submit"}
				>
					<Tx label={"Save (submit)"} />
				</Button>
			</div>
		</form>
	);
};
