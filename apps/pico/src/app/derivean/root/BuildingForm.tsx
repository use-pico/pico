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
import { BuildingIcon } from "~/app/derivean/icon/BuildingIcon";
import { BlueprintPopupSelect } from "~/app/derivean/root/BlueprintPopupSelect";
import { BuildingSchema } from "~/app/derivean/schema/BuildingSchema";

export namespace BuildingForm {
	export interface Props extends Form.Props<BuildingSchema["shape"]> {
		//
	}
}

export const BuildingForm: FC<BuildingForm.Props> = ({
	mutation,
	defaultValues,
	variant,
	tva = FormCss,
	css,
}) => {
	const form = useForm<BuildingSchema["~shape"]>({
		resolver: zodResolver(BuildingSchema.shape),
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
				name={"blueprintId"}
				label={<Tx label={"Select blueprint (label)"} />}
			>
				<Controller
					control={form.control}
					name={"blueprintId"}
					render={({ field: { ref: _, ...field } }) => {
						return (
							<BlueprintPopupSelect
								allowEmpty
								{...field}
							/>
						);
					}}
				/>
			</FormInput>

			<div className={"flex flex-row justify-between gap-8"}>
				<Button
					iconEnabled={BuildingIcon}
					type={"submit"}
				>
					<Tx label={"Save (submit)"} />
				</Button>
			</div>
		</form>
	);
};
