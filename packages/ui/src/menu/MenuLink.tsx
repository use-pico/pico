import {Group}          from "@mantine/core";
import {LocaleLink}     from "@use-pico/i18n";
import {type FC}        from "react";
import {type IMenuLink} from "../api/IMenuLink";
import {WithIcon}       from "../ui/WithIcon";

export namespace MenuLink {
    export interface Props extends IMenuLink {
        className?: string;
    }
}

export const MenuLink: FC<MenuLink.Props> = (
    {
        href,
        query,
        className,
        icon,
        label,
        withLocale,
    }
) => {
    return <LocaleLink
        href={{
            href,
            query,
        }}
        withLocale={withLocale}
        className={className}
    >
        <Group
            justify={"apart"}
            gap={"xs"}
        >
            <WithIcon
                icon={icon}
            />
            {label}
        </Group>
    </LocaleLink>;
};
