import alasql from "alasql";
import { Kysely, type Compilable, type SelectQueryBuilder } from "kysely";
import { withBrowserKysely } from "../kysely/withBrowserKysely";

export namespace withDatabase {
	export interface Props {
		database: string;
	}

	export namespace Table {
		export interface Def {
			name: string;
			columns: Record<string, string>;
		}
	}

	export interface Instance<DB> {
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
	}
}

export const withDatabase = async <DB>({
	database,
}: withDatabase.Props): Promise<withDatabase.Instance<DB>> => {
	const kysely = withBrowserKysely<DB>();

	const instance: withDatabase.Instance<DB> = {
		kysely,
		async exec(sql, bind) {
			await alasql.promise(
				`CREATE INDEXEDDB DATABASE IF NOT EXISTS ${database}`,
			);
			await alasql.promise(`ATTACH INDEXEDDB DATABASE ${database}`);
			await alasql.promise(`USE ${database}`);

			return alasql.promise(sql, bind);
		},
		async run(query) {
			const sql = query.compile();

			return instance.exec(sql.sql, sql.parameters as any[]);
		},
		async list(query) {
			return instance.run(query);
		},
		async fetch(query) {
			return (await instance.list(query))[0];
		},
	};

	return instance;
};
