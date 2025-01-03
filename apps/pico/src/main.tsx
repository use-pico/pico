import {
    keepPreviousData,
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { LoadingOverlay, PageCss } from "@use-pico/client";
import { withAxios } from "@use-pico/common";
import ReactDOM from "react-dom/client";
import { routeTree } from "~/_route";
import { kysely } from "~/app/derivean/db/db";
import { SessionSchema } from "~/app/schema/SessionSchema";
import "~/assets/style.css";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			placeholderData: keepPreviousData,
		},
	},
});

const router = createRouter({
	routeTree,
	context: {
		queryClient,
		tva: PageCss,
		async session() {
			return SessionSchema.parse(null);
		},
		kysely,
	},
	defaultPendingComponent: LoadingOverlay,
	defaultPreload: "intent",
	defaultPreloadStaleTime: 0,
	defaultPendingMinMs: 200,
});

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

const rootElement = document.getElementById("app")!;

/**
 * Setup default Axios instance to be rate-limited.
 */
withAxios({
	limit: {
		maxRequests: 10,
		perMilliseconds: 100,
	},
});

if (!rootElement.innerHTML) {
	ReactDOM.createRoot(rootElement).render(
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
		</QueryClientProvider>,
	);
}
