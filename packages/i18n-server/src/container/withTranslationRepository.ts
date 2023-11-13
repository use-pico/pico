import {withService}                from "@use-pico/container";
import {type TranslationRepository} from "../repository/TranslationRepository";

export const withTranslationRepository = withService<TranslationRepository.Type>("@use-pico/i18n/TranslationRepository");
