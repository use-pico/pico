import {type ReactNode}       from "react";
import {type IBreadcrumbBase} from "./IBreadcrumbBase";

export interface IBreadcrumbWithIcon extends IBreadcrumbBase {
    type: "label";
    icon: ReactNode;
    label?: ReactNode;
}

export interface IBreadcrumbWithLabel extends IBreadcrumbBase {
    type: "label";
    icon?: ReactNode;
    label: ReactNode;
}

export type IBreadcrumbLabel =
    IBreadcrumbWithIcon
    | IBreadcrumbWithLabel;
