import {isObject}             from "@pico/utils";
import {type IBreadcrumbLink} from "../api/IBreadcrumbLink";

export const isBreadcrumbLink = (item: any): item is IBreadcrumbLink => {
    if (!item || !isObject(item)) {
        return false;
    } else if ("type" in item && "href" in item) {
        return true;
    }
    return false;
};
