import type { Database } from "@use-pico/common";
import { Kysely } from "kysely";
// @ts-ignore
import { SQLocalKysely } from "sqlocal/kysely";

export namespace withDatabase {
	export namespace Props {
		export namespace bootstrap {
			export interface Props<TDatabase> {
				kysely: Kysely<TDatabase>;
			}

			export type Callback<TDatabase> = (
				props: Props<TDatabase>,
			) => Promise<any>;
		}
	}

	export interface Props<TDatabase> {
		database: string;
		bootstrap: Props.bootstrap.Callback<TDatabase>;
	}
}

export const withDatabase = <TDatabase>({
	database,
	bootstrap,
}: withDatabase.Props<TDatabase>): Database.Instance<TDatabase> => {
	const { dialect } = new SQLocalKysely({
		databasePath: `${database}.sqlite3`,
	});

	const kysely = new Kysely<TDatabase>({ dialect });

	return {
		kysely,
		bootstrap() {
			return bootstrap({ kysely });
		},
	};
};