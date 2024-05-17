import {type z} from "zod";

export type RequestSchema = z.ZodSchema;
export namespace RequestSchema {
    export type Type = z.infer<RequestSchema>;
}
