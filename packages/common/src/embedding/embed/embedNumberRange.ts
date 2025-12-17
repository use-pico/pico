export namespace embedNumberRange {
	export interface Props {
		value: number;
		min: number;
		max: number;
	}
}

/** Linear range embedding for pgvector L2 (1D). */
export const embedNumberRange = ({
	value,
	min,
	max,
}: embedNumberRange.Props): number[] => {
	return [
		Math.min(1, Math.max(0, (value - min) / (max - min))),
	];
};
