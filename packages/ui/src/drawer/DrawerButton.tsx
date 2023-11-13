"use client";

import {useStore}    from "@use-pico/store";
import {
    type FC,
    type ReactNode
}                    from "react";
import {Button}      from "../ui/Button";
import {DrawerStore} from "./DrawerStore";

export namespace DrawerButton {
    export interface Props extends Omit<Button.Props, "children"> {
        drawerId: string;
        label?: ReactNode;
    }
}

export const DrawerButton: FC<DrawerButton.Props> = (
    {
        drawerId,
        label,
        ...props
    }) => {
    const {open} = useStore(DrawerStore, ({open}) => ({open}));

    return <Button
        {...props}
        onClick={() => open(drawerId)}
    >
        {label}
    </Button>;
};
