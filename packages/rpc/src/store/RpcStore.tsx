"use client";

import {
    createStore,
    type IStore
}                              from "@use-pico/store";
import {type MutableRefObject} from "react";
import {type IBulkRef}         from "../api/IBulkRef";

export namespace RpcStore {
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
    name:    "RpcStore",
    factory: values => () => values,
});
