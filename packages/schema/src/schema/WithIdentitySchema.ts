import {z} from "@use-pico/utils";

export const WithIdentitySchema = z.object({
    id: z.string().nonempty({message: "Non-empty"}),
});
export type WithIdentitySchema = typeof WithIdentitySchema;
export namespace WithIdentitySchema {
    export type Type = z.infer<WithIdentitySchema>;
}
