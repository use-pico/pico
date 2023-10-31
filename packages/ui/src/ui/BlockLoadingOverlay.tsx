"use client";

import {useStore$}      from "@use-pico/store";
import {type FC}        from "react";
import {BlockStore}     from "../store/BlockStore";
import {LoadingOverlay} from "./LoadingOverlay";

export namespace BlockLoadingOverlay {
    export interface Props extends Omit<LoadingOverlay.Props, "visible"> {
    }
}

export const BlockLoadingOverlay: FC<BlockLoadingOverlay.Props> = props => {
    const block = useStore$(BlockStore, ({isBlock}) => ({isBlock}));
    return <LoadingOverlay
        visible={block?.isBlock}
        {...props}
    />;
};
