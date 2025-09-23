import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/create-both-args-override-precedence", () => {
	it("uses user override last (wins) over config override and clears previous classes", () => {
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

		// Provide both overrides: config + user. User MUST win and replace all previous classes
		const { slots } = $cls.create(
			{
				slot: {
					root: {
						class: [
							"CONF",
						],
						override: true,
					},
				},
			},
			{
				slot: {
					root: {
						class: [
							"USER",
						],
						override: true,
					},
				},
			},
		);

		// With both: user wins -> USER replaces all previous classes
		expect(slots.root()).toBe("USER");
	});
});
