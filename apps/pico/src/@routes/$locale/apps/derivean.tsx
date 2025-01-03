import { createFileRoute } from "@tanstack/react-router";
import { bootstrap } from "~/app/derivean/db/db";

export const Route = createFileRoute("/$locale/apps/derivean")({
	loader: bootstrap,
});
