"use client";

import {
    AppShell,
    Box,
    Button,
    Group,
    LoadingOverlay
}                   from "@mantine/core";
import {
    LocaleLink,
    useLocaleRouter,
    useTranslation
}                   from "@pico/i18n";
import {IconLogin}  from "@tabler/icons-react";
import {signIn}     from "next-auth/react";
import Image        from "next/image";
import {
    type ComponentProps,
    type FC,
    type PropsWithChildren,
    type ReactNode,
    useEffect
}                   from "react";
import {BlockStore} from "../store/BlockStore";
import classes      from "./PublicLayout.module.css";

export namespace PublicLayout {
    export interface Props extends PropsWithChildren {
        logo: ComponentProps<typeof Image>["src"];
        homeUrl?: string;
        /**
         * If provided, user will be redirected here; defaults to next-auth signIn()
         */
        loginUrl?: string;
        /**
         * Hides login button from header
         */
        withoutLogin?: boolean;
        /**
         * Center part of the layout (header)
         */
        center?: ReactNode;
    }
}

export const PublicLayout: FC<PublicLayout.Props> = (
    {
        logo,
        homeUrl = "/public",
        loginUrl,
        withoutLogin = false,
        center,
        children
    }) => {
    const block = BlockStore.use$();
    const t = useTranslation("public");
    const router = useLocaleRouter();
    useEffect(() => {
        block?.unblock();
    }, []);
    return <AppShell>
        <Box>
            <LoadingOverlay
                visible={block?.isBlock || false}
            />
            <Group
                className={classes.headerGroup}
                justify={"apart"}
            >
                <Group>
                    <LocaleLink href={homeUrl}>
                        <Image
                            priority={true}
                            width={200}
                            height={64}
                            alt={"logo"}
                            src={logo}
                        />
                    </LocaleLink>
                    {center}
                </Group>
                {!withoutLogin && <Group>
                    <Button
                        leftSection={<IconLogin/>}
                        onClick={() => loginUrl ? router.push({
                            href: loginUrl,
                        }) : signIn()}
                    >
                        {t("button.sign-in")}
                    </Button>
                </Group>}
            </Group>
        </Box>
        <AppShell.Main>
            {children}
        </AppShell.Main>
    </AppShell>;
};
