import { describe, expect, it } from "vitest";
import { cls, tweak } from "../../../src";

describe("cls/complex/two-variants-three-rules", () => {
	it("applies classes from rules that match first variant, second variant, and both", () => {
		const $cls = cls(
			{
				tokens: [],
				slot: [
					"root",
				],
				variant: {
					size: [
						"sm",
						"md",
					],
					tone: [
						"light",
						"dark",
					],
				},
			},
			{
				token: {},
				rules: [
					// Matches first variant only
					{
						match: {
							size: "md",
						},
						slot: {
							root: {
								class: [
									"size-md",
								],
							},
						},
					},
					// Matches second variant only
					{
						match: {
							tone: "dark",
						},
						slot: {
							root: {
								class: [
									"tone-dark",
								],
							},
						},
					},
					// Matches both variants together
					{
						match: {
							size: "md",
							tone: "dark",
						},
						slot: {
							root: {
								class: [
									"both",
								],
							},
						},
					},
				],
				defaults: {
					size: "sm",
					tone: "light",
				},
			},
		);

		const { slots } = $cls.create();
		// When nothing is set, defaults (sm, light) match none of the rules
		expect(slots.root()).toBe("");
		// When both variants match, all three rules that apply should append in order
		expect(
			slots.root({
				variant: {
					size: "md",
					tone: "dark",
				},
			}),
		).toBe("size-md tone-dark both");
	});
});
