import {z} from "zod";

export const WithIdentitySchema = z.object({
	id: z.string().min(1),
});
export type WithIdentitySchema = typeof WithIdentitySchema;
export namespace WithIdentitySchema {
	export type Type = z.infer<WithIdentitySchema>;
}
