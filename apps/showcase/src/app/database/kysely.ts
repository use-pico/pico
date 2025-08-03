import { withDatabase } from "@use-pico/client";
import type { Database } from "~/app/database/Database";
import { migrations } from "~/app/database/migrations";

export const { kysely, bootstrap } = withDatabase<Database>({
	database: "pico",
	async getMigrations() {
		return migrations;
	},
	async bootstrap() {
		//
	},
});
