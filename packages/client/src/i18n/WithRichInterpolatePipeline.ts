import {
	isString,
	type ITranslationPipeline
}           from "@use-pico/common";
import pupa from "pupa";

export const withRichInterpolatePipeline: ITranslationPipeline.Factory<ITranslationPipeline.Rich> = () => (
	{
		text,
		values
	}
) => {
	return isString(text) ? pupa(text, values || {}, {
		ignoreMissing: true,
	}) : text;
};
