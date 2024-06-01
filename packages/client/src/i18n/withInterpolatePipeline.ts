import {type ITranslationPipeline} from "@use-pico/common";
import pupa                        from "pupa";

export const withInterpolatePipeline: ITranslationPipeline.Factory<ITranslationPipeline.Text> = () => (
	{
		text,
		values
	}
) => {
	return pupa(text, values || {}, {
		ignoreMissing: true,
	});
};
