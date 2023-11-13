import {withDullRpc}           from "@use-pico/dull-stuff";
import {TranslationDullSchema} from "../schema/TranslationDullSchema";

export const TranslationRpc = withDullRpc({
    key:    ["pico", "translation"],
    schema: TranslationDullSchema,
});
export type TranslationRpc = typeof TranslationRpc;
