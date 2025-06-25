import { DateTime } from "luxon";

export const fromUtc = (input: string) => {
	return DateTime.fromISO(input, {
		zone: "utc",
	});
};
