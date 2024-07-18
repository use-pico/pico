import {
	type MutationKey,
	type UseMutationOptions,
	type UseMutationResult
}                          from "@tanstack/react-query";
import type {
	RequestSchema,
	ResponseSchema
}                          from "@use-pico/common";
import {type z}            from "zod";
import {type IInvalidator} from "./IInvalidator";

export interface IWithMutation<
	TRequestSchema extends RequestSchema,
	TResponseSchema extends ResponseSchema,
> extends IInvalidator {
	/**
	 * Mutation key used in React Query
	 */
	readonly key: MutationKey;
	schema: {
		request: TRequestSchema,
		response: TResponseSchema,
	};
	defaultOptions?: IWithMutation.Options<TRequestSchema, TResponseSchema>;

	useCallback(): (request: z.infer<TRequestSchema>) => Promise<z.infer<TResponseSchema>>;
}

export namespace IWithMutation {
	export type Options<
		TRequestSchema extends RequestSchema,
		TResponseSchema extends ResponseSchema,
	> = Omit<
		UseMutationOptions<
			z.infer<TResponseSchema>,
			any,
			z.infer<TRequestSchema>
		>,
		"mutationFn"
	>;

	export type Result<
		TRequestSchema extends RequestSchema,
		TResponseSchema extends ResponseSchema,
	> = UseMutationResult<
		z.infer<TResponseSchema>,
		any,
		z.infer<TRequestSchema>
	>;
}
