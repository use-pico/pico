import type { Database } from "@use-pico/common";
import alasql from "alasql";
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
}

export const withDatabase = async <DB>({
	database,
}: withDatabase.Props): Promise<Database.Instance<DB>> => {
	const kysely = withBrowserKysely<DB>();

	const instance: Database.Instance<DB> = {
		kysely,
		async exec(sql, bind) {
			console.info(`SQL [${sql}]`, bind);

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
