import { describe, expect, it } from "vitest";
import { dedupe } from "../../../src/utils/dedupe";

describe("utils/dedupe/dedupe-preserves-order", () => {
	it("preserves order of first occurrence", () => {
		const arr = [
			"c",
			"a",
			"b",
			"a",
			"c",
			"d",
			"b",
		] as const;
		const result = dedupe(arr);
		expect(result).toEqual([
			"c",
			"a",
			"b",
			"d",
		]);
	});
});
