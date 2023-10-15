"use client";

import {
    type FC,
    type PropsWithChildren
}                    from "react";
import {ActiveStore} from "./ActiveStore";

export namespace ActiveProvider {
    export type Props = PropsWithChildren<{
        defaultActive?: string[];
    }>;
}

export const ActiveProvider: FC<ActiveProvider.Props> = (
    {
        defaultActive,
        ...props
    }) => {
    return <ActiveStore.Provider
        defaults={{
            active: defaultActive || [],
        }}
        {...props}
    />;
};
