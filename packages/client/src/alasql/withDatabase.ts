import type { Database } from "@use-pico/common";
import alasql from "alasql";
import { withBrowserKysely } from "../kysely/withBrowserKysely";

export namespace withDatabase {
	export interface Props {
		database: string;
		bootstrap(): Promise<void>;
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
	bootstrap,
}: withDatabase.Props): Promise<Database.Instance<DB>> => {
	const kysely = withBrowserKysely<DB>();

	await alasql.promise(`CREATE INDEXEDDB DATABASE IF NOT EXISTS ${database}`);
	await alasql.promise(`ATTACH INDEXEDDB DATABASE ${database}`);
	await alasql.promise(`USE ${database}`);

	const instance: Database.Instance<DB> = {
		kysely,
		bootstrap,
		async exec(sql, bind) {
			console.info(`Query [${sql}]`, bind);

			return alasql.promise(sql, bind);
		},
		async run(query) {
			const sql = query.compile();

			return instance.exec(sql.sql, sql.parameters as any[]);
		},
	};

	return instance;
};
