"use client";

import {StoreProvider} from "@use-pico/store";
import {
    type FC,
    type PropsWithChildren
}                      from "react";
import {LinkLockStore} from "./LinkLockStore";

export namespace LinkLockProvider {
    export type Props = PropsWithChildren<{
        isLock?: boolean;
    }>;
}

export const LinkLockProvider: FC<LinkLockProvider.Props> = (
    {
        isLock,
        children
    }
) => {
    return <StoreProvider
        store={LinkLockStore}
        values={{
            isLock: isLock !== undefined ? isLock : false,
        }}
    >
        {children}
    </StoreProvider>;
};
