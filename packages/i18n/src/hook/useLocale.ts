import {TranslationInstance} from "../instance/TranslationInstance";

export const useLocale = () => {
    return TranslationInstance.instance.locale;
};
