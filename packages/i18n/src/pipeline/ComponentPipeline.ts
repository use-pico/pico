import interpolateComponents from "@jouwweb/interpolate-components";
import {isString}            from "@use-pico/utils";
import {type ReactNode}      from "react";
import {type IPipeline}      from "../api/IPipeline";

export namespace ComponentPipeline {
    export interface Config {
        components: Record<string, ReactNode>;
    }
}

export const ComponentPipeline: IPipeline.ConfigFactory<ComponentPipeline.Config, IPipeline.Rich> = ({components}) => {
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
