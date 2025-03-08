/** @format */

import type { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext } from "@tanstack/react-router";
import type { PageCss } from "@use-pico/client";

export const Route = createRootRouteWithContext<{
	queryClient: QueryClient;
	tva: PageCss;
}>()({
	//
});
