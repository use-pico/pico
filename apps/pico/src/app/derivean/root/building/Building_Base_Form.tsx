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
import { useForm } from "react-hook-form";
import { BuildingBaseIcon } from "~/app/derivean/icon/BuildingBaseIcon";
import { Building_Base_Schema } from "~/app/derivean/schema/building/Building_Base_Schema";

export namespace Building_Base_Form {
	export interface Props extends Form.Props<Building_Base_Schema["shape"]> {
		//
	}
}

export const Building_Base_Form: FC<Building_Base_Form.Props> = ({
	mutation,
	defaultValues,
	variant,
	tva = FormCss,
	css,
}) => {
	const form = useForm<Building_Base_Schema["~shape"]>({
		resolver: zodResolver(Building_Base_Schema.shape),
		defaultValues: {
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
			onSubmit={onSubmit<Building_Base_Schema["shape"]>({
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
				name={"name"}
				label={<Tx label={"Building name (label)"} />}
				required
			>
				<input
					type={"text"}
					className={tv.input()}
					{...form.register("name")}
				/>
			</FormInput>

			<FormInput
				formState={form.formState}
				name={"cycles"}
				label={<Tx label={"Construction cycles (label)"} />}
				hint={<Tx label={"Amount of cycles to build this building (hint)"} />}
				required
			>
				<input
					type={"number"}
					className={tv.input()}
					{...form.register("cycles")}
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
