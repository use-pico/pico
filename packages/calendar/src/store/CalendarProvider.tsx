"use client";

import {type DateTime}    from "@use-pico/i18n";
import {
    type FC,
    type PropsWithChildren
}                         from "react";
import {MonthsOfProvider} from "./MonthsOfProvider";
import {WeeksOfProvider}  from "./WeeksOfProvider";
import {YearsOfProvider}  from "./YearsOfProvider";

export namespace CalendarProvider {
    export type Props = PropsWithChildren<{
        date?: DateTime;
        selected?: DateTime;
    }>;
}

export const CalendarProvider: FC<CalendarProvider.Props> = (
    {
        date,
        selected,
        children,
    }) => {
    return <YearsOfProvider
        date={date}
        selected={selected}
    >
        <MonthsOfProvider
            date={date}
            selected={selected}
        >
            <WeeksOfProvider
                date={date}
                selected={selected}
            >
                {children}
            </WeeksOfProvider>
        </MonthsOfProvider>
    </YearsOfProvider>;
};
