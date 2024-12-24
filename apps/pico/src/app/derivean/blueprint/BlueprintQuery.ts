import { queryOf } from "@use-pico/client";
import { BlueprintFilterSchema } from "~/app/derivean/blueprint/schema/BlueprintFilterSchema";
import { BlueprintSchema } from "~/app/derivean/blueprint/schema/BlueprintSchema";
import { dexie } from "~/app/derivean/dexie/dexie";

export const BlueprintQuery = queryOf({
	source: dexie.Blueprint,
	schema: {
		entity: BlueprintSchema,
		filter: BlueprintFilterSchema,
	},
	onFilter() {
		return true;
	},
});
