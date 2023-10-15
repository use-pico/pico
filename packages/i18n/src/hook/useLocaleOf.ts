"use client";

import {useMemo}  from "react";
import {localeOf} from "../utils/localeOf";

export namespace useLocaleOf {
    export type Props = localeOf.Props;
}

export const useLocaleOf = (props: useLocaleOf.Props) => {
    return useMemo(() => localeOf(props), [props.fallback, ...props.available]);
};
