import {type TranslationSchema} from "@use-pico/i18n";

export interface ITranslationService {
    translations(locale: string): Promise<Record<string, TranslationSchema.Type>>;
}
