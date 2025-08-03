import { InitialMigration } from "./0001-initial";

export const migrations = {
	"0001-initial": InitialMigration,
} as const;
