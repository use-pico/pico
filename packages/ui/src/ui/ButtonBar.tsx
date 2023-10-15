"use client";

import {Flex}  from "@mantine/core";
import {
    type ComponentProps,
    type FC
}              from "react";
import {Box}   from "./Box";
import {Stack} from "./Stack";

export interface IButtonBarProps extends ComponentProps<typeof Box<"div">> {
    inline?: boolean;
}

export const ButtonBar: FC<IButtonBarProps> = (
    {
        inline = true,
        children,
        ...props
    }) => {
    return <Box
        {...props}
    >
        {inline ? <Flex
            gap={"sm"}
            align={"center"}
        >
            {children}
        </Flex> : <Stack
            align={"center"}
        >
            {children}
        </Stack>}
    </Box>;
};
