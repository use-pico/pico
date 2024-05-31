import {z}                        from "zod";
import {withQuerySchema}          from "../query/withQuerySchema";
import {EventSourceFilterSchema}  from "./EventSourceFilterSchema";
import {EventSourceOrderBySchema} from "./EventSourceOrderBySchema";

export const EventSourceQuerySchema = withQuerySchema({
	filter:  EventSourceFilterSchema,
	orderBy: EventSourceOrderBySchema,
});
export type EventSourceQuerySchema = typeof EventSourceQuerySchema;
export namespace EventSourceQuerySchema {
	export type Type = z.infer<EventSourceQuerySchema>;
}
