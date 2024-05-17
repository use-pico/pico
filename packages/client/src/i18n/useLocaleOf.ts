"use client";

import {localeOf} from "@use-pico2/common";
import {useMemo}  from "react";

export namespace useLocaleOf {
    export type Props = localeOf.Props;
}

export const useLocaleOf = (props: useLocaleOf.Props) => {
    return useMemo(() => localeOf(props), [props.fallback, ...props.available]);
};
