import { describe, expect, it } from "vitest";
import { cleanup } from "../../../src/utils/cleanup";

describe("utils/cleanup/cleanup-undefined-values", () => {
	it("cleans up tweak with undefined values", () => {
		const tweak = {
			token: {
				t1: {
					class: [
						"class1",
						"class2",
					],
				},
				t2: undefined,
			},
			slot: {
				root: {
					class: [
						"base",
						"px-4",
					],
				},
				icon: undefined,
			},
			variant: {
				size: "md",
				variant: undefined,
			},
		};

		const result = cleanup(tweak);

		expect(result).toEqual({
			token: {
				t1: {
					class: [
						"class1",
						"class2",
					],
				},
			},
			slot: {
				root: {
					class: [
						"base",
						"px-4",
					],
				},
			},
			variant: {
				size: "md",
			},
		});
	});
});
