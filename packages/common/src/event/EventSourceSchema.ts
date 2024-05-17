import {z}                  from "zod";
import {WithIdentitySchema} from "../schema/WithIdentitySchema";

export const EventSourceSchema = WithIdentitySchema.merge(z.object({
    event:     z.string().min(1),
    payload:   z.any().nullish(),
    userId:    z.string().nullish(),
    commit:    z.boolean(),
    timestamp: z.any().nullish(),
}));
export type EventSourceSchema = typeof EventSourceSchema;
export namespace EventSourceSchema {
    export type Type = z.infer<EventSourceSchema>;
}
