import {type Options} from "humanize-duration";
import {humanizer}    from "./humanizer";
import {isString}     from "./isString";

export const toHumanTimeMs = (miliseconds: number | string, options?: Options) => humanizer()(
    isString(miliseconds) ? parseFloat(miliseconds) : miliseconds,
    {
        units: ["h", "m", "s", "ms"],
        ...options
    }
);
