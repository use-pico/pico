import { FilterSchema } from "@use-pico/common";
import { z } from "zod";
import {
    withProductionSchema
} from "~/app/derivean/db/sdk";

export const ProductionSchema = withProductionSchema({
	shape: z.object({
		//
	}),
	filter: FilterSchema.merge(
		z.object({
			//
		}),
	),
});

export type ProductionSchema = typeof ProductionSchema;
