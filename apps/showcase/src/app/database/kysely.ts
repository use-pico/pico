import { withDatabase } from "@use-pico/common/database";
import { SQLocalKysely } from "sqlocal/kysely";
import type { Database } from "~/app/database/Database";
import { migrations } from "~/app/database/migrations";

const { dialect } = new SQLocalKysely({
	databasePath: "pico.sqlite3",
	onInit(sql: any) {
		return [
			sql`PRAGMA foreign_keys = ON;`,
			sql`PRAGMA journal_mode = WAL;`,
		];
	},
});

export const database = withDatabase<Database>({
	dialect,
	async getMigrations() {
		return migrations;
	},
});
