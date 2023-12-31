import {Menu}     from "@mantine/core";
import {
    type ComponentProps,
    type FC,
    type ReactNode
}                 from "react";
import {WithIcon} from "../ui/WithIcon";

export namespace MenuItem {
    export interface Props extends ComponentProps<typeof Menu.Item<"button">> {
        label: ReactNode;
    }
}

export const MenuItem: FC<MenuItem.Props> = (
    {
        label,
        leftSection,
        ...props
    }) => {
    return <Menu.Item
        leftSection={leftSection ? <WithIcon color={props.color || "gray"} icon={leftSection}/> : undefined}
        {...props}
    >
        {label}
    </Menu.Item>;
};
