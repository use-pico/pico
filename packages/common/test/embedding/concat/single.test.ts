import { expect, it } from "vitest";
import { concat } from "../../../src/embedding";

it("should handle single block", () => {
	const block = {
		vector: new Float32Array([
			1,
			2,
			3,
		]),
		weight: 1,
	};
	const result = concat([
		block,
	]);
	expect(result.length).toBe(3);
	const magnitude = Math.sqrt(
		Array.from(result).reduce((sum, v) => sum + v * v, 0),
	);
	expect(magnitude).toBeCloseTo(1, 5);
});
