import { z } from "zod";
import type { ShapeSchema } from "./ShapeSchema";

export namespace withCreateSchema {
	export interface Props<TShapeSchema extends ShapeSchema> {
		create: TShapeSchema;
	}
}

export const withCreateSchema = <TShapeSchema extends ShapeSchema>({
	create,
}: withCreateSchema.Props<TShapeSchema>) => {
	return z.object({
		create,
	});
};
