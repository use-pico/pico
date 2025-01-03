import type { QueryClient } from "@tanstack/react-query";
import {
    Outlet,
    ScrollRestoration,
    createRootRouteWithContext,
} from "@tanstack/react-router";
import type { PageCss } from "@use-pico/client";
import type { SessionSchema } from "~/app/schema/SessionSchema";

export const Route = createRootRouteWithContext<{
	queryClient: QueryClient;
	tva: PageCss;
	session(): Promise<SessionSchema.Type>;
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
