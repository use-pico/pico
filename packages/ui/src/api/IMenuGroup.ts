import {type ReactNode} from "react";
import {type IMenuLink} from "./IMenuLink";

export interface IMenuGroup {
    type: "group";
    label?: ReactNode;
    icon?: ReactNode;
    items: IMenuLink[];
}
