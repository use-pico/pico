import { z } from "zod";

export const IdentitySchema = z.strictObject({
	id: z.string().min(1),
});

export type IdentitySchema = typeof IdentitySchema;

export namespace IdentitySchema {
	export type Type = z.infer<IdentitySchema>;
}
