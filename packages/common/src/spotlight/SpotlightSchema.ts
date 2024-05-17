import {z}                   from "zod";
import {WithIdentitySchema}  from "../schema/WithIdentitySchema";
import {SpotlightItemSchema} from "./SpotlightItemSchema";

export const SpotlightSchema = WithIdentitySchema.merge(z.object({
    type:  z.string().min(1),
    items: z.array(SpotlightItemSchema),
}));
export type SpotlightSchema = typeof SpotlightSchema;
export namespace SpotlightSchema {
    export type Type = z.infer<SpotlightSchema>;
}
