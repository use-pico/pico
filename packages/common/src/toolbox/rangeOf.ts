export namespace rangeOf {
	export interface Props {
		value: number;
		input: {
			min: number;
			max: number;
		};
		output: {
			min: number;
			max: number;
		};
	}
}

/**
 * Convert the given value into the range of min/max.
 */
export const rangeOf = ({ value, input, output }: rangeOf.Props) => {
	return (
		((value - input.min) / (input.max - input.min)) *
			(output.max - output.min) +
		output.min
	);
};
