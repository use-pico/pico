"use client";

import {type ComponentProps} from "react";

export {Card} from "@mantine/core";
export namespace Card {
    export type Props<TComponent = "div"> = ComponentProps<typeof Card<TComponent>>;
}
