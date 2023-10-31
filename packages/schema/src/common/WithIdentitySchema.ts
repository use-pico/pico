import {type PicoSchema} from "../api/PicoSchema";
import {schema}          from "../schema/schema";

export const WithIdentitySchema = schema(z => z.object({
    id: z.nonEmptyString,
}));
export type WithIdentitySchema = typeof WithIdentitySchema;
export namespace WithIdentitySchema {
    export type Type = PicoSchema.Output<WithIdentitySchema>;
}
