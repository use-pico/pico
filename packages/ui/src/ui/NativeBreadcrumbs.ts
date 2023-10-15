"use client";

import {type Breadcrumbs}    from "@mantine/core";
import {type ComponentProps} from "react";

export {Breadcrumbs as NativeBreadcrumbs} from "@mantine/core";
export namespace NativeBreadcrumbs {
    export type Props = ComponentProps<typeof Breadcrumbs>;
}
