import { queryOf } from "@use-pico/client";
import { BlueprintFilterSchema } from "~/app/derivean/blueprint/schema/BlueprintFilterSchema";
import { BlueprintSchema } from "~/app/derivean/blueprint/schema/BlueprintSchema";
import { BlueprintShapeSchema } from "~/app/derivean/blueprint/schema/BlueprintShapeSchema";
import { dexie } from "~/app/derivean/dexie/dexie";

export const BlueprintQuery = queryOf({
	name: "BlueprintQuery",
	source: dexie.Blueprint,
	schema: {
		entity: BlueprintSchema,
		shape: BlueprintShapeSchema,
		filter: BlueprintFilterSchema,
	},
	onFilter() {
		return true;
	},
});
