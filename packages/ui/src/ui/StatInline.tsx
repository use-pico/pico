import {toHumanNumber} from "@use-pico/utils";
import {
    type ComponentProps,
    type FC,
    type ReactNode
}                      from "react";
import {Group}         from "./Group";
import {Text}          from "./Text";

export namespace StatInline {
    export interface Props {
        text: {
            label: ReactNode;
        };
        textProps?: ComponentProps<typeof Text<"p">>;
        labelProps?: ComponentProps<typeof Text<"p">>;
        countProps?: ComponentProps<typeof Text<"p">>;
        count: number;
        empty?: ReactNode;
        withZero?: boolean;
    }
}
export type StatInline = FC<StatInline.Props>;

export const StatInline: StatInline = (
    {
        text,
        textProps,
        labelProps,
        countProps,
        count,
        empty,
        withZero = false
    }
) => {
    if (count === 0 && !withZero) {
        return empty;
    }
    return <Group gap={4}>
        <Text
            c={"dimmed"}
            size={"sm"}
            {...textProps}
            {...labelProps}
        >
            {text.label}
        </Text>
        <Text
            size={"lg"}
            {...textProps}
            {...countProps}
        >
            {toHumanNumber({number: count})}
        </Text>
    </Group>;
};
