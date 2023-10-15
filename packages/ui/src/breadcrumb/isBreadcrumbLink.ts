import {isObject}   from "@pico/utils";
import {Breadcrumb} from "../api/Breadcrumb";

export const isBreadcrumbLink = (item: any): item is Breadcrumb.Link => {
    if (!item || !isObject(item)) {
        return false;
    } else if ("type" in item && "href" in item) {
        return true;
    }
    return false;
};
