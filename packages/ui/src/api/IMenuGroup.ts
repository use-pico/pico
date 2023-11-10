import {type ReactNode}  from "react";
import {type IMenuLabel} from "./IMenuLabel";
import {type IMenuLink}  from "./IMenuLink";

export interface IMenuGroup {
    type: "group";
    label?: ReactNode;
    icon?: ReactNode;
    items: (IMenuLabel | IMenuLink)[];
}
