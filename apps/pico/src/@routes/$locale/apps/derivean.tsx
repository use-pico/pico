import { createFileRoute } from "@tanstack/react-router";
import { db } from "~/app/derivean/db/db";

export const Route = createFileRoute("/$locale/apps/derivean")({
	async loader() {
		return db.bootstrap();
	},
});
