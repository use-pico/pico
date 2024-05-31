import {z} from "zod";

export const TokenSchema = z.object({
	tokens: z.string().array(),
});
export type TokenSchema = typeof TokenSchema;
export namespace TokenSchema {
	export type Type = z.infer<TokenSchema>;
}
