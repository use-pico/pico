import {
	keepPreviousData,
	QueryClient,
	QueryClientProvider,
} from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { LoadingOverlay, PageCls } from "@use-pico/client";
import { withAxios } from "@use-pico/common";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { routeTree } from "~/_route";
import "~/assets/style.css";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			placeholderData: keepPreviousData,
			staleTime: 5 * 1000,
		},
	},
});

const router = createRouter({
	routeTree,
	context: {
		queryClient,
		tva: PageCls,
	},
	scrollRestoration: true,
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

const rootElement = document.getElementById("app");

/**
 * Setup default Axios instance to be rate-limited.
 */
withAxios({
	limit: {
		maxRequests: 10,
		perMilliseconds: 100,
	},
});

if (rootElement && !rootElement?.innerHTML) {
	ReactDOM.createRoot(rootElement).render(
		<StrictMode>
			<QueryClientProvider client={queryClient}>
				<RouterProvider router={router} />
			</QueryClientProvider>
		</StrictMode>,
	);
}
