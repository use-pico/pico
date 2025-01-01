import type { Kysely } from "kysely";

export namespace Database {
	export interface Instance<DB = any> {
		kysely: Kysely<DB>;
		bootstrap(): Promise<void>;
	}
}
