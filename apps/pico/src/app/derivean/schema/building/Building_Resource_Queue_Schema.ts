import { FilterSchema } from "@use-pico/common";
import { z } from "zod";
import { withBuildingResourceQueueSchema } from "~/app/derivean/db/sdk";

export const Building_Resource_Queue_Schema = withBuildingResourceQueueSchema({
	shape: z.object({
		//
	}),
	filter: FilterSchema.merge(
		z.object({
			//
		}),
	),
});

export type Building_Resource_Queue_Schema =
	typeof Building_Resource_Queue_Schema;
