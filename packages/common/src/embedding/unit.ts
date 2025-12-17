export const unit = (
	vector: Float32Array<ArrayBuffer>,
): Float32Array<ArrayBuffer> => {
	let normal = 0;
	for (let i = 0; i < vector.length; i++) {
		// biome-ignore lint/style/noNonNullAssertion: We're ok here
		normal += vector[i]! * vector[i]!;
	}
	normal = Math.sqrt(normal) || 1;
	for (let i = 0; i < vector.length; i++) {
		// biome-ignore lint/style/noNonNullAssertion: We're ok here
		vector[i]! /= normal;
	}
	return vector;
};
