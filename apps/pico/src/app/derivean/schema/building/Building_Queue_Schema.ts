import { FilterSchema } from "@use-pico/common";
import { z } from "zod";
import { withBuildingQueueSchema } from "~/app/derivean/db/sdk";

export const Building_Queue_Schema = withBuildingQueueSchema({
	shape: z.object({
		//
	}),
	filter: FilterSchema.merge(
		z.object({
			//
		}),
	),
});

export type Building_Queue_Schema = typeof Building_Queue_Schema;
