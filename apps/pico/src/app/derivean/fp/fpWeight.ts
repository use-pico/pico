export namespace fpWeight {
	export interface Props {
		weight: number;
	}
}

/**
 * Return a function that multiplies a value by a weight
 */
export const fpWeight = ({ weight }: fpWeight.Props) => {
	return (value: number) => {
		return value * weight;
	};
};
