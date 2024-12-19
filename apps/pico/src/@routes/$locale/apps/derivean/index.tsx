import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$locale/apps/derivean/")({
	component: () => {
		return "Legacy of DeRivean";
	},
});
