import type { QueryClient } from "@tanstack/react-query";
import type { CursorSchema } from "@use-pico/common";
import type { z } from "zod";

export namespace Loader {
	export interface Props<TFilter extends Record<string, any>> {
		queryClient: QueryClient;
		where?: TFilter;
		filter?: TFilter;
		cursor?: CursorSchema.Type;
	}

	export type PropsSchema<TFilter extends z.ZodObject<any>> = Props<
		z.infer<TFilter>
	>;
}
