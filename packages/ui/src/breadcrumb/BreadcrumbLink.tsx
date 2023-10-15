import {ActionIcon}           from "@mantine/core";
import {LocaleLink}           from "@pico/i18n";
import {type FC}              from "react";
import {type IBreadcrumbLink} from "../api/IBreadcrumbLink";
import {ButtonLink}           from "../ui/ButtonLink";

export namespace BreadcrumbLink {
    export interface Props extends IBreadcrumbLink {
    }
}

export const BreadcrumbLink: FC<BreadcrumbLink.Props> = (
    {
        href,
        icon,
        label,
        buttonProps,
        actionIconProps,
    }
) => {
    return label ? <ButtonLink
        href={href}
        icon={icon}
        label={label}
        buttonProps={{
            size:    "lg",
            p:       "xs",
            variant: "subtle",
            ...buttonProps,
        }}
    /> : <LocaleLink
        href={href}
    >
        <ActionIcon
            size={"xl"}
            variant={"subtle"}
            color={"blue.5"}
            {...actionIconProps}
        >
            {icon}
        </ActionIcon>
    </LocaleLink>;
};
