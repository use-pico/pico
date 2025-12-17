import { expect, it } from "vitest";
import {
	createHasher,
	embedNumber,
	embedNumberRange,
	embedString,
} from "../../../../src/embedding";
import { similarity } from "../../../../src/similarity";

const THRESHOLD = 0.6;

it("should have low similarity for different embedding types", async () => {
	const hasher = await createHasher();
	const numberRange = embedNumberRange({
		value: 3,
		min: 0,
		max: 6,
		dimensions: 7,
		weight: 1,
	});
	const number = embedNumber({
		value: 3,
		hasher,
		order: "asc",
		dimensions: 7,
		weight: 1,
	});
	const string = embedString({
		value: "3",
		hasher,
		dimensions: 7,
		weight: 1,
	});

	const sim1 = similarity(numberRange, number);
	const sim2 = similarity(numberRange, string);
	const sim3 = similarity(number, string);

	// Different embedding types for same conceptual value should be different
	// They may have some similarity but should be noticeably different
	expect(sim1).toBeLessThan(THRESHOLD);
	expect(sim2).toBeLessThan(THRESHOLD);
	expect(sim3).toBeLessThan(THRESHOLD);
});
