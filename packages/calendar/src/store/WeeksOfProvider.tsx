import {type DateTime} from "@pico/i18n";
import {
    type FC,
    type PropsWithChildren
}                      from "react";
import {weeksOf}       from "../calendar/weeksOf";
import {WeeksOfStore}  from "./WeeksOfStore";

export namespace WeeksOfProvider {
    export type  Props = PropsWithChildren<{
        date?: DateTime;
        selected?: DateTime;
    }>
}

export const WeeksOfProvider: FC<WeeksOfProvider.Props> = (
    {
        date,
        selected,
        ...props
    }) => {
    return <WeeksOfStore.Provider
        state={{
            weeks: weeksOf({
                date,
                selected,
            }),
        }}
        {...props}
    />;
};
