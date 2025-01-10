import { FilterSchema } from "@use-pico/common";
import { z } from "zod";
import { withResourceQueueSchema } from "~/app/derivean/db/sdk";

export const Resource_Queue_Schema = withResourceQueueSchema({
	shape: z.object({
		//
	}),
	filter: FilterSchema.merge(
		z.object({
			//
		}),
	),
});

export type Resource_Queue_Schema = typeof Resource_Queue_Schema;
