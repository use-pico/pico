"use client";

import {Loader as CoolLoader} from "@mantine/core";
import {
    type ComponentProps,
    type FC
}                             from "react";

export interface ILoaderProps extends ComponentProps<typeof CoolLoader> {
}

export const Loader: FC<ILoaderProps> = props => {
    return <CoolLoader
        {...props}
    />;
};
