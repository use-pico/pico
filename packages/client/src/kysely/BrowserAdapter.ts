import type { DialectAdapter } from "kysely";

export const BrowserAdapter: DialectAdapter = {
	async acquireMigrationLock() {
		//
	},
	async releaseMigrationLock() {
		//
	},
	supportsCreateIfNotExists: true,
	supportsReturning: false,
	supportsTransactionalDdl: false,
	supportsOutput: false,
};
