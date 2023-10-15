import {type MantineColor} from "@mantine/core";
import {
    type FC,
    type ReactNode
}                          from "react";
import {CheckIcon}         from "../icon/CheckIcon";
import {UnCheckIcon}       from "../icon/UnCheckIcon";
import {UndefinedIcon}     from "../icon/UndefinedIcon";
import {WithIcon}          from "../ui/WithIcon";

export namespace BoolInline {
    export interface Props {
        bool?: boolean | null;
        checkIcon?: ReactNode;
        checkColor?: MantineColor;
        unCheckIcon?: ReactNode;
        unCheckColor?: MantineColor;
        undefinedIcon?: ReactNode;
        undefinedColor?: MantineColor;
    }
}

export const BoolInline: FC<BoolInline.Props> = (
    {
        bool,
        checkIcon = <CheckIcon/>,
        checkColor = "green.5",
        unCheckIcon = <UnCheckIcon/>,
        unCheckColor = "red.5",
        undefinedIcon = <UndefinedIcon/>,
        undefinedColor = "blue.5",
    }) => {
    return bool !== undefined && bool !== null ? (bool ? <WithIcon
        icon={checkIcon}
        color={checkColor}
    /> : <WithIcon
        icon={unCheckIcon}
        color={unCheckColor}
    />) : <WithIcon
        icon={undefinedIcon}
        color={undefinedColor}
    />;
};
