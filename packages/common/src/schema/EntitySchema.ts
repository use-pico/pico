import type { z } from "zod";
import { IdentitySchema } from "./IdentitySchema";

export const EntitySchema = IdentitySchema;

export type EntitySchema = typeof EntitySchema;

export namespace EntitySchema {
	export type Type = z.infer<EntitySchema>;
}
