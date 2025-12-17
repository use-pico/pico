import { expect, it } from "vitest";
import {
	createHasher,
	embedding,
	embedNumber,
	embedString,
} from "../../../../src/embedding";
import { similarity } from "../../../../src/similarity";

const THRESHOLD = 0.8;

it("should have high similarity for string and slightly different number", async () => {
	const hasher = await createHasher();
	const string = embedString({
		value: "100",
		hasher,
		dimensions: 10,
		weight: 1,
	});
	const number1 = embedNumber({
		value: 100,
		hasher,
		order: "asc",
		dimensions: 10,
		weight: 1,
	});
	const number2 = embedNumber({
		value: 101,
		hasher,
		order: "asc",
		dimensions: 10,
		weight: 1,
	});
	const number3 = embedNumber({
		value: 99,
		hasher,
		order: "asc",
		dimensions: 10,
		weight: 1,
	});

	const combined1 = embedding({
		blocks: [
			{
				vector: string,
				weight: 1,
			},
			{
				vector: number1,
				weight: 1,
			},
		],
	});
	const combined2 = embedding({
		blocks: [
			{
				vector: string,
				weight: 1,
			},
			{
				vector: number2,
				weight: 1,
			},
		],
	});
	const combined3 = embedding({
		blocks: [
			{
				vector: string,
				weight: 1,
			},
			{
				vector: number3,
				weight: 1,
			},
		],
	});

	const sim12 = similarity(combined1, combined2);
	const sim13 = similarity(combined1, combined3);
	const sim23 = similarity(combined2, combined3);

	// Combined embeddings with same string and slightly different numbers should have high similarity
	expect(sim12).toBeGreaterThan(THRESHOLD);
	expect(sim12).toBeLessThan(1);
	expect(sim13).toBeGreaterThan(THRESHOLD);
	expect(sim13).toBeLessThan(1);
	expect(sim23).toBeGreaterThan(THRESHOLD);
	expect(sim23).toBeLessThan(1);
});
