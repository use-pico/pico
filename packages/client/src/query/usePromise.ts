import type {
	RequestSchema,
	ResponseSchema
}                        from "@use-pico/common";
import {z}               from "zod";
import type {IWithQuery} from "./IWithQuery";

export namespace usePromise {
	export interface Props<
		TRequestSchema extends RequestSchema,
		TResponseSchema extends ResponseSchema,
	> {
		withQuery: IWithQuery<TRequestSchema, TResponseSchema>;
	}

	export type Callback<
		TRequestSchema extends RequestSchema,
		TResponseSchema extends ResponseSchema,
	> = (request: z.infer<TRequestSchema>) => Promise<z.infer<TResponseSchema>>;

	export type Result<
		TRequestSchema extends RequestSchema,
		TResponseSchema extends ResponseSchema,
	> = Callback<TRequestSchema, TResponseSchema>;
}

/**
 * This hook takes request/response schemas and request itself, execute promise callback and return (validated) response.
 */
export const usePromise = <
	TRequestSchema extends RequestSchema,
	TResponseSchema extends ResponseSchema,
>(
	{
		withQuery: {
					   useCallback,
					   schema
				   },
	}: usePromise.Props<TRequestSchema, TResponseSchema>
): usePromise.Result<TRequestSchema, TResponseSchema> => {
	const callback = useCallback();
	return async request => {
		try {
			return schema.response.parse(
				await callback(
					schema.request.parse(
						request
					)
				)
			);
		} catch (e) {
			console.error(e instanceof z.ZodError ? e.errors : e);
			throw e;
		}
	};
};
