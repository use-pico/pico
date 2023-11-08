import {tx}        from "@use-pico/i18n";
import {type FC}   from "react";
import {CloseIcon} from "../icon/CloseIcon";
import {Button}    from "./Button";

export namespace ActionBackButton {
    export interface Props extends Button.Props {
    }
}

export const ActionBackButton: FC<ActionBackButton.Props> = props => {
    return <Button
        leftSection={<CloseIcon/>}
        size={"md"}
        color={"blue"}
        variant={"subtle"}
        {...props}
    >
        {tx()`Cancel`}
    </Button>;
};
