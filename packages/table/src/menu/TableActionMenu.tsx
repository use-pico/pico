import {
    ActionMenu,
    ActionMenuIcon
}                from "@pico/ui";
import {type FC} from "react";

export namespace TableActionMenu {
    export interface Props extends ActionMenu.Props {
    }
}

export const TableActionMenu: FC<TableActionMenu.Props> = props => {
    return <ActionMenu
        icon={<ActionMenuIcon/>}
        {...props}
    />;
};
