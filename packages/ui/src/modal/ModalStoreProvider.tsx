import {
    type FC,
    type PropsWithChildren
}                   from "react";
import {ModalStore} from "./ModalStore";

export namespace ModalStoreProvider {
    export type Props = PropsWithChildren<{
        defaultOpened?: Record<string, boolean>;
    }>;
}

export const ModalStoreProvider: FC<ModalStoreProvider.Props> = (
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
