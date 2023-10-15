import {isObject}              from "@use-pico/utils";
import {type IWithTranslation} from "./IWithTranslation";

export const isTranslation = (input?: any): input is IWithTranslation => {
    if (!input || !isObject(input)) {
        return false;
    }
    return "namespace" in input || "label" in input || "withLabel" in input || "values" in input;
};
