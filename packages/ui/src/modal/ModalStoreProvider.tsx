import {
    type FC,
    type PropsWithChildren
}                   from "react";
import {ModalStore} from "./ModalStore";

export type IModalStoreProviderProps = PropsWithChildren<{
    defaultOpened?: Record<string, boolean>;
}>;

export const ModalStoreProvider: FC<IModalStoreProviderProps> = (
    {
        defaultOpened,
        ...props
    }) => {
    return <ModalStore.Provider
        defaults={{
            state: defaultOpened ? new Map(Object.entries(defaultOpened)) : new Map(),
        }}
        {...props}
    />;
};
