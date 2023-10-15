import {
    Group,
    Menu
}                        from "@mantine/core";
import {
    type IWithTranslation,
    Translation
}                        from "@pico/i18n";
import {type FC}         from "react";
import {type IMenuGroup} from "../api/IMenuGroup";
import {WithIcon}        from "../ui/WithIcon";
import {MenuLink}        from "./MenuLink";

export interface IMenuGroupProps extends IMenuGroup {
    id: string;
    withTranslation?: IWithTranslation;
    className?: string;
}

export const MenuGroup: FC<IMenuGroupProps> = (
    {
        id,
        withTranslation,
        className,
        label,
        icon,
        items,
    }) => {
    return <Menu
        trigger={"hover"}
        transitionProps={{exitDuration: 0}}
        withinPortal
    >
        <Menu.Target>
            <a
                className={className}
                onClick={event => event.preventDefault()}
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
            </a>
        </Menu.Target>
        <Menu.Dropdown>
            {Object.entries(items).map(([id, item]) => <MenuLink
                key={id}
                id={id}
                withTranslation={withTranslation}
                className={className}
                {...item}
            />)}
        </Menu.Dropdown>
    </Menu>;
};
