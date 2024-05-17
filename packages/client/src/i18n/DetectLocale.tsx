"use client";

import {type FC}         from "react";
import {useDetectLocale} from "./useDetectLocale";

export namespace DetectLocale {
    export type Props = useDetectLocale.Props;
}

export const DetectLocale: FC<DetectLocale.Props> = (
    {
        locale,
        callback,
    }) => {
    useDetectLocale({
        locale,
        callback
    });
    return null;
};
