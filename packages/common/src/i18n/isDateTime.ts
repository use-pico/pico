import type {DateTime} from "luxon";
import {isObject}      from "../toolbox/isObject";

export const isDateTime = (input: any): input is DateTime => {
    return isObject(input) && ("toJSDate" in input);
};
