import Head         from "next/head";
import {
    type FC,
    type PropsWithChildren,
    type ReactNode
}                   from "react";
import {Container}  from "./Container";
import {Divider}    from "./Divider";
import {Flex}       from "./Flex";
import {Grid}       from "./Grid";
import {GridCol}    from "./GridCol";
import {Group}      from "./Group";
import {BackButton} from "./Page/BackButton";
import {Title}      from "./Title";
import {Unblock}    from "./Unblock";
import {WithIcon}   from "./WithIcon";

export namespace Page {
    export type Props = PropsWithChildren<{
        text?: {
            title?: string;
            header?: ReactNode;
        };
        icon?: ReactNode;
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

        onBack?: BackButton.Props["onBack"];
    }>;
}

export const Page: FC<Page.Props> = (
    {
        text,
        icon,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        withActive = [],
        postfix,
        append,
        extra,
        onBack,
        children
    }) => {
    return <Container fluid>
        <Unblock/>
        {text?.header && <Head>
            <title>
                {text?.header}
            </title>
        </Head>}
        {(onBack || postfix || extra || text?.title) && <Grid
            align={"center"}
            py={"xs"}
        >
            <GridCol span={"content"}>
                <Group>
                    {onBack && <>
                        <BackButton onBack={onBack}/>
                        <Divider orientation={"vertical"}/>
                    </>}
                    {postfix}
                </Group>
            </GridCol>
            <GridCol span={"content"}>
                <Flex gap={"sm"} justify={"center"} align={"center"}>
                    {(onBack || postfix) && <Divider orientation={"vertical"} mr={"sm"}/>}
                    {text?.title && <Group justify={"center"} gap={"sm"}>
                        {icon ? <WithIcon color={"gray"} icon={icon}/> : null}
                        <Title order={4}>
                            {text?.title}
                        </Title>
                    </Group>}
                </Flex>
            </GridCol>
            <GridCol
                span={"auto"}
            >
                <Flex
                    justify={"flex-end"}
                >
                    {extra}
                </Flex>
            </GridCol>
        </Grid>}
        <Grid>
            <GridCol span={"auto"}>
                {append}
            </GridCol>
        </Grid>
        {children}
    </Container>;
};
