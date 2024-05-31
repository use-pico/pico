import {z}                      from "zod";
import {withMutationSchema}     from "../query/withMutationSchema";
import {EventSourceQuerySchema} from "./EventSourceQuerySchema";
import {EventSourceShapeSchema} from "./EventSourceShapeSchema";

export const EventSourceMutationSchema = withMutationSchema({
	shape: EventSourceShapeSchema,
	query: EventSourceQuerySchema,
});
export type EventSourceMutationSchema = typeof EventSourceMutationSchema;
export namespace EventSourceMutationSchema {
	export type Type = z.infer<EventSourceMutationSchema>;
}
