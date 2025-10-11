import type { Kysely, MigrationResult } from "kysely";

export namespace Database {
	export interface Instance<DB = any> {
		kysely: Kysely<DB>;
		migrate(): Promise<MigrationResult[] | undefined>;
	}
}
