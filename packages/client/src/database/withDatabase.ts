import type { Database } from "@use-pico/common";
import { Kysely } from "kysely";
// @ts-ignore
import { SQLocalKysely } from "sqlocal/kysely";

export namespace withDatabase {
	export namespace Props {
		export namespace bootstrap {
			export interface Props {
				kysely: Kysely<any>;
			}

			export type Callback = (props: Props) => Promise<any>;
		}
	}

	export interface Props {
		database: string;
		bootstrap: Props.bootstrap.Callback;
	}
}

export const withDatabase = <TDatabase>({
	database,
	bootstrap,
}: withDatabase.Props): Database.Instance<TDatabase> => {
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
