import { createFileRoute, Outlet } from "@tanstack/react-router";
import { translator } from "@use-pico/common";

export const Route = createFileRoute("/$locale")({
	component: Outlet,
	loader: async ({ params: { locale } }) => {
		try {
			translator.push((await import(`../translation/${locale}.yaml`)).default);
		} catch (e) {
			console.error(e);
		}
	},
});
