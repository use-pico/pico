import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$locale/apps/monye/")({
	component: () => {
		return "monye, haha";
	},
});