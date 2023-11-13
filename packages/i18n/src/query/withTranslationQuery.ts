import {withRpcQuery}       from "@use-pico/rpc";
import {TranslationsSchema} from "../schema/TranslationsSchema";
import {WithLocaleSchema}   from "../schema/WithLocaleSchema";

export const withTranslationQuery = withRpcQuery({
    key:    ["pico", "i18n", "translation", "query"],
    schema: {
        request:  WithLocaleSchema,
        response: TranslationsSchema,
    },
});
