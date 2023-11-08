import {
    type FC,
    type PropsWithChildren,
    type ReactNode
}                  from "react";
import {Container} from "./Container";
import {Group}     from "./Group";
import classes     from "./Status.module.css";
import {Text}      from "./Text";
import {Title}     from "./Title";

export namespace Status {
    export type Props = PropsWithChildren<{
        text?: {
            header?: ReactNode;
            title?: ReactNode;
            message?: ReactNode;
        }
    }>;
}

export const Status: FC<Status.Props> = (
    {
        text,
        children
    }) => {
    return <Container className={classes.root}>
        {text?.header && <div className={classes.label}>
            {text?.header}
        </div>}
        {text?.title && <Title className={classes.title}>
            {text?.title}
        </Title>}
        {text?.message && <Text size={"lg"} className={classes.description}>
            {text?.message}
        </Text>}
        <Group justify={"center"}>
            {children}
        </Group>
    </Container>;
};
