import type { QueryClient } from "@tanstack/react-query";
import {
    Outlet,
    ScrollRestoration,
    createRootRouteWithContext,
} from "@tanstack/react-router";
import type { PageCss } from "@use-pico/client";

export const Route = createRootRouteWithContext<{
	queryClient: QueryClient;
	tva: PageCss;
}>()({
	component: () => {
		return (
			<>
				<ScrollRestoration />
				<Outlet />
			</>
		);
	},
});
