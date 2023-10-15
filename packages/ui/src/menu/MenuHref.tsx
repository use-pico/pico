import {Menu}        from "@mantine/core";
import {Translation} from "@use-pico/i18n";
import {
    ComponentProps,
    type FC
}                    from "react";
import {ButtonLink}  from "../ui/ButtonLink";

export namespace MenuHref {
    export interface Props extends Omit<ComponentProps<typeof Menu.Item<typeof ButtonLink>>, "children"> {
        withLabel: string;
    }
}

export const MenuHref: FC<MenuHref.Props> = (
    {
        withLabel,
        ...props
    }
) => {
    return <Menu.Item
        component={ButtonLink}
        label={<Translation withLabel={withLabel}/>}
        {...props}
    />;
};
