import { type IDateInput, iso2locale } from "@use-pico/common";
import { DateTime, type DateTimeFormatOptions } from "luxon";
import type { FC, Ref } from "react";

export namespace DateInline {
	export interface Props {
		ref?: Ref<HTMLSpanElement>;
		date?: IDateInput;
		fallback?: IDateInput;
		options?: DateTimeFormatOptions;
	}
}

export const DateInline: FC<DateInline.Props> = ({
	ref,
	date,
	fallback,
	options = DateTime.DATE_MED,
	...props
}) => {
	return (
		<span
			ref={ref}
			{...props}
		>
			{iso2locale(date, fallback, options)}
		</span>
	);
};
