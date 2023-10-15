import {isObject}   from "@pico/utils";
import {Breadcrumb} from "../api/Breadcrumb";

export const isBreadcrumbLabel = (item: any): item is Breadcrumb.Label => {
    if (!item || !isObject(item)) {
        return false;
    } else if ("type" in item && ("label" in item || "icon" in item)) {
        return true;
    }
    return false;
};
