import {z}           from "zod";
import {OrderSchema} from "../query/OrderSchema";

export const EventSourceOrderBySchema = z.object({
	timestamp: OrderSchema,
}).partial();
export type EventSourceOrderBySchema = typeof EventSourceOrderBySchema;
export namespace EventSourceOrderBySchema {
	export type Type = z.infer<EventSourceOrderBySchema>;
}
