import {TranslationInstance} from "../instance/TranslationInstance";
import {keyOf}               from "../utils/keyOf";

export namespace td {
    export interface Props {
        values?: Record<string, any>;
        fallback?: string;
    }
}

/**
 * Simple text dynamic translations (excluded from automatic translation extractor)
 */
export function td(
    props?: td.Props
) {
    return (input: string): string => {
        const key = input;
        return TranslationInstance.instance.pipeline.text.reduce(
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
