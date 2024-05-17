"use client";

import {toHumanTimeSec} from "@use-pico2/common";
import type {FC}        from "react";
import {useLocale}      from "./useLocale";

export namespace HumanSeconds {
    export interface Props {
        seconds: number;
    }
}

export const HumanSeconds: FC<HumanSeconds.Props> = (
    {
        seconds,
    }
) => {
    const locale = useLocale();

    return toHumanTimeSec(seconds, {
        language: locale,
        units:    [
            "mo",
            "d",
            "h",
            "m",
            "s",
            "ms",
        ]
    });
};
