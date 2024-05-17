"use client";

import {
    cn,
    type IDateInput
}                                   from "@use-pico2/common";
import {type DateTimeFormatOptions} from "luxon";
import type {FC}                    from "react";
import {useStore}                   from "../store/useStore";
import {DateTimeStore}              from "./DateTimeStore";

export namespace DateInline {
    export interface Props extends cn.WithClass {
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
