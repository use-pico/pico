import type { z } from "zod";

export type ShapeSchema<TShape extends z.ZodRawShape = z.ZodRawShape> =
	z.ZodObject<TShape, "strip">;
export namespace ShapeSchema {
	export type Type<TShape extends z.ZodRawShape = z.ZodRawShape> = z.infer<
		ShapeSchema<TShape>
	>;
}
