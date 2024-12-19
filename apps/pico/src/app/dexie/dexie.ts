import Dexie, { type EntityTable } from "dexie";
import type { UserType } from "~/app/type/UserType";

export interface DexieType extends Dexie {
	user: EntityTable<UserType, "id">;
}

export const dexie = new Dexie("pico") as DexieType;

dexie.version(1).stores({
	user: `id,login,[login+password]`,
});
