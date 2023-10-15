import {type ReactNode} from "react";
import {type IMenuLink} from "./IMenuLink";

export interface IMenuGroup {
    type: "group";
    label: string;
    icon?: ReactNode;
    items: Record<string, IMenuLink>;
}
