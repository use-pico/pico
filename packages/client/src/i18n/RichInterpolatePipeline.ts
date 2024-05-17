import {
    isString,
    type ITranslationPipeline
}           from "@use-pico2/common";
import pupa from "pupa";

export const RichInterpolatePipeline: ITranslationPipeline.Factory<ITranslationPipeline.Rich> = () => (
    {
        text,
        values
    }
) => {
    return isString(text) ? pupa(text, values || {}, {
        ignoreMissing: true,
    }) : text;
};
