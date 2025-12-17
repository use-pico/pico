import { expect, it } from "vitest";
import { unit } from "../../../src/embedding";

it("should preserve direction", () => {
	const vector = new Float32Array([
		1,
		2,
		3,
	]);
	const normalized = unit(vector);
	expect(normalized[0]).toBeGreaterThan(0);
	expect(normalized[1]).toBeGreaterThan(0);
	expect(normalized[2]).toBeGreaterThan(0);
});
