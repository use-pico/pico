"use client";

import {localeOf} from "@use-pico/common";
import {useMemo}  from "react";

export namespace useLocaleOf {
	export type Props = localeOf.Props;
}

/**
 * This hook resolves current prefered locale from the available locales and fallback locale.
 */
export const useLocaleOf = (props: useLocaleOf.Props) => {
	return useMemo(() => localeOf(props), [props.fallback, ...props.available]);
};
