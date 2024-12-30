import type { Compilable, Kysely, SelectQueryBuilder } from "kysely";

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
		/**
		 * Fetch data from database; this is a low-level method, it should be handled by a higher-level API with
		 * schema validation and so on.
		 */
		list(query: SelectQueryBuilder<any, any, any>): Promise<unknown[]>;
		fetch(
			query: SelectQueryBuilder<any, any, any>,
		): Promise<unknown | undefined>;
		count(query: SelectQueryBuilder<any, any, any>): Promise<number>;
	}
}
