import {TranslationInstance} from "./TranslationInstance";

export const useLocale = () => {
	return TranslationInstance.instance.locale;
};
