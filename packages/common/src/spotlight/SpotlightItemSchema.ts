import {z}                  from "zod";
import {WithIdentitySchema} from "../schema/WithIdentitySchema";

export const SpotlightItemSchema = WithIdentitySchema.merge(z.object({
    fulltext: z.string().min(1),
}));
export type SpotlightItemSchema = typeof SpotlightItemSchema;
export namespace SpotlightItemSchema {
    export type Type = z.infer<SpotlightItemSchema>;
}
