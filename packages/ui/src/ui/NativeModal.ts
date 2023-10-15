"use client";

import {type Modal}          from "@mantine/core";
import {type ComponentProps} from "react";

export {Modal as NativeModal} from "@mantine/core";
export namespace NativeModal {
    export type Props = ComponentProps<typeof Modal>;

}
