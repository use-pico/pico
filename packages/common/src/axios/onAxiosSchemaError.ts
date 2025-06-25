import { AxiosError } from "axios";
import type { z } from "zod";

export namespace onAxiosSchemaError {
	export interface Props<TSchema extends z.ZodSchema> {
		error: any;
		schema: TSchema;
		onError(props: { error: AxiosError; data: z.infer<TSchema> }): void;
	}
}

/**
 * Handle Axios error with Zod schema.
 *
 * If response matches the given schema, onError callback is called.
 */
export const onAxiosSchemaError = <TSchema extends z.ZodSchema>({
	error,
	schema,
	onError,
}: onAxiosSchemaError.Props<TSchema>) => {
	const isError = error instanceof AxiosError;
	if (isError) {
		const result = schema.safeParse(error.response?.data);
		result.success &&
			onError({
				error,
				data: result.data,
			});
		return result.success;
	}
	return false;
};
