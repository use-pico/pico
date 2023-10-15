"use client";

import {
    ActionIcon,
    Flex,
    Grid
}                      from "@mantine/core";
import {
    type IWithTranslation,
    Translation,
    useTranslation,
    useWithLocaleRedirect
}                      from "@pico/i18n";
import {isString}      from "@pico/utils";
import {IconArrowLeft} from "@tabler/icons-react";
import Head            from "next/head";
import {
    type FC,
    type PropsWithChildren,
    type ReactNode,
    useEffect
}                      from "react";
import {ActiveStore}   from "../store/ActiveStore";
import {BlockStore}    from "../store/BlockStore";
import {Container}     from "./Container";
import {Divider}       from "./Divider";
import {Group}         from "./Group";
import {Title}         from "./Title";
import {WithIcon}      from "./WithIcon";

export namespace Page {
    export type Props = PropsWithChildren<{
        /**
         * Set page title
         */
        title?: ReactNode;
        icon?: ReactNode;
        /**
         * Base translations for this page
         */
        withTranslation?: IWithTranslation;
        /**
         * Set active links (for menu selection or whatever).
         */
        withActive?: string[];
        /**
         *
         */
        postfix?: ReactNode;
        append?: ReactNode;
        /**
         * Right section of page header
         */
        extra?: ReactNode;
        /**
         * When provided, renders back button with redirect callback
         */
        onBack?(redirect: useWithLocaleRedirect.Redirect): void;
    }>;
}

export const Page: FC<Page.Props> = (
    {
        title,
        icon,
        withTranslation,
        withActive = [],
        postfix,
        append,
        extra,
        onBack,
        children
    }) => {
    const block = BlockStore.use(({unblock}) => ({unblock}));
    const redirect = useWithLocaleRedirect();
    const t = useTranslation(withTranslation);
    const {setActive} = ActiveStore.use(({setActive}) => ({setActive}));
    useEffect(() => {
        setActive(withActive);
    }, [...withActive]);
    useEffect(() => {
        block.unblock();
    }, []);

    return <Container fluid>
        <Head>
            {isString(title) && <title>{t(`${title}.title`, withTranslation?.values)}</title>}
        </Head>
        {(onBack || postfix || extra || title) && <Grid
            align={"center"}
            py={"xs"}
        >
            <Grid.Col span={"content"}>
                <Group>
                    {onBack && <>
                        <ActionIcon
                            variant={"subtle"}
                            onClick={() => onBack(redirect)}
                        >
                            <IconArrowLeft/>
                        </ActionIcon>
                        <Divider orientation={"vertical"}/>
                    </>}
                    {postfix}
                </Group>
            </Grid.Col>
            <Grid.Col span={"content"}>
                <Flex gap={"sm"} justify={"center"} align={"center"}>
                    {(onBack || postfix) && <Divider orientation={"vertical"} mr={"sm"}/>}
                    {title && <Group justify={"center"} gap={"sm"}>
                        {icon ? <WithIcon color={"gray"} icon={icon}/> : null}
                        <Title order={4}>
                            {isString(title) ? <Translation
                                {...withTranslation}
                                label={title}
                                withLabel={"title"}
                            /> : title}
                        </Title>
                    </Group>}
                </Flex>
            </Grid.Col>
            <Grid.Col
                span={"auto"}
            >
                <Flex
                    justify={"flex-end"}
                >
                    {extra}
                </Flex>
            </Grid.Col>
        </Grid>}
        <Grid>
            <Grid.Col span={"auto"}>
                {append}
            </Grid.Col>
        </Grid>
        {children}
    </Container>;
};
