import type { TypedDocumentNode } from "@graphql-typed-document-node/core";

export namespace IGqlClient {
	export type Variables = Record<string, any> | undefined;
}

export interface IGqlClient {
	query<T = unknown, V extends IGqlClient.Variables = IGqlClient.Variables>(
		document: TypedDocumentNode<T, V>,
		variables: V,
	): Promise<T>;

	mutation<
		T = unknown,
		V extends IGqlClient.Variables = IGqlClient.Variables,
	>(document: TypedDocumentNode<T, V>, variables: V): Promise<T>;
}
