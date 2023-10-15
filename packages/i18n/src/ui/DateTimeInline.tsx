"use client";

import {type DateTimeFormatOptions} from "luxon";
import {type FC}                    from "react";
import {DateTimeStore}              from "../store/DateTimeStore";
import {type IDateInput}            from "../utils/IDateInput";

export namespace DateTimeInline {
    export interface Props {
        date?: IDateInput;
        fallback?: IDateInput;
        options?: DateTimeFormatOptions;
    }
}

export const DateTimeInline: FC<DateTimeInline.Props> = (
    {
        date,
        fallback,
        options
    }) => {
    const {toLocalDateTime} = DateTimeStore.use(({toLocalDateTime}) => ({toLocalDateTime}));
    return <>
        {toLocalDateTime(date, fallback, options)}
    </>;
};
