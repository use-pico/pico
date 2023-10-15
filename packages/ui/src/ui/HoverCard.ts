"use client";

import {HoverCard as CoolHoverCard} from "@mantine/core";
import {type ComponentProps}        from "react";

export const HoverCard = CoolHoverCard;
export namespace HoverCard {
    export type Props = ComponentProps<typeof HoverCard>;
}
