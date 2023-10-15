import {
    type FC,
    type PropsWithChildren
}                    from "react";
import {DrawerStore} from "./DrawerStore";

export type IDrawerStoreProviderProps = PropsWithChildren<{
    defaultOpened?: Record<string, boolean>;
}>

export const DrawerStoreProvider: FC<IDrawerStoreProviderProps> = (
    {
        defaultOpened,
        ...props
    }) => {
    return <DrawerStore.Provider
        defaults={{
            state: defaultOpened ? new Map(Object.entries(defaultOpened)) : new Map(),
        }}
        {...props}
    />;
};
