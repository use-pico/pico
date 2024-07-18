import type { ResponseSchema } from "@use-pico/common";
import {
	type FC,
	type PropsWithChildren
} from "react";
import { type z } from "zod";
import { IWithQuery } from "./IWithQuery";

export namespace CollectionResult {
	export type Props<
		TResponseSchema extends ResponseSchema,
	> = PropsWithChildren<{
		result: IWithQuery.Result<z.ZodArray<TResponseSchema>>;
		loader?: FC;
		success?: FC<{
			collection: NonNullable<z.infer<TResponseSchema>>[];
		}>;
		response?: FC<{
			collection: z.infer<TResponseSchema>[];
		}>;
		error?: FC<{
			error: any;
		}>;
	}>
}

export const CollectionResult = <
	TResponseSchema extends ResponseSchema,
>(
	{
		result,
		loader:   Loader,
		success:  Success,
		response: Response,
		error:    Error,
		children
	}: CollectionResult.Props<TResponseSchema>
) => {
	if (result.isFetching && Loader) {
		return <Loader/>;
	} else if (result.isSuccess && result.data && Success) {
		return <Success collection={result.data}/>;
	} else if (result.isSuccess && Response) {
		return <Response collection={result.data}/>;
	} else if (result.isError && Error) {
		return <Error error={result.error}/>;
	}
	return children;
};
