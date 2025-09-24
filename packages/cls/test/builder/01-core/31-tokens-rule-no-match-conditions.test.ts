import { describe, expect, it } from "vitest";
import { contract } from "../../../src";

describe("builder/tokens-rule-no-match-conditions", () => {
	it("token rules with no match conditions apply to all variants", () => {
		const buttonCls = contract()
			.tokens([
				"primary",
			])
			.slots([
				"root",
			])
			.variant("variant", [
				"default",
				"primary",
			])
			.def()
			.token({
				primary: {
					class: [
						"primary-token",
					],
				},
			})
			.tokens.rule(
				{}, // No match conditions - applies to all variants
				{
					primary: {
						class: [
							"primary-universal-rule",
						],
					},
				},
			)
			.root({
				root: {
					token: [
						"primary",
					],
					class: [
						"base",
					],
				},
			})
			.defaults({
				variant: "default",
			})
			.cls();

		const { slots } = buttonCls.create();

		// Universal rule applies to all variants (overrides base token)
		expect(slots.root()).toBe("primary-universal-rule base");
		expect(
			buttonCls
				.create({
					variant: {
						variant: "primary",
					},
				})
				.slots.root(),
		).toBe("primary-universal-rule base");
	});
});
