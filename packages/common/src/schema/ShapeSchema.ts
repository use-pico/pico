import type { z } from "zod";

export type ShapeSchema<TShape extends z.core.$ZodShape = z.core.$ZodShape> =
	z.core.$ZodObject<TShape, z.core.$strip>;

export namespace ShapeSchema {
	export type Type<TShape extends z.core.$ZodShape = z.core.$ZodShape> =
		z.infer<ShapeSchema<TShape>>;
}
