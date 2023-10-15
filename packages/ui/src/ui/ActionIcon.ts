"use client";

import {type ComponentProps} from "react";

export {ActionIcon} from "@mantine/core";
export namespace ActionIcon {
    export type Props<TComponent = "button"> = ComponentProps<typeof ActionIcon<TComponent>>;
}
