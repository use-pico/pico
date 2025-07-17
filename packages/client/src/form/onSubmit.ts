import { useRouter } from "@tanstack/react-router";
import {
	cleanOf,
	ErrorSchema,
	mapEmptyToNull,
	onAxiosSchemaError,
	type ShapeSchema,
	withErrors,
} from "@use-pico/common";
import type { z } from "zod";
import type { Form } from "./Form";

export namespace onSubmit {
	export interface Props<TShapeSchema extends ShapeSchema> {
		mutation: Form.Props.Mutation<TShapeSchema>;
		onError?(error: string): void;
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
	mutation,
	onError,
	map = ({ cleanup }) => {
		return cleanup();
	},
}: onSubmit.Props<TShapeSchema>) => {
	const router = useRouter();
	return async (values: z.infer<TShapeSchema>) => {
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
										onError?.(data.message);
									},
								}),
							],
							onError(error) {
								console.log("Error", error);
								onError?.(error.message);
							},
						});
					},
				},
			)
			.catch(() => {
				//
			});
	};
};
