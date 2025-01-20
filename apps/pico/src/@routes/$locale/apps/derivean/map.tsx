import { createFileRoute, redirect } from "@tanstack/react-router";
import { ls } from "@use-pico/client";
import { GameMap2 } from "~/app/derivean/game/GameMap2/GameMap2";
import { SessionSchema } from "~/app/derivean/schema/SessionSchema";

export const Route = createFileRoute("/$locale/apps/derivean/map")({
	async beforeLoad({ context, params: { locale } }) {
		return {
			...context,
			async session() {
				try {
					return SessionSchema.parse(ls.get("session"));
				} catch (_) {
					throw redirect({
						to: `/$locale/apps/derivean/public/login`,
						params: { locale },
					});
				}
			},
		};
	},
	component() {
		return <GameMap2 />;
	},
});
