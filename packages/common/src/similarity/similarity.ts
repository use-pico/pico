/**
 * Calculate cosine similarity (dot product) between two normalized vectors.
 * Since vectors are normalized to unit length, the dot product equals cosine similarity.
 */
export const similarity = (a: Float32Array, b: Float32Array): number => {
	let dot = 0;
	for (let i = 0; i < Math.min(a.length, b.length); i++) {
		// biome-ignore lint/style/noNonNullAssertion: We're ok here
		dot += a[i]! * b[i]!;
	}
	return dot;
};
