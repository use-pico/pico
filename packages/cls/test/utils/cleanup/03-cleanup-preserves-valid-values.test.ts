import { describe, expect, it } from "vitest";
import { cleanup } from "../../../src/utils/cleanup";

describe("utils/cleanup/cleanup-preserves-valid-values", () => {
	it("preserves valid values", () => {
		const tweak = {
			token: {
				t1: [
					"class1",
					"class2",
				],
				t2: [
					"class3",
				],
			},
			slot: {
				root: {
					class: [
						"base",
						"px-4",
					],
				},
				icon: {
					class: [
						"icon-base",
					],
				},
			},
			variant: {
				size: "md",
				variant: "solid",
			},
		} as any;

		const result = cleanup(tweak);

		expect(result).toEqual(tweak);
	});
});
