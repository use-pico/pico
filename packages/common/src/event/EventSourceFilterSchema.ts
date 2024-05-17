import {z}            from "zod";
import {FilterSchema} from "../query/FilterSchema";

export const EventSourceFilterSchema = FilterSchema.merge(z.object({
    userId: z.string().nullish(),
    commit: z.boolean().nullish(),
}));
export type EventSourceFilterSchema = typeof EventSourceFilterSchema;
export namespace EventSourceFilterSchema {
    export type Type = z.infer<EventSourceFilterSchema>;
}
