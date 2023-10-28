"use client";

import {
    type FC,
    useEffect
}                   from "react";
import {BlockStore} from "../store/BlockStore";

export namespace Unblock {
    export interface Props {
    }
}

export const Unblock: FC<Unblock.Props> = () => {
    const block = BlockStore.use(({unblock}) => ({unblock}));
    useEffect(() => {
        block.unblock();
    }, []);
    return null;
};
