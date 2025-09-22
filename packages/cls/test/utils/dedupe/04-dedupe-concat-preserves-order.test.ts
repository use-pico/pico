import { describe, expect, it } from "vitest";
import { dedupeConcat } from "../../../src/utils/dedupe";

describe("utils/dedupe/dedupe-concat-preserves-order", () => {
	it("preserves order from first array then second", () => {
		const a = [
			"c",
			"a",
			"b",
		] as const;
		const b = [
			"a",
			"d",
			"c",
		] as const;
		const result = dedupeConcat(a, b);
		expect(result).toEqual([
			"c",
			"a",
			"b",
			"d",
		]);
	});
});
