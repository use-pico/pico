import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/core/what-level-override-without-flag-appends", () => {
	it("What-level without override flag appends normally", () => {
		const $cls = cls(
			{
				tokens: [],
				slot: [
					"root",
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
									"base",
								],
							},
						},
					},
				],
				defaults: {},
			},
		);

		const { slots } = $cls.create();

		// Test What-level without override flag (should append)
		expect(
			slots.root({
				slot: {
					root: {
						class: [
							"append-class",
						],
						override: false,
					},
				},
			}),
		).toBe("base append-class");
	});
});
