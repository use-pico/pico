import {type ITranslationPipeline} from "./ITranslationPipeline";
import {type ITranslations}        from "./ITranslations";

export interface ITranslationInstance {
    locale: string;
    translations: ITranslations;
    pipeline: {
        text: ITranslationPipeline.Text[];
        rich: ITranslationPipeline.Rich[];
    };
}
