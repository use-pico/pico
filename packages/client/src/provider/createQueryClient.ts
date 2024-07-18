import { QueryClient } from "@tanstack/react-query";

export const createQueryClient = () => {
	return new QueryClient({
		defaultOptions: {
			queries: {
				gcTime: 1000 * 60 * 60 * 24,
				staleTime: 5 * 60 * 1000,
				placeholderData: (prev: any) => prev,
			},
		},
	});
};
