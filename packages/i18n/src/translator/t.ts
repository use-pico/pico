import {type ReactNode}      from "react";
import {TranslationInstance} from "../instance/TranslationInstance";
import {translation}         from "./translation";

export namespace t {
    export interface Props {
        values?: Record<string, any>;
        fallback?: ReactNode;
    }
}

/**
 * Default RichText translation function (returns ReactNode); if you need simple text translations, use `tx`.
 */
export function t(
    props?: t.Props
) {
    return (input: TemplateStringsArray): ReactNode => {
        return TranslationInstance.instance.pipeline.rich.reduce<ReactNode>(
            (text, current) => {
                return current({
                    text,
                    values: props?.values,
                });
            },
            translation(input.join(""), props?.fallback)
        );
    };
}
