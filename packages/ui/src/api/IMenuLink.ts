import {type ILink} from "@pico/types";

export interface IMenuLink<TPath extends string = string> extends ILink<TPath> {
    type: "link";
}
