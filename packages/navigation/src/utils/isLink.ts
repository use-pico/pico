import {type ILink}  from "../api/ILink";
import {isHrefProps} from "./isHrefProps";

export const isLink = (input: any): input is ILink => {
    if (!input) {
        return false;
    } else if (isHrefProps(input)) {
        return true;
    }
    return false;
};
