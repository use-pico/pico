import type { embedding } from "./embedding";
import { unit } from "./unit";

export const concat = (blocks: embedding.Block[]): Float32Array => {
	const total = blocks.reduce((s, b) => s + b.vector.length, 0);
	const out = new Float32Array(total);
	let index = 0;
	for (const { vector, weight } of blocks) {
		for (let i = 0; i < vector.length; i++) {
			// biome-ignore lint/style/noNonNullAssertion: We're ok here
			out[index++] = weight * vector[i]!;
		}
	}
	return unit(out);
};
