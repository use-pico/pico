import { type QueryClient } from "@tanstack/react-query";
import {
	PersistQueryClientProvider,
	type Persister,
} from "@tanstack/react-query-persist-client";
import { type FC, type PropsWithChildren } from "react";
import { createPersister } from "./createPersister";
import { createQueryClient } from "./createQueryClient";

export namespace QueryClientProvider {
	export interface Props extends PropsWithChildren {
		queryClient?: QueryClient;
		persister?: Persister;
	}
}

export const QueryClientProvider: FC<QueryClientProvider.Props> = ({
	queryClient = createQueryClient(),
	persister = createPersister(),
	...props
}) => {
	return (
		<PersistQueryClientProvider
			client={queryClient}
			persistOptions={{ persister }}
			{...props}
		/>
	);
};
