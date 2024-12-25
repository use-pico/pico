import type { UseMutationResult } from "@tanstack/react-query";
import {
    ErrorSchema,
    type IdentitySchema,
    onAxiosSchemaError,
    withErrors,
} from "@use-pico/common";
import type { ShapeSchema } from "@use-pico/common/src/schema/ShapeSchema";
import type { UseFormReturn } from "react-hook-form";
import type { z } from "zod";

export namespace onSubmit {
	export interface Props<
		TShapeSchema extends ShapeSchema,
		TEntitySchema extends IdentitySchema,
	> {
		form: UseFormReturn<z.infer<TShapeSchema>>;
		mutation: UseMutationResult<
			z.infer<TEntitySchema>,
			Error,
			z.infer<TShapeSchema>
		>;
		onSuccess(entity: z.infer<TEntitySchema>): Promise<void>;
	}
}

export const onSubmit = <
	TShapeSchema extends ShapeSchema,
	TEntitySchema extends IdentitySchema,
>({
	form,
	mutation,
	onSuccess,
}: onSubmit.Props<TShapeSchema, TEntitySchema>) => {
	return form.handleSubmit(async (values) => {
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
	});
};
