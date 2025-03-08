import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$locale/components/")({
	component() {
		return "component showcase";
	},
});
