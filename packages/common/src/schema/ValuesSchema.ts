import {type z} from "zod";

export type ValuesSchema = z.ZodObject<any, "strip">;
export namespace ValuesSchema {
	export type Type = z.infer<ValuesSchema>;
}
