import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("cls/default-variant-rule-applies", () => {
	it("applies rule based on defaults when no variant provided", () => {
		const buttonCls = cls(
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
				},
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
					{
						match: {
							size: "sm",
						},
						slot: {
							root: {
								class: [
									"sm",
								],
							},
						},
					},
				],
				defaults: {
					size: "sm",
				},
			},
		);

		const { slots } = buttonCls.create();
		expect(slots.root()).toBe("base sm");
	});
});
