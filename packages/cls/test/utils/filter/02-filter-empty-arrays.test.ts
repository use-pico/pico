import { describe, expect, it } from "vitest";
import { filter } from "../../../src/utils/filter";

describe("utils/filter/filter-empty-arrays", () => {
	it("preserves empty arrays as they are not undefined", () => {
		const obj = {
			a: [
				"class1",
				"class2",
			],
			b: [],
			c: [
				"class3",
			],
			d: [],
		};

		const result = filter(obj);

		expect(result).toEqual({
			a: [
				"class1",
				"class2",
			],
			b: [],
			c: [
				"class3",
			],
			d: [],
		});
	});
});
