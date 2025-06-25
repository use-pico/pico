import type { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext } from "@tanstack/react-router";
import type { PageCls } from "@use-pico/client";

export const Route = createRootRouteWithContext<{
	queryClient: QueryClient;
	tva: PageCls;
}>()({
	//
});
