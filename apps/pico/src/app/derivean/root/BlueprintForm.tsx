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
import { BlueprintIcon } from "~/app/derivean/icon/BlueprintIcon";
import { BlueprintPopupSelect } from "~/app/derivean/root/BlueprintPopupSelect";
import { BlueprintSchema } from "~/app/derivean/schema/BlueprintSchema";

export namespace BlueprintForm {
	export interface Props extends Form.Props<BlueprintSchema["shape"]> {
		//
	}
}

export const BlueprintForm: FC<BlueprintForm.Props> = ({
	mutation,
	defaultValues,
	variant,
	tva = FormCss,
	css,
}) => {
	const form = useForm<BlueprintSchema["~shape"]>({
		resolver: zodResolver(BlueprintSchema.shape),
		defaultValues: {
			cycles: 1,
			productionLimit: 1,
			sort: 0,
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
			onSubmit={onSubmit<BlueprintSchema["shape"]>({
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
				name={"upgradeId"}
				label={<Tx label={"Upgrade to (label)"} />}
			>
				<Controller
					control={form.control}
					name={"upgradeId"}
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

			<FormInput
				formState={form.formState}
				name={"productionLimit"}
				label={<Tx label={"Production limit (label)"} />}
				hint={<Tx label={"How many paralel production lines can run (hint)"} />}
				required
			>
				<input
					type={"number"}
					className={tv.input()}
					{...form.register("productionLimit")}
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

			<FormInput
				formState={form.formState}
				name={"sort"}
				label={<Tx label={"Blueprint sort (label)"} />}
				hint={<Tx label={"Sort blueprints by this number (hint)"} />}
				required
			>
				<input
					type={"number"}
					className={tv.input()}
					{...form.register("sort")}
				/>
			</FormInput>

			<div className={"flex flex-row justify-between gap-8"}>
				<Button
					iconEnabled={BlueprintIcon}
					type={"submit"}
				>
					<Tx label={"Save (submit)"} />
				</Button>
			</div>
		</form>
	);
};
