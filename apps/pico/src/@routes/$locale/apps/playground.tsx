import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@use-pico/client";

export const Route = createFileRoute("/$locale/apps/playground")({
	component: () => {
		return <AppLayout />;
	},
});
