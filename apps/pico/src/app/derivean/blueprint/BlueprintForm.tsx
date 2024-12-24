import { zodResolver } from "@hookform/resolvers/zod";
import {
    Button,
    FormCss,
    FormError,
    FormInput,
    Select,
    Tx,
    type Form,
} from "@use-pico/client";
import { ErrorSchema, onAxiosSchemaError, withErrors } from "@use-pico/common";
import type { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import { BlueprintType } from "~/app/derivean/blueprint/BlueprintType";
import type { BlueprintSchema } from "~/app/derivean/blueprint/schema/BlueprintSchema";
import { BlueprintShapeSchema } from "~/app/derivean/blueprint/schema/BlueprintShapeSchema";
import { BlueprintIcon } from "~/app/derivean/icon/BlueprintIcon";
import { KindInline } from "~/app/derivean/item/KindInline";

export namespace BlueprintForm {
	export interface Props
		extends Form.Props<BlueprintSchema, BlueprintShapeSchema> {
		//
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
								items={BlueprintType.map((type) => ({
									id: type,
									value: type,
								}))}
								render={({ entity }) => <KindInline kind={entity.value} />}
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
