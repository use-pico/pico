import {
    type FC,
    type ReactNode
}                from "react";
import {Divider} from "./Divider";
import {Stack}   from "./Stack";
import {Text}    from "./Text";
import {Title}   from "./Title";

export namespace Result {
    export type Props =
        Stack.Props
        & {
            text: {
                title: ReactNode;
                subtitle: ReactNode;
            }
            /**
             * Top part of the component (should be usually an icon).
             */
            icon?: ReactNode;
            /**
             * Postfix of the header part
             */
            postfix?: ReactNode;
        };
}

/**
 * Because I didn't get a better name and it is historically based on Ant Design's Result component, this component
 * share the same name.
 *
 * Only it's cleaner and clever.
 */
export const Result: FC<Result.Props> = (
    {
        text,
        icon,
        postfix,
        children,
        ...props
    }
) => {
    return <Stack
        align={"center"}
        gap={4}
        {...props}
    >
        {icon}
        <Title order={2}>
            {text.title}
        </Title>
        <Text c={"dimmed"}>
            {text.subtitle}
        </Text>
        {postfix ? <>
            <Divider/>
            {postfix}
        </> : null}
        {children ? <>
            <Divider/>
            {children}
        </> : null}
    </Stack>;
};
