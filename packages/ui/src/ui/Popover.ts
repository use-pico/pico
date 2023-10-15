"use client";

import {Popover as CoolPopover} from "@mantine/core";
import {type ComponentProps}    from "react";

export const Popover = CoolPopover;
export namespace Popover {
    export type Props = ComponentProps<typeof CoolPopover>;
}
