import {LocaleLink}   from "@use-pico/i18n";
import {
    AppShell,
    AppShellMain,
    BlockLoadingOverlay,
    Box,
    Grid,
    GridCol,
    Group,
    Unblock
}                     from "@use-pico/ui";
import Image          from "next/image";
import {
    type ComponentProps,
    type FC,
    type PropsWithChildren,
    type ReactNode
}                     from "react";
import {SignInButton} from "./PublicLayout/SignInButton";

export namespace PublicLayout {
    export interface Props extends PropsWithChildren {
        logo: ComponentProps<typeof Image>["src"];
        homeUrl?: string;
        /**
         * If provided, user will be redirected here; defaults to next-auth signIn()
         */
        loginUrl?: string;
        signInOptions?: SignInButton.Props["signInOptions"];
        /**
         * Hides login button from header
         */
        withoutLogin?: boolean;
        /**
         * Center part of the layout (header)
         */
        center?: ReactNode;
        right?: ReactNode;
    }
}

export const PublicLayout: FC<PublicLayout.Props> = (
    {
        logo,
        homeUrl = "/public",
        loginUrl,
        signInOptions,
        withoutLogin = false,
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
                        {!withoutLogin && <Group>
                            <SignInButton
                                loginUrl={loginUrl}
                                signInOptions={signInOptions}
                            />
                        </Group>}
                    </Group>
                </GridCol>
            </Grid>
        </Box>
        <AppShellMain>
            {children}
        </AppShellMain>
    </AppShell>;
};
