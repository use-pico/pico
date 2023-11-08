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
        withLabel?: ReactNode;
    }
}

export const MenuLabel: FC<MenuLabel.Props> = (
    {
        icon,
        withLabel,
        ...props
    }) => {
    return <Menu.Label
        {...props}
    >
        <Group>
            {icon}
            {withLabel}
        </Group>
    </Menu.Label>;
};
