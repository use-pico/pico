"use client";

import {type ComponentProps} from "react";

export {Box} from "@mantine/core";
export namespace Box {
    export type Props<TComponent = "div"> = ComponentProps<typeof Box<TComponent>>;
}
