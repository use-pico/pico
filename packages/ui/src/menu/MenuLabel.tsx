import {Menu}  from "@mantine/core";
import {
    type ComponentProps,
    type FC,
    type ReactNode
}              from "react";
import {Group} from "../ui/Group";

export namespace MenuLabel {
    export interface Props extends ComponentProps<typeof Menu.Label> {
        icon?: ReactNode;
        label?: ReactNode;
    }
}

export const MenuLabel: FC<MenuLabel.Props> = (
    {
        icon,
        label,
        ...props
    }) => {
    return <Menu.Label
        {...props}
    >
        <Group>
            {icon}
            {label}
        </Group>
    </Menu.Label>;
};
