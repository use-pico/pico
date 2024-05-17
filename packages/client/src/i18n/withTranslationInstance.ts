import type {ITranslationInstance} from "@use-pico2/common";
import {TranslationInstance}       from "./TranslationInstance";

export const withTranslationInstance = (instance: ITranslationInstance) => {
    return TranslationInstance.instance = instance;
};
