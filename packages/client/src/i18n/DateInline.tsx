import { Css, cssOf, type IDateInput } from "@use-pico/common";
import { type DateTimeFormatOptions } from "luxon";
import type { FC } from "react";
import { useStore } from "../store/useStore";
import { DateTimeStore } from "./DateTimeStore";

export namespace DateInline {
	export interface Props extends Css.Style {
		date?: IDateInput;
		fallback?: IDateInput;
		options?: DateTimeFormatOptions;
	}
}

export const DateInline: FC<DateInline.Props> = ({
	date,
	fallback,
	options,
	css,
	...props
}) => {
	const { toLocalDate } = useStore(DateTimeStore, ({ toLocalDate }) => ({
		toLocalDate,
	}));
	return (
		<span
			className={cssOf(css)}
			{...props}
		>
			{toLocalDate(date, fallback, options)}
		</span>
	);
};
