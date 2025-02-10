import type { z } from "zod";

export namespace Entity {
	export interface Schema<TSchema extends z.ZodSchema> {
		entity: z.infer<TSchema>;
	}

	export interface Schema$<TSchema extends z.ZodSchema> {
		entity?: z.infer<TSchema>;
	}

	export interface Type<TShape> {
		entity: TShape;
	}
}
