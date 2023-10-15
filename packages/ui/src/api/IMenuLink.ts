import {type ILink} from "@use-pico/navigation";

export interface IMenuLink<TPath extends string = string> extends ILink<TPath> {
    type: "link";
}
