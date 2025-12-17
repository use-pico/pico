import { expect, it } from "vitest";
import {
	createHasher,
	embedding,
	embedNumber,
	embedNumberRange,
	embedString,
} from "../../../src/embedding";

it("should combine different embedding types", async () => {
	const hasher = await createHasher();
	const numberRange = embedNumberRange({
		value: 3,
		min: 0,
		max: 6,
		dimensions: 7,
		weight: 1,
	});
	const number = embedNumber({
		value: 42,
		hasher,
		order: "asc",
		dimensions: 10,
		weight: 1,
	});
	const string = embedString({
		value: "test",
		hasher,
		dimensions: 5,
		weight: 1,
	});

	const combined = embedding({
		blocks: [
			{
				vector: numberRange,
				weight: 1,
			},
			{
				vector: number,
				weight: 1,
			},
			{
				vector: string,
				weight: 1,
			},
		],
	});

	expect(combined.length).toBe(22); // 7 + 10 + 5
	const magnitude = Math.sqrt(
		Array.from(combined).reduce((sum, v) => sum + v * v, 0),
	);
	expect(magnitude).toBeCloseTo(1, 5);
});
