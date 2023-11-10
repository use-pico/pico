import {TranslationInstance} from "../instance/TranslationInstance";
import {translation}         from "./translation";

export namespace tx {
    export interface Props {
        values?: Record<string, any>;
        fallback?: string;
    }
}

/**
 * Simple text translation; supports (usually) only text interpolation, but cannot expand any components (like bold and so on).
 */
export function tx(
    props?: tx.Props
) {
    return (input: TemplateStringsArray): string => {
        return TranslationInstance.instance.pipeline.text.reduce(
            (text, current) => {
                return current({
                    text,
                    values: props?.values,
                });
            },
            translation(input.join(""), props?.fallback) as string
        );
    };
}
