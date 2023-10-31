"use client";

import {useStore}                   from "@use-pico/store";
import {type DateTimeFormatOptions} from "luxon";
import {
    type FC,
    type HTMLProps
}                                   from "react";
import {DateTimeStore}              from "../store/DateTimeStore";
import {type IDateInput}            from "../utils/IDateInput";

export namespace DateInline {
    export interface Props extends Omit<HTMLProps<HTMLSpanElement>, "children"> {
        date?: IDateInput;
        fallback?: IDateInput;
        options?: DateTimeFormatOptions;
    }
}

export const DateInline: FC<DateInline.Props> = (
    {
        date,
        fallback,
        options,
        ...props
    }) => {
    const {toLocalDate} = useStore(DateTimeStore, ({toLocalDate}) => ({toLocalDate}));
    return <span {...props}>
        {toLocalDate(date, fallback, options)}
    </span>;
};
