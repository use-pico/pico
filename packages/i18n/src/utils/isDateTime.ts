import {isObject}      from "@use-pico/utils";
import {type DateTime} from "luxon";

export const isDateTime = (input: any): input is DateTime => {
    return isObject(input) && ("toJSDate" in input);
};
