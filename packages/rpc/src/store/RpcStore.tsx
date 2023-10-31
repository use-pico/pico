import {
    createStore,
    type IStoreProps,
    type IStorePropsType
}                              from "@use-pico/store";
import {type MutableRefObject} from "react";
import {type IBulkRef}         from "../api/IBulkRef";

export type IRpcStoreProps = IStoreProps<IStorePropsType, {
    bulkTimerRef: MutableRefObject<NodeJS.Timeout | undefined>;
    timeoutRef: MutableRefObject<NodeJS.Timeout | undefined>;
    bulkRef: MutableRefObject<Map<string, IBulkRef>>;
    url: string;
}>;

export const RpcStore = createStore<IRpcStoreProps>({
    state: ({state}) => () => ({
        ...state,
    }),
    name:  "RpcStore",
    hint:  "Add RpcProvider."
});



