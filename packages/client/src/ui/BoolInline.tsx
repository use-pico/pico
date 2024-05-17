import type {FC}       from "react";
import {CheckIcon}     from "../icon/CheckIcon";
import {UnCheckIcon}   from "../icon/UnCheckIcon";
import {UndefinedIcon} from "../icon/UndefinedIcon";
import {Icon}          from "./Icon";

export namespace BoolInline {
    export interface Props extends Icon.PropsEx {
        bool?: boolean | null;
        checkIcon?: string;
        unCheckIcon?: string;
        undefinedIcon?: string;
    }
}

export const BoolInline: FC<BoolInline.Props> = (
    {
        bool,
        checkIcon = CheckIcon,
        unCheckIcon = UnCheckIcon,
        undefinedIcon = UndefinedIcon,
        ...props
    }) => {
    return bool !== undefined && bool !== null ? (bool ? <Icon
        icon={checkIcon}
        {...props}
    /> : <Icon
        icon={unCheckIcon}
        {...props}
    />) : <Icon
        icon={undefinedIcon}
        {...props}
    />;
};
