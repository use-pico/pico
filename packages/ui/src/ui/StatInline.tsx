import {Translation}   from "@pico/i18n";
import {toHumanNumber} from "@pico/utils";
import {
    type ComponentProps,
    type FC,
    type ReactNode
}                      from "react";
import {Group}         from "./Group";
import {Text}          from "./Text";

export namespace StatInline {
    export interface Props {
        withLabel: string;
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
        withLabel,
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
            <Translation withLabel={withLabel}/>
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
