import { iso2locale } from "@use-pico/common/iso2locale";
import type { DateInput } from "@use-pico/common/type";
import { DateTime, type DateTimeFormatOptions } from "luxon";
import type { FC } from "react";
import { Typo } from "../typo";

export namespace DateInline {
	export interface Props extends Omit<Typo.Props, "label"> {
		date?: DateInput;
		fallback?: DateInput;
		options?: DateTimeFormatOptions;
	}
}

export const DateInline: FC<DateInline.Props> = ({
	date,
	fallback,
	options = DateTime.DATE_MED,
	...props
}) => {
	return (
		<Typo
			label={iso2locale(date, fallback, options)}
			{...props}
		/>
	);
};
