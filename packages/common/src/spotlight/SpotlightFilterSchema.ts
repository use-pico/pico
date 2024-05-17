import {z}            from "zod";
import {FilterSchema} from "../query/FilterSchema";

export const SpotlightFilterSchema = FilterSchema.merge(z.object({
    type:   z.string().nullish(),
    typeIn: z.array(z.string()).nullish(),
}));
export type SpotlightFilterSchema = typeof SpotlightFilterSchema;
export namespace SpotlightFilterSchema {
    export type Type = z.infer<SpotlightFilterSchema>;
}
