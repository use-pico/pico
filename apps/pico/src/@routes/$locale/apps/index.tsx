import { createFileRoute, useLoaderData } from "@tanstack/react-router";

export const Route = createFileRoute("/$locale/apps/")({
	component: () => {
		const { session } = useLoaderData({ from: "/$locale/apps" });

		return <pre>{JSON.stringify(session, null, 2)}</pre>;
	},
});
