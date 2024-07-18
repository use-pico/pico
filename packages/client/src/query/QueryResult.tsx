import type { ResponseSchema } from "@use-pico/common";
import { type FC, type PropsWithChildren } from "react";
import { type z } from "zod";
import { IWithQuery } from "./IWithQuery";

export namespace QueryResult {
	export type Props<TResponseSchema extends ResponseSchema> =
		PropsWithChildren<{
			result: IWithQuery.Result<z.ZodOptional<z.ZodNullable<TResponseSchema>>>;
			/**
			 * Renders only when the query is loading (fetching is not handled).
			 */
			loader?: FC;
			/**
			 * Success, result is present.
			 */
			success?: FC<{
				entity: NonNullable<z.infer<TResponseSchema>>;
			}>;
			/**
			 * Success, result may be present.
			 */
			response?: FC<{
				entity: z.infer<TResponseSchema>;
			}>;
			/**
			 * Error, result is not present.
			 */
			error?: FC<{
				error: any;
			}>;
		}>;
}

export const QueryResult = <TResponseSchema extends ResponseSchema>({
	result,
	loader: Loader,
	success: Success,
	response: Response,
	error: Error,
	children,
}: QueryResult.Props<TResponseSchema>) => {
	if (result.isLoading && Loader) {
		return <Loader />;
	} else if (result.isSuccess && result.data && Success) {
		return <Success entity={result.data} />;
	} else if (result.isSuccess && Response) {
		return <Response entity={result.data} />;
	} else if (result.isError && Error) {
		return <Error error={result.error} />;
	}
	return children;
};
