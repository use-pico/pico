import { z } from "zod";

export const LoginSchema = z.object({
	login: z.string().min(1),
	password: z.string().min(1),
});

export type LoginSchema = typeof LoginSchema;

export namespace LoginSchema {
	export type Type = z.infer<LoginSchema>;
}
