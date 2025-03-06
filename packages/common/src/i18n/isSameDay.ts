import { DateTime } from "luxon";

export namespace isSameDay {
	export interface Props {
		/**
		 * ISO date string.
		 */
		date1?: string | null;
		/**
		 * ISO date string.
		 */
		date2?: string | null;
	}
}

export const isSameDay = ({ date1, date2 }: isSameDay.Props): boolean => {
	if (!date1 && !date2) {
		return false;
	} else if (!date1 || !date2) {
		return true;
	}

	return DateTime.fromISO(date1).hasSame(DateTime.fromISO(date2), "day");
};
