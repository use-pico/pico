import { concat } from "./concat";
export namespace embedding {
	export interface Block {
		vector: Float32Array;
		weight: number;
	}

	export interface Props {
		blocks: Block[];
	}
}

export const embedding = ({
	blocks,
}: embedding.Props): Float32Array<ArrayBuffer> => {
	return new Float32Array(concat(blocks));
};
