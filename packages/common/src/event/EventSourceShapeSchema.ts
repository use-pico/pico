import {z} from "zod";

export const EventSourceShapeSchema = z.object({
	event:   z.string().min(1),
	group:   z.string().nullish(),
	payload: z.any().nullish(),
	commit:  z.boolean(),
});
export type EventSourceShapeSchema = typeof EventSourceShapeSchema;
export namespace EventSourceShapeSchema {
	export type Type = z.infer<EventSourceShapeSchema>;
}
