import { type z } from "zod";

export type RequestSchema = z.ZodObject<any, "strip"> | z.ZodSchema;
export namespace RequestSchema {
	export type Type = z.infer<RequestSchema>;
}
