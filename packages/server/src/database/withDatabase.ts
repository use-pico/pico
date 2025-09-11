import type { Database } from "@use-pico/common";
import { type Dialect, Kysely, type MigrationProvider, Migrator } from "kysely";

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

	export interface Props<TDatabase>
		extends Partial<Pick<MigrationProvider, "getMigrations">> {
		dialect: Dialect;
		bootstrap: Props.bootstrap.Callback<TDatabase>;
	}
}

export const withDatabase = <TDatabase>({
	dialect,
	getMigrations = async () => ({}),
	bootstrap,
}: withDatabase.Props<TDatabase>): Database.Instance<TDatabase> => {
	const kysely = new Kysely<TDatabase>({
		dialect,
		log: [
			"error",
		],
	});

	return {
		kysely,
		async bootstrap() {
			const migrator = new Migrator({
				db: kysely,
				provider: {
					getMigrations,
				},
			});

			const { error, results } = await migrator.migrateToLatest();

			/**
			 * We're in browser, so console log stuff is just fine.
			 */
			if (error) {
				throw error;
			} else if (results) {
				results.forEach((result) => {
					if (result.status === "Success") {
						console.log(
							`Migration "${result.migrationName}" executed successfully`,
						);
					} else if (result.status === "Error") {
						console.error(
							`Migration "${result.migrationName}" failed`,
						);
					}
				});
			}

			return bootstrap({
				kysely,
			});
		},
	};
};
