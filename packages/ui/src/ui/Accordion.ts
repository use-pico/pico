"use client";

import {Accordion as CoolAccordion} from "@mantine/core";
import {type ComponentProps}        from "react";

export const Accordion = CoolAccordion;
export namespace Accordion {
    export type Props = ComponentProps<typeof CoolAccordion>;
}
