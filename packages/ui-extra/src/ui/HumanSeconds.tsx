"use client";

import {useLocale}      from "@use-pico/i18n";
import {toHumanTimeSec} from "@use-pico/utils";
import {type FC}        from "react";

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
        units: [
            "mo",
            "d",
            "h",
            "m",
            "s",
            "ms",
        ]
    });
};
