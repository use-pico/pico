import {tx}       from "@use-pico/i18n";
import {isString} from "@use-pico/utils";
import {
    type FC,
    type PropsWithChildren,
    type ReactNode
}                 from "react";
import {Card}     from "./Card";
import {Group}    from "./Group";
import {Text}     from "./Text";

export namespace ValueInline {
    export type Props = PropsWithChildren<{
        /**
         * Label of a value (goes through translations).
         */
        label: ReactNode;
        /**
         * Whatever value
         */
        value?: ReactNode;
        withAction?: ReactNode;
    }>
}

/**
 * This component is a general way how to render a key -> value of something (eg. an Entity).
 */
export const ValueInline: FC<ValueInline.Props> = (
    {
        label,
        value,
        withAction,
        children,
    }) => {
    return <Card
        padding={"md"}
    >
        <Card.Section
            withBorder
            inheritPadding
            py={"xs"}
        >
            <Group
                justify={"apart"}
            >
                <Text fw={500} c={"dimmed"}>
                    {label}
                </Text>
                {withAction}
            </Group>
        </Card.Section>
        <Card.Section
            inheritPadding
            py={"xs"}
        >
            {isString(value) ? <Text fw={500}>{value}</Text> : (value || tx()`Value not set`)}
        </Card.Section>
        {children && <Card.Section
            inheritPadding
            withBorder
            py={"xs"}
        >
            {children}
        </Card.Section>}
    </Card>;
};
