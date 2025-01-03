import type { QueryClient } from "@tanstack/react-query";
import {
    Outlet,
    ScrollRestoration,
    createRootRouteWithContext,
} from "@tanstack/react-router";
import type { PageCss } from "@use-pico/client";
import type { kysely } from "~/app/derivean/db/db";
import type { SessionSchema } from "~/app/schema/SessionSchema";

export const Route = createRootRouteWithContext<{
	queryClient: QueryClient;
	tva: PageCss;
	session(): Promise<SessionSchema.Type>;
	kysely: typeof kysely;
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
