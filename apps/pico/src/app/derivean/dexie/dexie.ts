import Dexie, { type EntityTable } from "dexie";
import type { BlueprintSchema } from "~/app/derivean/blueprint/schema/BlueprintSchema";
import type { UserBlueprintSchema } from "~/app/derivean/blueprint/schema/UserBlueprintSchema";

export interface DexieType extends Dexie {
	Blueprint: EntityTable<BlueprintSchema.Type, "id">;
	UserBlueprint: EntityTable<UserBlueprintSchema.Type, "id">;
}

export const dexie = new Dexie("derivean") as DexieType;

dexie.version(1).stores({
	Blueprint: "id, [name+kind]&",
	UserBlueprint: "id, [userId+blueprintId]&",
});
