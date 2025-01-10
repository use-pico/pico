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
import {
    Building_Base_PopupSelect
} from "~/app/derivean/root/building/Building_Base_PopupSelect";
import { Building_Schema } from "~/app/derivean/schema/building/Building_Schema";

export namespace Building_Form {
	export interface Props extends Form.Props<Building_Schema["shape"]> {
		//
	}
}

export const Building_Form: FC<Building_Form.Props> = ({
	mutation,
	defaultValues,
	variant,
	tva = FormCss,
	css,
}) => {
	const form = useForm<Building_Schema["~shape"]>({
		resolver: zodResolver(Building_Schema.shape),
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
				name={"buildingBaseId"}
				label={<Tx label={"Select building base (label)"} />}
			>
				<Controller
					control={form.control}
					name={"buildingBaseId"}
					render={({ field: { ref: _, ...field } }) => {
						return (
							<Building_Base_PopupSelect
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
