import {type ITranslationInstance} from "../api/ITranslationInstance";
import {withDefaultPipeline}       from "../pipeline/withDefaultPipeline";

export const TranslationInstance: {
    instance: ITranslationInstance,
} = {
    instance: {
        locale:       "pseudo",
        translations: {},
        pipeline:     withDefaultPipeline({
            rich: {
                component: {
                    components: {},
                },
            },
        }),
    },
};
