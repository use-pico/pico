import { iso2locale, type IDateInput } from "@use-pico/common";
import { DateTime, type DateTimeFormatOptions } from "luxon";
import type { FC } from "react";

export namespace DateInline {
	export interface Props {
		date?: IDateInput;
		fallback?: IDateInput;
		options?: DateTimeFormatOptions;
	}
}

export const DateInline: FC<DateInline.Props> = ({
	date,
	fallback,
	options = DateTime.DATE_MED,
	...props
}) => {
	return <span {...props}>{iso2locale(date, fallback, options)}</span>;
};
