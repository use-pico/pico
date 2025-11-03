import { z } from "zod";
import { translator } from "../translator/translator";

/**
 * Entity schema represents any piece of data which has an identity.
 *
 * It makes semantically a bit more sense than just say "IdSchema" as when
 * e.g. you use `TEntitySchema extends IdSchema`, it's quite ugly.
 */
export const EntitySchema = z.object({
	id: z.string().min(1, {
		error() {
			return translator.text(
				"Missing identity for an Entity (id). I'm sorry, but I cannot provide better message than this :(",
			);
		},
	}),
});

export type EntitySchema = typeof EntitySchema;

export namespace EntitySchema {
	export type Type = z.infer<EntitySchema>;
}
