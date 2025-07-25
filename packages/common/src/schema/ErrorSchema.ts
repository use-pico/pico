import { z } from "zod";

export const ErrorSchema = z.object({
	message: z.string(),
});

export type ErrorSchema = typeof ErrorSchema;

export namespace ErrorSchema {
	export type Type = z.infer<ErrorSchema>;
}
