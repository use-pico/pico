import {type TranslationsSchema} from "@use-pico/common";
import {TranslationInstance}     from "./TranslationInstance";

/**
 * Update translation index; be careful as this method *must* be called at the top of application, blocking
 * rendering as it will *not* re-render page when it's done.
 */
export const withTranslations = ({translations}: TranslationsSchema.Type) => {
	TranslationInstance.instance.translations = {
		...TranslationInstance.instance.translations,
		...translations,
	};
};
