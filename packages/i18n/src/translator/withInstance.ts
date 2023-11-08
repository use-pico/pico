import {type ITranslationInstance} from "../api/ITranslationInstance";
import {TranslationInstance}       from "../instance/TranslationInstance";

export const withInstance = (instance: ITranslationInstance) => {
    return TranslationInstance.instance = instance;
};
