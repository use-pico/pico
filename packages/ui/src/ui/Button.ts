"use client";

import {type ComponentProps} from "react";

export {Button} from "@mantine/core";
export namespace Button {
    export type Props<TComponent = "button"> = ComponentProps<typeof Button<TComponent>>;
}
