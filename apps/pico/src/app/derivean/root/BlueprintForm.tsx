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
import { RegionPopupMultiSelect } from "~/app/derivean/root/RegionPopupMultiSelect";
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
			sort: 0,
			limit: 1,
			regionIds: [],
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
					min={1}
					{...form.register("cycles")}
				/>
			</FormInput>

			<FormInput
				formState={form.formState}
				name={"limit"}
				label={<Tx label={"Building limit (label)"} />}
				hint={
					<Tx label={"Maximum number of building a player can build (hint)"} />
				}
				required
			>
				<input
					type={"number"}
					className={tv.input()}
					min={1}
					{...form.register("limit")}
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
					min={0}
					{...form.register("sort")}
				/>
			</FormInput>

			<FormInput
				formState={form.formState}
				name={"regionIds"}
				label={<Tx label={"Regions (label)"} />}
			>
				<Controller
					control={form.control}
					name={"regionIds"}
					render={({ field: { ref: _, ...field } }) => {
						return <RegionPopupMultiSelect {...field} />;
					}}
				/>
			</FormInput>

			<FormInput
				formState={form.formState}
				name={"background"}
				label={<Tx label={"Building background (label)"} />}
				hint={<Tx label={"Building background (hint)"} />}
			>
				<input
					type={"text"}
					className={tv.input()}
					{...form.register("background")}
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
