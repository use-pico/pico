import { z } from "zod";

export const TokenSchema = z.strictObject({
	tokens: z.array(z.string()),
});

export type TokenSchema = typeof TokenSchema;

export namespace TokenSchema {
	export type Type = z.infer<TokenSchema>;
}
