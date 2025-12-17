export namespace embedFiller {
	export interface Props {
		dimensions: number;
	}
}

/** Returns a zero-filled Float32Array of the given length. */
export const embedFiller = ({
	dimensions,
}: embedFiller.Props): Float32Array => {
	return new Float32Array(dimensions);
};
