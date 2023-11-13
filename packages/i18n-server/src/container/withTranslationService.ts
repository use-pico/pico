import {withService}              from "@use-pico/container";
import {type ITranslationService} from "../api/ITranslationService";

export const withTranslationService = withService<ITranslationService>("@use-pico/i18n/TranslationService");
