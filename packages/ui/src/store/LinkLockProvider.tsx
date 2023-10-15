"use client";

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

export const LinkLockProvider: FC<LinkLockProvider.Props> = ({
                                                                 isLock,
                                                                 children
                                                             }) => {
    return <LinkLockStore.Provider
        defaults={{
            isLock: isLock !== undefined ? isLock : false,
        }}
    >
        {children}
    </LinkLockStore.Provider>;
};
