import interpolateComponents from "@jouwweb/interpolate-components";
import {
    isString,
    type ITranslationPipeline
}                            from "@use-pico2/common";
import {type ReactNode}      from "react";

export namespace ComponentPipeline {
    export interface Config {
        components: Record<string, ReactNode>;
    }
}

export const ComponentPipeline: ITranslationPipeline.ConfigFactory<ComponentPipeline.Config, ITranslationPipeline.Rich> = ({components}) => {
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
