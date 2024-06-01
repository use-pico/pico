"use client";

import {cn}         from "@use-pico/common";
import {type FC}    from "react";
import {BlockStore} from "../$export/BlockStore";
import {useStore}   from "../store/useStore";
import {Icon}       from "./Icon";

export namespace LoadingOverlay {
    export interface Props {
    }
}

export const LoadingOverlay: FC<LoadingOverlay.Props> = () => {
    const blockStore = useStore(BlockStore, ({isBlock}) => ({isBlock}));
    return blockStore.isBlock ? <div
        className={cn(
            "flex",
            "items-center justify-center gap-4",
            "absolute z-10 inset-0 bg-slate-200 bg-opacity-50 transition-opacity",
        )}
    >
        <Icon
            icon={"icon-[svg-spinners--pulse-rings-multiple]"}
            cx={[
                "text-sky-400",
                "text-8xl",
            ]}
        />
    </div> : null;
};
