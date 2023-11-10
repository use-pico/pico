import {type ReactNode}      from "react";
import {TranslationInstance} from "../instance/TranslationInstance";
import {keyOf}               from "../utils/keyOf";

export const translation = <TFallback extends ReactNode | string>(key: string, fallback?: TFallback): string | ReactNode => {
    return TranslationInstance.instance.translations[keyOf(key)]?.["value"] ?? TranslationInstance.instance.translations[key]?.["value"] ?? fallback ?? key;
};
