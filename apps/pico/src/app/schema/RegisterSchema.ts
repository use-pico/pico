import { z } from "zod";

export const RegisterSchema = z
	.object({
		name: z.string().min(1),
		login: z.string().min(1),
		password1: z.string().min(1),
		password2: z.string().min(1),
	})
	.refine((data) => data.password1 === data.password2, {
		message: "Passwords must match",
		path: ["password1"],
	});

export type RegisterSchema = typeof RegisterSchema;

export namespace RegisterSchema {
	export type Type = z.infer<RegisterSchema>;
}
