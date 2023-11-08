import {isString}       from "@use-pico/utils";
import pupa             from "pupa";
import {type IPipeline} from "../api/IPipeline";

export const RichInterpolatePipeline: IPipeline.Factory<IPipeline.Rich> = () => (
    {
        text,
        values
    }
) => {
    return isString(text) ? pupa(text, values || {}, {
        ignoreMissing: true,
    }) : text;
};
