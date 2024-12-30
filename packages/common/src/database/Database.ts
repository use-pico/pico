import type { Compilable, Kysely } from "kysely";

export namespace Database {
	export interface Instance<DB = any> {
		kysely: Kysely<DB>;
		/**
		 * Execute query directly on AlaSQL.
		 */
		exec(sql: string, bind?: any[]): Promise<any>;
		/**
		 * Compile Kysely query and run it on AlaSQL.
		 */
		run(query: Compilable<any>): Promise<any>;
	}
}
