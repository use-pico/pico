import type { TypedDocumentNode } from "@graphql-typed-document-node/core";

export type InferGqlType<TDoc extends TypedDocumentNode<any, any>> =
	TDoc extends TypedDocumentNode<infer TData, infer TVariables>
		? {
				data: TData;
				variables: TVariables;
			}
		: never;

export namespace InferGqlType {
	export type Data<TDoc extends TypedDocumentNode<any, any>> =
		TDoc extends TypedDocumentNode<infer TData, any> ? TData : never;
	export type Variables<TDoc extends TypedDocumentNode<any, any>> =
		TDoc extends TypedDocumentNode<any, infer TVariables>
			? TVariables
			: never;
}
