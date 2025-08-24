import type { ApolloClient } from "@apollo/client/core";
import type { IGqlClient } from "./IGqlClient";

export function withApolloClient(client: ApolloClient): IGqlClient {
	return {
		async query(document, variables) {
			const result = await client.query({
				query: document,
				variables,
			});

			// Check for errors and throw them directly
			if (result.error) {
				throw result.error;
			}

			// Ensure data is available
			if (!result.data) {
				throw new Error("Query returned no data");
			}

			return result.data;
		},
		async mutation(document, variables) {
			const result = await client.mutate({
				mutation: document,
				variables,
			});

			// Check for errors and throw them directly
			if (result.error) {
				throw result.error;
			}

			// Ensure data is available
			if (!result.data) {
				throw new Error("Mutation returned no data");
			}

			return result.data;
		},
	};
}
