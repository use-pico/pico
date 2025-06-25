import type { ApolloClient } from "@apollo/client/core";
import type { IGqlClient } from "./IGqlClient";

export function withApolloClient(client: ApolloClient<any>): IGqlClient {
	return {
		async query(document, variables) {
			const result = await client.query({
				query: document,
				variables,
			});
			if (result.errors?.length) {
				throw result.errors;
			}
			return result.data;
		},
		async mutation(document, variables) {
			const result = await client.mutate({
				mutation: document,
				variables,
			});
			if (result.errors?.length) {
				throw result.errors;
			}
			if (!result.data) {
				throw new Error("Mutation returned no data");
			}
			return result.data;
		},
	};
}
