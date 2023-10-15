"use client";

import {Translation} from "@use-pico/i18n";
import {type FC}     from "react";
import {Button}      from "../ui/Button";
import {DrawerStore} from "./DrawerStore";

export namespace DrawerButton {
    export interface Props extends Omit<Button.Props, "children"> {
        drawerId: string;
        label?: string;
    }
}

export const DrawerButton: FC<DrawerButton.Props> = (
    {
        drawerId,
        label,
        ...props
    }) => {
    const {open} = DrawerStore.use(({open}) => ({open}));
    return <Button
        {...props}
        onClick={() => open(drawerId)}
    >
        <Translation label={"drawer"} withLabel={label}/>
    </Button>;
};
