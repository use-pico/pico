import {cn}      from "@use-pico/common";
import {type FC} from "react";

export namespace Progress {
    export interface Props extends cn.WithTheme<"root" | "progress"> {
        value?: number;
    }
}

export const Progress: FC<Progress.Props> = (
    {
        value,
    }
) => {
    return <>
        PROGRESS {value}
    </>;
};
