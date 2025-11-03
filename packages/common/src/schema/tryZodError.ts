import { z } from "zod";

export const tryZodError = <TSchema extends z.ZodType>(
	schema: TSchema,
	data: unknown,
) => {
	try {
		return schema.parse(data);
	} catch (error) {
		if (error instanceof z.ZodError) {
			// console.error(z.formatError(error));

			const seen = new WeakSet();
			console.log(
				"data",
				JSON.stringify(
					data,
					(_key, value) => {
						if (typeof value === "object" && value !== null) {
							if (seen.has(value)) {
								return "[Circular]";
							}
							seen.add(value);
						}
						return value;
					},
					2,
				),
			);
		}
		throw error;
	}
};
