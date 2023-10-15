import {type IHrefProps} from "@use-pico/navigation";
import {ReactNode}       from "react";
import {ActionIcon}      from "../ui/ActionIcon";
import {ButtonLink}      from "../ui/ButtonLink";

export namespace Breadcrumb {
    export interface Base {
        type: "link" | "label";
    }

    export interface WithIcon extends Base {
        type: "label";
        icon: ReactNode;
        label?: ReactNode;
    }

    export interface WithLabel extends Base {
        type: "label";
        icon?: ReactNode;
        label: ReactNode;
    }

    export interface Link extends Base {
        type: "link";
        href: IHrefProps | string;
        label?: ReactNode;
        icon?: ReactNode;
        buttonProps?: ButtonLink.Props["buttonProps"];
        actionIconProps?: ActionIcon.Props;
    }

    export type Label =
        WithIcon
        | WithLabel;

    export type Item =
        Label
        | Link;
}
