import { DateTime, type DateTimeFormatOptions } from "luxon";
import { isString } from "../toolbox/isString";
import type { IDateInput } from "../type/IDateInput";
import { fromUtc } from "./fromUtc";
import { isDateTime } from "./isDateTime";

export const iso2locale = (
	date?: IDateInput,
	fallback?: IDateInput,
	opts?: DateTimeFormatOptions,
): string | undefined => {
	const $date = date || fallback;
	if (!$date) {
		return undefined;
	}
	if (isString($date)) {
		return fromUtc($date).toLocaleString(opts);
	} else if (isDateTime($date)) {
		return $date.toLocaleString(opts);
	}
	return DateTime.fromJSDate($date).toLocaleString(opts);
};
