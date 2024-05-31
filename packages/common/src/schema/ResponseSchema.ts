import {type z} from "zod";

export type ResponseSchema = z.ZodSchema;
export namespace ResponseSchema {
	export type Type = z.infer<ResponseSchema>;
}
