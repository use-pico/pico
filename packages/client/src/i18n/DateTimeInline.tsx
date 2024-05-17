"use client";

import {
    cn,
    type IDateInput
}                                   from "@use-pico2/common";
import {type DateTimeFormatOptions} from "luxon";
import type {FC}                    from "react";
import {useStore}                   from "../store/useStore";
import {DateTimeStore}              from "./DateTimeStore";

export namespace DateTimeInline {
    export interface Props extends cn.WithClass {
        date?: IDateInput;
        fallback?: IDateInput;
        options?: DateTimeFormatOptions;
    }
}

export const DateTimeInline: FC<DateTimeInline.Props> = (
    {
        date,
        fallback,
        options,
        ...props
    }) => {
    const {toLocalDateTime} = useStore(DateTimeStore, ({toLocalDateTime}) => ({toLocalDateTime}));
    return <span {...props}>
        {toLocalDateTime(date, fallback, options)}
    </span>;
};
