import {type ReactNode}      from "react";
import {TranslationInstance} from "../instance/TranslationInstance";
import {keyOf}               from "../utils/keyOf";

export namespace txr {
    export interface Props {
        values?: Record<string, any>;
        fallback?: ReactNode;
    }
}

export function txr(
    props?: txr.Props
) {
    return (input: TemplateStringsArray): ReactNode => {
        const key = input.join("");
        return TranslationInstance.instance.pipeline.rich.reduce<ReactNode>(
            (text, current) => {
                return current({
                    text,
                    values: props?.values,
                });
            },
            TranslationInstance.instance.translations[keyOf(key)]?.["value"] ?? props?.fallback ?? key
        );
    };
}
