import { expect, it } from "vitest";
import { concat } from "../../../src/embedding";

it("should concatenate multiple blocks", () => {
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
	expect(result.length).toBe(4);
});
