import { describe, expect, it } from "vitest";
import { contract } from "../../../src";

describe("builder/tokens-rule-multiple-variants", () => {
	it("applies token rule when multiple variant conditions match", () => {
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
				"secondary",
			])
			.bool("disabled")
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
					disabled: true,
				},
				{
					primary: {
						class: [
							"primary-disabled-rule",
						],
					},
				},
			)
			.tokens.rule(
				{
					variant: "secondary",
					disabled: false,
				},
				{
					secondary: {
						class: [
							"secondary-enabled-rule",
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
				disabled: false,
			})
			.cls();

		const { slots } = buttonCls.create();

		// Default case - no rules match
		expect(slots.root()).toBe("primary-token secondary-token base");

		// Primary + disabled - first rule matches
		expect(
			buttonCls
				.create({
					variant: {
						variant: "primary",
						disabled: true,
					},
				})
				.slots.root(),
		).toBe("primary-disabled-rule secondary-token base");

		// Secondary + enabled - second rule matches
		expect(
			buttonCls
				.create({
					variant: {
						variant: "secondary",
						disabled: false,
					},
				})
				.slots.root(),
		).toBe("primary-token secondary-enabled-rule base");

		// Primary + enabled - no rule matches
		expect(
			buttonCls
				.create({
					variant: {
						variant: "primary",
						disabled: false,
					},
				})
				.slots.root(),
		).toBe("primary-token secondary-token base");
	});
});
