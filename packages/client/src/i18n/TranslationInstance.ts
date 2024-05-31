import type {ITranslationInstance} from "@use-pico/common";
import {withDefaultPipeline} from "./withDefaultPipeline";

export const TranslationInstance: {
	instance: ITranslationInstance,
} = {
	instance: {
		locale: "pseudo",
		translations: {},
		pipeline: withDefaultPipeline({
			rich: {
				component: {
					components: {},
				},
			},
		}),
	},
};
