import {type ILink} from "@pico/navigation";

export interface IMenuLink<TPath extends string = string> extends ILink<TPath> {
    type: "link";
}
