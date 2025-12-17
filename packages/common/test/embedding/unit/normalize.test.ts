/** biome-ignore-all lint/style/noNonNullAssertion: Sssht */
import { expect, it } from "vitest";
import { unit } from "../../../src/embedding";

it("should normalize a vector to unit length", () => {
	const vector = new Float32Array([
		3,
		4,
	]);
	const normalized = unit(vector);
	const magnitude = Math.sqrt(
		normalized[0]! * normalized[0]! + normalized[1]! * normalized[1]!,
	);
	expect(magnitude).toBeCloseTo(1, 5);
});
