import { createFileRoute, useRouteContext } from "@tanstack/react-router";

export const Route = createFileRoute("/$locale/apps/derivean/game/management/")(
	{
		component: () => {
			const { tva } = useRouteContext({ from: "__root__" });
			const tv = tva().slots;

			return (
				<div className={tv.base()}>
					<div>management here</div>
				</div>
			);
		},
	},
);
