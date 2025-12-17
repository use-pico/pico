import { expect, it } from "vitest";
import { embedding } from "../../../src/embedding";

it("should work with different weights", () => {
	const block1 = {
		vector: new Float32Array([
			1,
			0,
		]),
		weight: 1,
	};
	const block2 = {
		vector: new Float32Array([
			0,
			1,
		]),
		weight: 2,
	};
	const result = embedding({
		blocks: [
			block1,
			block2,
		],
	});
	expect(result.length).toBe(4);
	const magnitude = Math.sqrt(
		Array.from(result).reduce((sum, v) => sum + v * v, 0),
	);
	expect(magnitude).toBeCloseTo(1, 5);
});
