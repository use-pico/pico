"use client";

import {
    AppShell,
    Box
}                   from "@mantine/core";
import {LocaleLink} from "@use-pico/i18n";
import {
    BlockLoadingOverlay,
    Grid,
    GridCol,
    Group,
    Unblock
}                   from "@use-pico/ui";
import Image        from "next/image";
import {
    type ComponentProps,
    type FC,
    type PropsWithChildren,
    type ReactNode
}                   from "react";

export namespace AppLayout {
    export interface Props extends PropsWithChildren {
        logo: ComponentProps<typeof Image>["src"];
        homeUrl?: string;
        /**
         * Center part of the layout (header)
         */
        center?: ReactNode;
        right?: ReactNode;
    }
}

/**
 * General layout used inside app when a user is logged-in.
 */
export const AppLayout: FC<AppLayout.Props> = (
    {
        logo,
        homeUrl = "/root",
        center,
        right,
        children
    }) => {
    return <AppShell>
        <Box>
            <Unblock/>
            <BlockLoadingOverlay/>
            <Grid
                align={"center"}
                px={"md"}
                pt={"xs"}
            >
                <GridCol span={"content"}>
                    <LocaleLink
                        href={homeUrl}
                        style={{
                            display: "block",
                        }}
                    >
                        <Image
                            priority={true}
                            height={32}
                            alt={"logo"}
                            src={logo}
                        />
                    </LocaleLink>
                </GridCol>
                <GridCol span={"auto"} m={0}>
                    {center}
                </GridCol>
                <GridCol span={"content"}>
                    <Group gap={"xs"}>
                        {right}
                    </Group>
                </GridCol>
            </Grid>
        </Box>
        <AppShell.Main>
            {children}
        </AppShell.Main>
    </AppShell>;
};
