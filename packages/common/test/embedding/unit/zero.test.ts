import { expect, it } from "vitest";
import { unit } from "../../../src/embedding";

it("should handle zero vector", () => {
	const vector = new Float32Array([
		0,
		0,
		0,
	]);
	const normalized = unit(vector);
	expect(normalized[0]).toBe(0);
	expect(normalized[1]).toBe(0);
	expect(normalized[2]).toBe(0);
});
