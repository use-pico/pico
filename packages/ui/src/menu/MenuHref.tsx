import {Menu}       from "@mantine/core";
import {
    type ComponentProps,
    type FC,
    type ReactNode
}                   from "react";
import {ButtonLink} from "../ui/ButtonLink";

export namespace MenuHref {
    export interface Props extends Omit<ComponentProps<typeof Menu.Item<typeof ButtonLink>>, "children" | "label"> {
        label: ReactNode;
    }
}

export const MenuHref: FC<MenuHref.Props> = (
    {
        label,
        ...props
    }
) => {
    return <Menu.Item
        component={ButtonLink}
        label={label}
        {...props}
    />;
};
