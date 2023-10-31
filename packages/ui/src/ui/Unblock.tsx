"use client";

import {useStore}   from "@use-pico/store";
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
    const block = useStore(BlockStore, ({unblock}) => ({unblock}));
    useEffect(() => {
        block.unblock();
    }, []);
    return null;
};
