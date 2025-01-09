import type { QueryClient } from "@tanstack/react-query";
import {
    Outlet,
    ScrollRestoration,
    createRootRouteWithContext,
} from "@tanstack/react-router";
import type { PageCss } from "@use-pico/client";
import type { Kysely } from "kysely";
import type { Database } from "~/app/derivean/db/sdk";
import type { SessionSchema } from "~/app/derivean/schema/SessionSchema";

export const Route = createRootRouteWithContext<{
	queryClient: QueryClient;
	tva: PageCss;
	session(): Promise<SessionSchema.Type>;
	kysely: Kysely<Database>;
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
