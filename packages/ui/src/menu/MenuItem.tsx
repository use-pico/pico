"use client";

import {Menu}        from "@mantine/core";
import {Translation} from "@use-pico/i18n";
import {
    type ComponentProps,
    type FC
}                    from "react";
import {WithIcon}    from "../ui/WithIcon";

export namespace MenuItem {
    export interface Props extends ComponentProps<typeof Menu.Item<"button">> {
        withLabel: string;
    }
}

export const MenuItem: FC<MenuItem.Props> = (
    {
        withLabel,
        leftSection,
        ...props
    }) => {
    return <Menu.Item
        leftSection={leftSection ? <WithIcon color={props.color || "gray"} icon={leftSection}/> : undefined}
        {...props}
    >
        <Translation withLabel={withLabel}/>
    </Menu.Item>;
};
