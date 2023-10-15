"use client";

import {
    type IWithTranslation,
    WithTranslationProvider
}                        from "@pico/i18n";
import {isHrefProps}     from "@pico/navigation";
import {cx}              from "@pico/utils";
import {type FC}         from "react";
import {type IMenuItems} from "../api/IMenuItems";
import {ActiveStore}     from "../store/ActiveStore";
import {Group}           from "../ui/Group";
import classes           from "./Menu.module.css";
import {MenuLink}        from "./MenuLink";

export namespace Menu {
    export interface Props {
        withTranslation?: IWithTranslation;
        items: IMenuItems;
    }

    export type Classes = typeof classes;
}

export const Menu: FC<Menu.Props> = (
    {
        withTranslation,
        items,
    }) => {
    const {active: withActive} = ActiveStore.use(({active}) => ({active}));

    return <WithTranslationProvider
        withTranslation={withTranslation}
    >
        <Group
            h={"100%"}
            mb={"sm"}
            gap={0}
        >
            {Object.entries(items).map(([id, item]) => {
                if (isHrefProps(item)) {
                    return <MenuLink
                        key={id}
                        id={id}
                        withTranslation={withTranslation}
                        className={cx(
                            classes.Link,
                            classes.LinkActive ? {
                                [classes.LinkActive]: withActive.includes(item.href) || withActive.includes(id),
                            } : undefined
                        )}
                        {...item}
                    />;
                }
                return null;
            })}
        </Group>
    </WithTranslationProvider>;
};
