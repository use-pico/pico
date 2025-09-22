import { describe, expect, it } from "vitest";
import { dedupeConcat } from "../../../src/utils/dedupe";

describe("utils/dedupe/dedupe-concat-basic", () => {
	it("concatenates and deduplicates two arrays", () => {
		const a = [
			"a",
			"b",
			"c",
		] as const;
		const b = [
			"b",
			"c",
			"d",
		] as const;
		const result = dedupeConcat(a, b);
		expect(result).toEqual([
			"a",
			"b",
			"c",
			"d",
		]);
	});
});
