import type { DatabaseIntrospector } from "kysely";

export const BrowserIntrospector: DatabaseIntrospector = {
	async getSchemas() {
		return [];
	},
	async getTables() {
		return [];
	},
	async getMetadata() {
		return {
			tables: [],
		};
	},
};
