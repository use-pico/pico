import { createFileRoute } from "@tanstack/react-router";
import { bootstrap } from "~/app/derivean/db/kysely";

export const Route = createFileRoute("/$locale/apps/derivean")({
	loader: bootstrap,
});
