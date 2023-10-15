import {
    ActionMenu,
    MenuIcon
}                from "@use-pico/ui";
import {type FC} from "react";

export namespace TableRowActionMenu {
    export interface Props extends ActionMenu.Props {
    }
}

export const TableRowActionMenu: FC<TableRowActionMenu.Props> = props => {
    return <ActionMenu
        icon={<MenuIcon/>}
        {...props}
    />;
};
