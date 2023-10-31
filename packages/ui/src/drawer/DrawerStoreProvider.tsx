import {StoreProvider} from "@use-pico/store";
import {
    type FC,
    type PropsWithChildren
}                      from "react";
import {DrawerStore}   from "./DrawerStore";

export namespace DrawerStoreProvider {
    export type Props = PropsWithChildren<{
        defaultOpened?: Record<string, boolean>;
    }>
}

export const DrawerStoreProvider: FC<DrawerStoreProvider.Props> = (
    {
        defaultOpened,
        ...props
    }) => {
    return <StoreProvider
        store={DrawerStore}
        values={{
            state: defaultOpened ? new Map(Object.entries(defaultOpened)) : new Map(),
        }}
        {...props}
    />;
};
