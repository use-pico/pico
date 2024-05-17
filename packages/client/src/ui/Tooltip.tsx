import {type FC} from "react";
import {Float}   from "./Float";

export namespace Tooltip {
    export interface Props extends Float.Props {
    }
}

export const Tooltip: FC<Tooltip.Props> = (
    {
        ...props
    }
) => {
    return <Float
        {...props}
    />;
};
