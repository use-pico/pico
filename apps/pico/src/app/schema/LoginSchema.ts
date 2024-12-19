import { z } from "zod";

export const LoginSchema = z.object({
	login: z.string(),
	password: z.string(),
});

export type LoginSchema = typeof LoginSchema;

export namespace LoginSchema {
	export type Type = z.infer<LoginSchema>;
}
