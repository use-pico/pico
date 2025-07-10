import { useRouter } from "@tanstack/react-router";
import type { ShapeSchema } from "@use-pico/common";
import {
	cleanOf,
	ErrorSchema,
	mapEmptyToNull,
	onAxiosSchemaError,
	withErrors,
} from "@use-pico/common";
import type { UseFormReturn } from "react-hook-form";
import type { z } from "zod";
import type { Form } from "./Form";

export namespace onSubmit {
	export interface Props<TShapeSchema extends ShapeSchema> {
		form: UseFormReturn<z.infer<TShapeSchema>>;
		mutation: Form.Props.Mutation<TShapeSchema>;
		/**
		 * Map form values to mutation request values (output of this goes directly into mutation).
		 *
		 * IF you need different behavior, just pass your own map function.
		 */
		map?(props: {
			/**
			 * Values from the form
			 */
			values: z.infer<TShapeSchema>;
			/**
			 * Default cleanup function returns values: undefined => null.
			 *
			 * Result is `any`, because mutation request is not known here, also
			 * because some values ("randomly") may disappear as they're undefined,
			 * output schema may not match values provided.
			 */
			cleanup(): any;
		}): Promise<any>;
	}
}

export const onSubmit = <TShapeSchema extends ShapeSchema>({
	form,
	mutation,
	map = ({ cleanup }) => {
		return cleanup();
	},
}: onSubmit.Props<TShapeSchema>) => {
	const router = useRouter();
	const submit = form.handleSubmit(async (values) => {
		return mutation
			.mutateAsync(
				await map({
					values,
					cleanup() {
						return cleanOf(mapEmptyToNull(values));
					},
				}),
				{
					onSuccess() {
						router.invalidate();
					},
					onError(error) {
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
							onError(error) {
								console.log("Error", error);
								form.setError("root", {
									message: error.message,
								});
							},
						});
					},
				},
			)
			.catch(() => {
				//
			});
	});

	return (e: any) => {
		e.stopPropagation();
		submit(e);
	};
};
