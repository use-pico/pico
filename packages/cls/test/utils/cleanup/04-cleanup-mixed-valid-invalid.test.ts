import { describe, expect, it } from "vitest";
import { cleanup } from "../../../src/utils/cleanup";

describe("utils/cleanup/cleanup-mixed-valid-invalid", () => {
	it("handles mixed valid and invalid values", () => {
		const tweak = {
			token: {
				t1: {
					class: [
						"class1",
					],
				},
				t2: undefined,
				t3: {
					class: [],
				},
				t4: {
					class: [
						"class4",
					],
				},
			},
			slot: {
				root: {
					class: [
						"base",
					],
				},
				icon: undefined,
				content: {
					class: [],
				},
				footer: {
					class: [
						"footer-base",
					],
				},
			},
			variant: {
				size: "md",
				variant: undefined,
				theme: "light",
				disabled: "false",
			},
		};

		const result = cleanup(tweak);

		expect(result).toEqual({
			token: {
				t1: [
					"class1",
				],
				t3: [],
				t4: [
					"class4",
				],
			},
			slot: {
				root: {
					class: [
						"base",
					],
				},
				content: {
					class: [],
				},
				footer: {
					class: [
						"footer-base",
					],
				},
			},
			variant: {
				size: "md",
				theme: "light",
				disabled: "false",
			},
		});
	});
});
