import { DateTime, type DateTimeFormatOptions } from "luxon";
import { fromUtc } from "../i18n/fromUtc";
import { isString } from "../is-string/isString";
import type { DateInput } from "../type/DateInput";

export const iso2locale = (
	date?: DateInput,
	fallback?: DateInput,
	opts?: DateTimeFormatOptions,
): string | undefined => {
	const $date = date || fallback;
	if (!$date) {
		return undefined;
	}
	if (isString($date)) {
		return fromUtc($date).toLocaleString(opts);
	} else if (DateTime.isDateTime($date)) {
		return $date.toLocaleString(opts);
	}
	return DateTime.fromJSDate($date).toLocaleString(opts);
};
