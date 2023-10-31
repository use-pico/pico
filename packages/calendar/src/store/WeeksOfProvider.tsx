import {type DateTime} from "@use-pico/i18n";
import {StoreProvider} from "@use-pico/store";
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
    return <StoreProvider
        store={WeeksOfStore}
        values={{
            weeks: weeksOf({
                date,
                selected,
            }),
        }}
        {...props}
    />;
};
