import { createFileRoute, useRouteContext } from "@tanstack/react-router";

export const Route = createFileRoute("/$locale/public/register")({
	component: () => {
		const { tva } = useRouteContext({ from: "__root__" });

		const tv = tva().slots;

		return <div className={tv.base()}>register!</div>;
	},
});
