import { withCreateSchema } from "@use-pico/common";
import { z } from "zod";
import { BlueprintShapeSchema } from "~/app/derivean/blueprint/schema/BlueprintShapeSchema";

export const BlueprintCreateSchema = withCreateSchema({
	create: BlueprintShapeSchema,
});

export type BlueprintCreateSchema = typeof BlueprintCreateSchema;

export namespace BlueprintCreateSchema {
	export type Type = z.infer<BlueprintCreateSchema>;
}
