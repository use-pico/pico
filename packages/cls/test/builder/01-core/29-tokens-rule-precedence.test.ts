import { describe, expect, it } from "vitest";
import { contract } from "../../../src";

describe("builder/tokens-rule-precedence", () => {
	it("token rules with override flag take precedence over non-override rules", () => {
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
				{
					variant: "primary",
				},
				{
					primary: {
						class: [
							"primary-rule-1",
						],
					},
				},
			)
			.tokens.rule(
				{
					variant: "primary",
				},
				{
					primary: {
						class: [
							"primary-rule-2",
						],
					},
				},
			)
			.tokens.rule(
				{
					variant: "primary",
				},
				{
					primary: {
						class: [
							"primary-rule-override",
						],
					},
				},
				true, // override flag
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

		// Default variant - no rules match
		expect(slots.root()).toBe("primary-token base");

		// Primary variant - only the override rule applies, previous rules are cleared
		expect(
			buttonCls
				.create({
					variant: {
						variant: "primary",
					},
				})
				.slots.root(),
		).toBe("primary-rule-override base");
	});
});
