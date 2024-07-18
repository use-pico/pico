import interpolateComponents from "@jouwweb/interpolate-components";
import {
	isString,
	type ITranslationPipeline
}                            from "@use-pico/common";
import {type ReactNode}      from "react";

export namespace withComponentPipeline {
	export interface Config {
		components: Record<string, ReactNode>;
	}
}

export const withComponentPipeline: ITranslationPipeline.ConfigFactory<withComponentPipeline.Config, ITranslationPipeline.Rich> = ({components}) => {
	return ({text}) => isString(text) ? interpolateComponents({
		mixedString: text,
		tags:        {
			componentOpen:        ["<", ">"],
			componentClose:       ["</", ">"],
			componentSelfClosing: ["<", "/>"],
		},
		components,
		throwErrors: false,
	}) : text;
};
