import {keyOf}               from "@use-pico/common";
import type {ReactNode}      from "react";
import {TranslationInstance} from "./TranslationInstance";

export const translation = <
	TFallback extends ReactNode | string,
>(
	key: string,
	fallback?: TFallback
): string | ReactNode => {
	return TranslationInstance.instance.translations[keyOf(key)]?.value ?? TranslationInstance.instance.translations[key]?.value ?? fallback ?? key;
};
