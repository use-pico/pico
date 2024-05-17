import {isObject}        from "../toolbox/isObject";
import type {IHrefProps} from "./IHrefProps";

export const isHrefProps = (input: any): input is IHrefProps => {
    if (!input || !isObject(input)) {
        return false;
    } else if ("href" in input) {
        return true;
    }
    return false;
};
