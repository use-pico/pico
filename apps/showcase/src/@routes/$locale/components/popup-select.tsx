import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$locale/components/popup-select")({
	component() {
		return "popup-select";
	},
});
