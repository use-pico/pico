import { DateTime, Duration, type ToHumanDurationOptions } from "luxon";

export namespace toTimeDiff {
	export interface Props extends ToHumanDurationOptions {
		time: string;
		/**
		 * ISO date time
		 */
		source?: string;
	}
}

export const toTimeDiff = ({
	time,
	source,
	...options
}: toTimeDiff.Props): string => {
	const now = source ? DateTime.fromISO(source) : DateTime.now();
	const target = DateTime.fromISO(time);

	if (!target.isValid) {
		return "0 min";
	}
	if (target <= now) {
		return "0 min";
	}

	const diff = target
		.diff(now, [
			"weeks",
			"days",
			"hours",
			"minutes",
			"seconds",
		])
		.shiftTo("weeks", "days", "hours", "minutes");

	const { weeks = 0, days = 0, hours = 0, minutes = 0 } = diff.toObject();

	const duration = Duration.fromObject({
		weeks: Math.floor(weeks),
		days: Math.floor(days),
		hours: Math.floor(hours),
		minutes: Math.floor(minutes),
	}).normalize();

	return duration.toHuman({
		unitDisplay: "short",
		listStyle: "short",
		maximumFractionDigits: 0,
		showZeros: false,
		...options,
	});
};
