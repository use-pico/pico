import { describe, expect, it } from "vitest";
import { filter } from "../../../src/utils/filter";

describe("utils/filter/filter-undefined-values", () => {
	it("filters out undefined values from object", () => {
		const obj = {
			a: [
				"class1",
				"class2",
			],
			b: undefined,
			c: [
				"class3",
			],
			d: undefined,
		};

		const result = filter(obj);

		expect(result).toEqual({
			a: [
				"class1",
				"class2",
			],
			c: [
				"class3",
			],
		});
	});
});
