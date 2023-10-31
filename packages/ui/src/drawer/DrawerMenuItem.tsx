import {useStore}    from "@use-pico/store";
import {type FC}     from "react";
import {MenuItem}    from "../menu/MenuItem";
import {DrawerStore} from "./DrawerStore";

export namespace DrawerMenuItem {
    export interface Props extends MenuItem.Props {
        drawerId: string;
    }
}

export const DrawerMenuItem: FC<DrawerMenuItem.Props> = (
    {
        drawerId,
        ...props
    }) => {
    const {open} = useStore(DrawerStore, ({open}) => ({open}));
    return <MenuItem
        onClick={() => open(drawerId)}
        {...props}
    />;
};
