import {Translation} from "@use-pico/i18n";
import {
    type FC,
    type PropsWithChildren
}                    from "react";
import {Container}   from "./Container";
import {Group}       from "./Group";
import classes       from "./Status.module.css";
import {Text}        from "./Text";
import {Title}       from "./Title";

export namespace Status {
    export type Props = PropsWithChildren<{
        header?: string;
        title?: string;
        message?: string;
    }>;
}

export const Status: FC<Status.Props> = (
    {
        header,
        title,
        message,
        children
    }) => {
    return <Container className={classes.root}>
        {header && <div className={classes.label}>
            <Translation withLabel={header}/>
        </div>}
        {title && <Title className={classes.title}>
            <Translation withLabel={title}/>
        </Title>}
        {message && <Text size={"lg"} className={classes.description}>
            <Translation withLabel={message}/>
        </Text>}
        <Group justify={"center"}>
            {children}
        </Group>
    </Container>;
};
