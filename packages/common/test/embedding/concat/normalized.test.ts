import { expect, it } from "vitest";
import { concat } from "../../../src/embedding";

it("should return normalized vector", () => {
	const block1 = {
		vector: new Float32Array([
			1,
			2,
		]),
		weight: 1,
	};
	const block2 = {
		vector: new Float32Array([
			3,
			4,
		]),
		weight: 1,
	};
	const result = concat([
		block1,
		block2,
	]);
	const magnitude = Math.sqrt(
		Array.from(result).reduce((sum, v) => sum + v * v, 0),
	);
	expect(magnitude).toBeCloseTo(1, 5);
});
