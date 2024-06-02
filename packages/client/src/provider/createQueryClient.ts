import {QueryClient} from "@tanstack/react-query";

export const createQueryClient = () => {
	return new QueryClient({
		defaultOptions: {
			queries: {
                staleTime: 5 * 60 * 1000,
				placeholderData: (prev: any) => prev,
			},
		},
	});
};
