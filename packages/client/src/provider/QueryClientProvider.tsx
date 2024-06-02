import {
    type QueryClient,
    QueryClientProvider as CoolQueryClientProvider
}                          from "@tanstack/react-query";
import {
    type FC,
    type PropsWithChildren
}                          from "react";
import {createQueryClient} from "./createQueryClient";

export namespace QueryClientProvider {
	export type Props = PropsWithChildren<{
		queryClient?: QueryClient;
	}>
}

export const QueryClientProvider: FC<QueryClientProvider.Props> = (
	{
		queryClient = createQueryClient(),
		...props
	}
) => {
	return <CoolQueryClientProvider
		client={queryClient}
		{...props}
	/>;
};
