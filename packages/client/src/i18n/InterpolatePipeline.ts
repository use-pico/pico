import {type ITranslationPipeline} from "@use-pico2/common";
import pupa                        from "pupa";

export const InterpolatePipeline: ITranslationPipeline.Factory<ITranslationPipeline.Text> = () => (
    {
        text,
        values
    }
) => {
    return pupa(text, values || {}, {
        ignoreMissing: true,
    });
};
