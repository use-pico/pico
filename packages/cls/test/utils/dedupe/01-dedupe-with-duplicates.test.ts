import { describe, expect, it } from "vitest";
import { dedupe } from "../../../src/utils/dedupe";

describe("utils/dedupe/dedupe-with-duplicates", () => {
	it("deduplicates array with duplicates", () => {
		const arr = [
			"a",
			"b",
			"a",
			"c",
			"b",
			"d",
		] as const;
		const result = dedupe(arr);
		expect(result).toEqual([
			"a",
			"b",
			"c",
			"d",
		]);
	});
});
