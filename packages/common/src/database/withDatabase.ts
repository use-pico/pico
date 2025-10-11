import type { Database } from "@use-pico/common";
import { type Dialect, Kysely, type MigrationProvider, Migrator } from "kysely";

export namespace withDatabase {
	export interface Props
		extends Partial<Pick<MigrationProvider, "getMigrations">> {
		dialect: Dialect;
		/**
		 * Called before the migration is executed.
		 */
		onPreMigration?(): Promise<void>;
		onPostMigration?(): Promise<void>;
	}
}

export const withDatabase = <TDatabase>({
	dialect,
	onPreMigration,
	onPostMigration,
	getMigrations = async () => ({}),
}: withDatabase.Props): Database.Instance<TDatabase> => {
	let kysely: Kysely<TDatabase> | null = null;

	return {
		get kysely() {
			if (!kysely) {
				kysely = new Kysely<TDatabase>({
					dialect,
					log: [
						"error",
					],
				});
			}
			return kysely;
		},
		async migrate() {
			await onPreMigration?.();

			const migrator = new Migrator({
				db: this.kysely,
				provider: {
					getMigrations,
				},
			});

			const { error, results } = await migrator.migrateToLatest();

			if (error) {
				throw error;
			}

			results?.forEach((result) => {
				switch (result.status) {
					case "Success":
						console.log(
							`Migration "${result.migrationName}" executed successfully`,
						);
						break;

					case "Error":
						console.error(
							`Migration "${result.migrationName}" failed`,
						);
						break;
				}
			});

			await onPostMigration?.();

			return results;
		},
	};
};
