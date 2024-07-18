import type {ITranslationInstance} from "@use-pico/common";
import {TranslationInstance}       from "./TranslationInstance";

export const withTranslationInstance = (instance: ITranslationInstance) => {
	return TranslationInstance.instance = instance;
};
