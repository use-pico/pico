import {type IHrefProps}      from "@pico/types";
import {type ReactNode}       from "react";
import {type ActionIcon}      from "../ui/ActionIcon";
import {ButtonLink}           from "../ui/ButtonLink";
import {type IBreadcrumbBase} from "./IBreadcrumbBase";

export interface IBreadcrumbLink extends IBreadcrumbBase {
    type: "link";
    href: IHrefProps | string;
    label?: ReactNode;
    icon?: ReactNode;
    buttonProps?: ButtonLink.Props["buttonProps"];
    actionIconProps?: ActionIcon.Props;
}
