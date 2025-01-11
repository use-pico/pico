import { zodResolver } from "@hookform/resolvers/zod";
import {
	BoolInput,
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
import { ResourceIcon } from "~/app/derivean/icon/ResourceIcon";
import { Resource_PopupSelect } from "~/app/derivean/root/resource/Resource_PopupSelect";
import { Building_Base_Resource_Requirement_Schema } from "~/app/derivean/schema/building/Building_Base_Resource_Requirement_Schema";

export namespace Building_Base_Resource_Requirement_Form {
	export interface Props
		extends Form.Props<Building_Base_Resource_Requirement_Schema["shape"]> {
		//
	}
}

export const Building_Base_Resource_Requirement_Form: FC<
	Building_Base_Resource_Requirement_Form.Props
> = ({ mutation, defaultValues, variant, tva = FormCss, css }) => {
	const form = useForm<Building_Base_Resource_Requirement_Schema["~shape"]>({
		resolver: zodResolver(Building_Base_Resource_Requirement_Schema.shape),
		defaultValues: {
			amount: 1,
			passive: false,
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
				label={<Tx label={"Requirement (label)"} />}
			>
				<Controller
					control={form.control}
					name={"resourceId"}
					render={({ field: { ref: _, ...field } }) => {
						return (
							<Resource_PopupSelect
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
				name={"passive"}
				label={<Tx label={"Passive requirement (label)"} />}
				hint={<Tx label={"Passive requirement (hint)"} />}
			>
				<Controller
					control={form.control}
					name={"passive"}
					render={({ field: { ref: _, ...field } }) => {
						return <BoolInput {...field} />;
					}}
				/>
			</FormInput>

			<div className={"flex flex-row justify-between gap-8"}>
				<Button
					iconEnabled={ResourceIcon}
					type={"submit"}
				>
					<Tx label={"Save (submit)"} />
				</Button>
			</div>
		</form>
	);
};
