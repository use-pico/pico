import {type ReactNode} from "react";

export interface IMenuLabel {
    type: "label";
    label?: ReactNode;
    icon?: ReactNode;
}
