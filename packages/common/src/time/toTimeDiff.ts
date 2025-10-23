import { DateTime } from "luxon";

export namespace toTimeDiff {
	export interface Props {
		time: string;
		/**
		 * ISO date time
		 */
		source?: string;
	}
}

export const toTimeDiff = ({ time, source }: toTimeDiff.Props): string => {
	const now = source ? DateTime.fromISO(source) : DateTime.now();
	const target = DateTime.fromISO(time);

	if (!target.isValid) {
		console.warn("Invalid target", time);
		return "0 min";
	}

	return target.toRelative({
		base: now,
		style: "long",
	});
};
