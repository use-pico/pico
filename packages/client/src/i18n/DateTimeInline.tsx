"use client";

import {
    cn,
    type IDateInput
}                                   from "@use-pico/common";
import {type DateTimeFormatOptions} from "luxon";
import type {FC}                    from "react";
import {useStore}                   from "../store/useStore";
import {DateTimeStore}              from "./DateTimeStore";

/**
 * Renders Luxon DateTime as inline (span) text.
 *
 * @group ui
 */
export namespace DateTimeInline {
    /**
     * Props for `DateTimeInline` component.
     */
	export interface Props extends cn.WithClass {
        /**
         * Date to render.
         */
		date?: IDateInput;
        /**
         * Fallback date to render if `date` is not provided.
         */
		fallback?: IDateInput;
        /**
         * Options (luxon) for formatting.
         */
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
