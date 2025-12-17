import { expect, it } from "vitest";
import { embedding } from "../../../src/embedding";

it("should combine multiple embedding blocks", () => {
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
