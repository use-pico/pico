import {
    type FC,
    type PropsWithChildren,
    useRef
}                 from "react";
import {RpcStore} from "../store/RpcStore";

export namespace RpcProvider {
    export type Props = PropsWithChildren<{
        url?: string;
    }>
}

export const RpcProvider: FC<RpcProvider.Props> = (
    {
        url = process.env.NEXT_PUBLIC_RPC || "/api/rpc",
        ...props
    }) => {
    return <RpcStore.Provider
        state={{
            bulkTimerRef: useRef<NodeJS.Timeout>(),
            timeoutRef:   useRef<NodeJS.Timeout>(),
            bulkRef:      useRef(new Map()),
            url,
        }}
        {...props}
    />;
};
