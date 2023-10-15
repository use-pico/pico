import {z} from "@use-pico/utils";

export const SessionSchema = z.object({
    id:     z.number(),
    name:   z.string().nonempty({message: "Non-empty"}),
    site:   z.string().nullish(),
    tokens: z.array(z.string().nonempty({message: "Non-empty"})),
});
export type SessionSchema = typeof SessionSchema;
export namespace SessionSchema {
    export type Type = z.infer<SessionSchema>;
}
