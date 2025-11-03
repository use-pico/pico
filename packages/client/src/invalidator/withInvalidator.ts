import type { QueryClient } from "@tanstack/react-query";

export namespace withInvalidator {
	export interface Invalidate {
		invalidate(queryClient: QueryClient): Promise<void>;
	}

	export interface Props {
		invalidate: Invalidate[];
	}
}

export const withInvalidator = ({ invalidate }: withInvalidator.Props) => {
	const invalidateFn = async (queryClient: QueryClient) => {
		for (const { invalidate: fn } of invalidate) {
			await fn(queryClient);
		}
	};

	return {
		invalidate: invalidateFn,
	};
};
