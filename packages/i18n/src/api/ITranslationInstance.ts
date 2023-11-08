import {type IPipeline}     from "./IPipeline";
import {type ITranslations} from "./ITranslations";

export interface ITranslationInstance {
    locale: string;
    translations: ITranslations;
    pipeline: {
        text: IPipeline.Text[];
        rich: IPipeline.Rich[];
    };
}
