import { describe, expect, it } from "vitest";
import { cls, tweak } from "../../../src";

describe("cls/complex/per-slot-local-override-ignores-append", () => {
	it("local override on icon ignores provided local append for icon", () => {
		const $cls = cls(
			{
				tokens: [],
				slot: [
					"root",
					"icon",
				],
				variant: {},
			},
			{
				token: {},
				rules: [
					{
						slot: {
							root: {
								class: [
									"r-base",
								],
							},
							icon: {
								class: [
									"i-base",
								],
							},
						},
					},
				],
				defaults: {},
			},
		);

		const { slots } = $cls.create();
		expect(
			slots.icon({
				override: {
					icon: {
						class: [
							"OVR",
						],
					},
				},
				slot: {
					icon: {
						class: [
							"APPEND",
						],
					},
				},
			}),
		).toBe("OVR");
		expect(
			slots.root({
				slot: {
					root: {
						class: [
							"R",
						],
					},
				},
			}),
		).toBe("r-base R");
	});
});
