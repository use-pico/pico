import {type Options}  from "humanize-duration";
import {toHumanTimeMs} from "./toHumanTimeMs";

export const toHumanTimeSec = (secs: number | string, options?: Options) => toHumanTimeMs(parseFloat(secs as string) * 1000, options);
