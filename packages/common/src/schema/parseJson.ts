import {type z} from "zod";

export const parseJson = <
	const TSchema extends z.ZodSchema,
>(
	schema: TSchema,
	json: string | null | undefined,
) => {
	if (json === null) {
		return schema.parse(null);
	} else if (json === undefined) {
		return schema.parse(undefined);
	}
	return schema.parse(JSON.parse(json));
};
