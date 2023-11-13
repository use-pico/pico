import {withDullUI}            from "@use-pico/dull-stuff";
import {TranslationRpc}        from "../rpc/TranslationRpc";
import {TranslationQueryStore} from "../store/TranslationQueryStore";

export const TranslationUI = withDullUI({
    rpc:        TranslationRpc,
    queryStore: TranslationQueryStore,
});
export type TranslationUI = typeof TranslationUI;
