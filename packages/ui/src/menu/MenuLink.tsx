import {Group}          from "@mantine/core";
import {
    type IWithTranslation,
    LocaleLink,
    Translation
}                       from "@use-pico/i18n";
import {type FC}        from "react";
import {type IMenuLink} from "../api/IMenuLink";
import {WithIcon}       from "../ui/WithIcon";

export interface IMenuLinkProps extends IMenuLink {
    id: string;
    withTranslation?: IWithTranslation;
    className?: string;
}

export const MenuLink: FC<IMenuLinkProps> = (
    {
        id,
        withTranslation,
        href,
        query,
        className,
        icon,
        label,
        withLocale,
    }) => {
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
            <Translation
                {...withTranslation}
                withLabel={label || id}
            />
        </Group>
    </LocaleLink>;
};
