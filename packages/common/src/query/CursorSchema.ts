import {z} from "zod";

export const CursorSchema = z.object({
	page: z.number().gte(0, "Page must be greater than zero"),
	size: z.number().gte(1, "Page size must be greater than one to get any data"),
});
export type CursorSchema = typeof CursorSchema;
export namespace CursorSchema {
	export type Type = z.infer<CursorSchema>;
}
