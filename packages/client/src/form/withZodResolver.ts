import { zodResolver } from "@hookform/resolvers/zod";
import { isEmpty } from "@use-pico/common";
import type { FieldValues, Resolver } from "react-hook-form";
import type { z } from "zod";

export const withZodResolver = <TFieldValues extends FieldValues>(
	schema: z.ZodSchema<TFieldValues, any, any>,
): Resolver<z.infer<typeof schema>> => {
	const resolver = zodResolver(schema);

	return async (values, context, options) => {
		const result = await resolver(values, context, options);

		if (!isEmpty(result.errors)) {
			console.warn("Validation failed");
			console.warn("\t -", values);
			console.warn("\t -", result.errors);
		}

		return result;
	};
};
