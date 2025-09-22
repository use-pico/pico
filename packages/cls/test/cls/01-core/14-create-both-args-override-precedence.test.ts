import { describe, expect, it } from "vitest";
import { cls, tweak } from "../../../src";

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
			tweak([
				{
					override: {
						root: {
							class: [
								"USER",
							],
						},
					},
				},
				{
					override: {
						root: {
							class: [
								"CONF",
							],
						},
					},
				},
			]),
		);

		// With both: user wins -> only USER remains (override clears previous and replaces)
		expect(slots.root()).toBe("USER");
	});
});
