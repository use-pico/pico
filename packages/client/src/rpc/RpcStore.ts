"use client";

import {
    type ResponseSchema,
    type RpcRequestSchema
}                              from "@use-pico/common";
import {type MutableRefObject} from "react";
import {createStore}           from "../store/createStore";
import type {IStore}           from "../store/IStore";

export namespace RpcStore {
	export interface IBulkRef {
		schema?: ResponseSchema;
		request: RpcRequestSchema.Type;

		resolve(value: any): void;

		reject(error: any): void;
	}

	export type Store = IStore<
		IStore.Type,
		{
			bulkTimerRef: MutableRefObject<NodeJS.Timeout | undefined>;
			timeoutRef: MutableRefObject<NodeJS.Timeout | undefined>;
			bulkRef: MutableRefObject<Map<string, IBulkRef>>;
			url: string;
		}
	>;
}

export const RpcStore = createStore<RpcStore.Store>({
    name: "RpcStore",
	factory: values => () => values,
});
