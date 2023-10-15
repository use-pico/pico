import {type IHrefProps} from "@pico/types";
import isObject          from "is-object";

export const isHrefProps = (input: any): input is IHrefProps => {
    if (!input || !isObject(input)) {
        return false;
    } else if ("href" in input) {
        return true;
    }
    return false;
};
