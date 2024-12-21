import { queryOf } from "@use-pico/client";
import { BlueprintSchema } from "~/app/derivean/blueprint/schema/BlueprintSchema";
import { dexie } from "~/app/derivean/dexie/dexie";

export const BlueprintQuery = queryOf({
	source: dexie.Blueprint,
	schema: BlueprintSchema,
	onFilter() {
		return true;
	},
});
