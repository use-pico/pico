import type { z } from "zod";
import type { PatchSchema } from "./PatchSchema";

export const isPatchSchema = <TPatchSchema extends PatchSchema<any, any>>(
	schema: TPatchSchema,
	patch: any,
): patch is z.infer<TPatchSchema> => {
	return schema.safeParse(patch).success;
};
