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
import { BuildingBaseIcon } from "~/app/derivean/icon/BuildingBaseIcon";
import { Building_Base_PopupSelect } from "~/app/derivean/root/building/Building_Base_PopupSelect";
import { Building_Base_Building_Base_Requirement_Schema } from "~/app/derivean/schema/building/Building_Base_Building_Base_Requirement_Schema";

export namespace Building_Base_Building_Base_Requirement_Form {
	export interface Props
		extends Form.Props<
			Building_Base_Building_Base_Requirement_Schema["shape"]
		> {
		//
	}
}

export const Building_Base_Building_Base_Requirement_Form: FC<
	Building_Base_Building_Base_Requirement_Form.Props
> = ({ mutation, defaultValues, variant, tva = FormCss, css }) => {
	const form = useForm<
		Building_Base_Building_Base_Requirement_Schema["~shape"]
	>({
		resolver: zodResolver(Building_Base_Building_Base_Requirement_Schema.shape),
		defaultValues: {
			amount: 1,
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
				name={"requirementId"}
				label={<Tx label={"Requirement (label)"} />}
			>
				<Controller
					control={form.control}
					name={"requirementId"}
					render={({ field: { ref: _, ...field } }) => {
						return (
							<Building_Base_PopupSelect
								textTitle={<Tx label={"Select building base (title)"} />}
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

			<div className={"flex flex-row justify-between gap-8"}>
				<Button
					iconEnabled={BuildingBaseIcon}
					type={"submit"}
				>
					<Tx label={"Save (submit)"} />
				</Button>
			</div>
		</form>
	);
};
