import {type ILink}     from "@use-pico/navigation";
import {type ReactNode} from "react";

export interface IMenuLink<TPath extends string = string> extends ILink<TPath> {
    type: "link";
    label?: ReactNode;
    icon?: ReactNode;
}
