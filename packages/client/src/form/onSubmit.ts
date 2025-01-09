import { ErrorSchema, onAxiosSchemaError, withErrors } from "@use-pico/common";
import type { ShapeSchema } from "@use-pico/common/src/schema/ShapeSchema";
import type { UseFormReturn } from "react-hook-form";
import type { z } from "zod";
import type { Form } from "./Form";

export namespace onSubmit {
	export interface Props<TShapeSchema extends ShapeSchema> {
		form: UseFormReturn<z.infer<TShapeSchema>>;
		mutation: Form.Props.Mutation<TShapeSchema>;
	}
}

export const onSubmit = <TShapeSchema extends ShapeSchema>({
	form,
	mutation,
}: onSubmit.Props<TShapeSchema>) => {
	const submit = form.handleSubmit(async (values) => {
		return mutation
			.mutateAsync(values, {
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
	});

	return (e: any) => {
		e.stopPropagation();
		submit(e);
	};
};
