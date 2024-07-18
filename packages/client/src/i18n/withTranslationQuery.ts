import {
	TranslationsSchema,
	WithLocaleSchema
}                     from "@use-pico/common";
import {withRpcQuery} from "../rpc/withRpcQuery";

export const withTranslationQuery = withRpcQuery({
	key:    ["pico", "i18n", "translation", "query"],
	schema: {
		request:  WithLocaleSchema,
		response: TranslationsSchema,
	},
});
