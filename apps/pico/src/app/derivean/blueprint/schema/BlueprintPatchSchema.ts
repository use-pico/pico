import { withPatchSchema } from "@use-pico/common";
import type { z } from "zod";
import { BlueprintFilterSchema } from "~/app/derivean/blueprint/schema/BlueprintFilterSchema";
import { BlueprintShapeSchema } from "~/app/derivean/blueprint/schema/BlueprintShapeSchema";

export const BlueprintPatchSchema = withPatchSchema({
	shape: BlueprintShapeSchema,
	filter: BlueprintFilterSchema,
});

export type BlueprintPatchSchema = typeof BlueprintPatchSchema;

export namespace BlueprintPatchSchema {
	export type Type = z.infer<BlueprintPatchSchema>;
}
