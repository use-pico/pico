import {isObject}        from "@use-pico/utils";
import {type IMenuLabel} from "../api/IMenuLabel";

export const isMenuLabel = (item: any): item is IMenuLabel => {
    if (!item || !isObject(item)) {
        return false;
    } else if ("label" in item) {
        return true;
    }
    return false;
};
