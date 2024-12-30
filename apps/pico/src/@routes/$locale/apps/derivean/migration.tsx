import { createFileRoute } from "@tanstack/react-router";
import { withInitialMigration } from "~/app/derivean/migration/withInitialMigration";

export const Route = createFileRoute("/$locale/apps/derivean/migration")({
	component() {
		return "ok";
	},
	errorComponent() {
		return "boom";
	},
	async loader() {
		return withInitialMigration();
	},
});
