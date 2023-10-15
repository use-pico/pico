import {z} from "@pico/utils";

export const SessionSchema = z.object({
    id:     z.number(),
    name:   z.string().nonempty({message: "Non-empty"}),
    site:   z.string().nullish(),
    tokens: z.array(z.string().nonempty({message: "Non-empty"})),
});
export type ISessionSchema = typeof SessionSchema;
export type ISession = z.infer<ISessionSchema>;
