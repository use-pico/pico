import {type Options} from "humanize-duration";
import {isString}     from "../$export/isString";
import {humanizer}    from "./humanizer";

export const toHumanTimeMs = (miliseconds: number | string, options?: Options) => humanizer()(
    isString(miliseconds) ? parseFloat(miliseconds) : miliseconds,
    {
        units: ["h", "m", "s", "ms"],
        ...options
    }
);
