export namespace fpClamp {
	export interface Props {
		min: number;
		max: number;
	}
}

/**
 * Return a function that clamps a value between min and max
 */
export const fpClamp = ({ min, max }: fpClamp.Props) => {
	return (value: number) => {
		return Math.min(max, Math.max(min, value));
	};
};
