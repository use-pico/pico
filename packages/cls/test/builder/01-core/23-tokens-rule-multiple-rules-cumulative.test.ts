import { describe, expect, it } from "vitest";
import { contract } from "../../../src";

describe("builder/tokens-rule-multiple-rules-cumulative", () => {
	it("multiple token rules accumulate when no override flag", () => {
		const buttonCls = contract()
			.tokens([
				"primary",
				"secondary",
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
				secondary: {
					class: [
						"secondary-token",
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
					secondary: {
						class: [
							"secondary-rule-1",
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
			.root({
				root: {
					token: [
						"primary",
						"secondary",
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
		expect(slots.root()).toBe("primary-token secondary-token base");

		// Primary variant - all rules accumulate
		expect(
			buttonCls
				.create({
					variant: {
						variant: "primary",
					},
				})
				.slots.root(),
		).toBe("primary-rule-1 primary-rule-2 secondary-rule-1 base");
	});
});
