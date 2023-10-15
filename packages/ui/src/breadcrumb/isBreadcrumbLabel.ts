import {isObject}              from "@pico/utils";
import {type IBreadcrumbLabel} from "../api/IBreadcrumbLabel";

export const isBreadcrumbLabel = (item: any): item is IBreadcrumbLabel => {
    if (!item || !isObject(item)) {
        return false;
    } else if ("type" in item && ("label" in item || "icon" in item)) {
        return true;
    }
    return false;
};
