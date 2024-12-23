import { zodResolver } from "@hookform/resolvers/zod";
import type { UseMutationResult } from "@tanstack/react-query";
import {
    Button,
    FormCss,
    FormError,
    FormInput,
    Select,
    Tx,
} from "@use-pico/client";
import {
    ErrorSchema,
    onAxiosSchemaError,
    translator,
    withErrors,
} from "@use-pico/common";
import type { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import type { BlueprintSchema } from "~/app/derivean/blueprint/schema/BlueprintSchema";
import { BlueprintShapeSchema } from "~/app/derivean/blueprint/schema/BlueprintShapeSchema";
import { BlueprintIcon } from "~/app/derivean/icon/BlueprintIcon";

export namespace BlueprintForm {
	export interface Props {
		mutation: UseMutationResult<
			BlueprintSchema.Type,
			Error,
			BlueprintShapeSchema.Type
		>;
		onSuccess(blueprint: BlueprintSchema.Type): Promise<void>;
		defaultValues?: BlueprintShapeSchema.Type;
	}
}

export const BlueprintForm: FC<BlueprintForm.Props> = ({
	mutation,
	defaultValues,
	onSuccess,
}) => {
	const form = useForm<BlueprintShapeSchema.Type>({
		resolver: zodResolver(BlueprintShapeSchema),
		defaultValues,
	});

	const tva = FormCss({
		isLoading: form.formState.isLoading,
		isSubmitting: form.formState.isSubmitting,
	}).slots;

	return (
		<form
			className={tva.base()}
			onSubmit={form.handleSubmit(async (values) => {
				return mutation
					.mutateAsync(values, {
						onSuccess,
						onError: (error) => {
							withErrors({
								error,
								errors: [
									onAxiosSchemaError({
										error,
										schema: ErrorSchema,
										onError: ({ data }) => {
											form.setError("root", {
												message: data.message,
											});
										},
									}),
								],
								onError: (error) => {
									form.setError("root", {
										message: error.message,
									});
								},
							});
						},
					})
					.catch(() => {
						//
					});
			})}
		>
			<FormError
				variant={{ highlight: true }}
				error={form.formState.errors.root}
			/>

			<FormInput
				formState={form.formState}
				name={"name"}
				label={<Tx label={"Blueprint name (label)"} />}
			>
				<input
					type={"text"}
					className={tva.input()}
					{...form.register("name")}
				/>
			</FormInput>

			<FormInput
				formState={form.formState}
				name={"kind"}
				label={<Tx label={"Blueprint kind (label)"} />}
			>
				<Controller
					name={"kind"}
					control={form.control}
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					render={({ field: { ref, ...field } }) => {
						return (
							<Select<{ id: string; value: string }>
								css={{
									base: tva.input(),
								}}
								textSelect={<Tx label={"Select blueprint kind (label)"} />}
								items={[
									{
										id: "building",
										value: translator.text("Blueprint kind - building"),
									},
									{
										id: "item",
										value: translator.text("Blueprint kind - item"),
									},
								]}
								render={({ entity }) => entity.value}
								{...field}
							/>
						);
					}}
				/>
			</FormInput>

			<div className={"flex flex-row justify-between gap-8"}>
				<Button
					iconEnabled={BlueprintIcon}
					type={"submit"}
				>
					<Tx label={"Save blueprint (submit)"} />
				</Button>
			</div>
		</form>
	);
};
