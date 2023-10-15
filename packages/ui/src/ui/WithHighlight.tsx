"use client";

import {Highlight} from "@mantine/core";
import {
    type ComponentProps,
    type FC
}                  from "react";

export interface IWithHighlightProps extends Omit<ComponentProps<typeof Highlight<"div">>, "children" | "highlight"> {
    text?: string | null;
    highlight: string[];
}

export const WithHighlight: FC<IWithHighlightProps> = (
    {
        text,
        ...props
    }) => {
    return text ? <Highlight
        {...props}
    >
        {text}
    </Highlight> : null;
};
