import type { z } from "zod";
import type { ShapeSchema } from "./ShapeSchema";

export const isCreateSchema = <TShapeSchema extends ShapeSchema>(
	schema: TShapeSchema,
	create: any,
): create is z.infer<TShapeSchema> => {
	return schema.safeParse(create).success;
};
