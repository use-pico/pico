import { describe, expect, it } from "vitest";
import { contract } from "../../../src";

describe("builder/tokens-rule-complex-matching", () => {
	it("complex token rules with multiple variant combinations", () => {
		const buttonCls = contract()
			.tokens([
				"primary",
				"secondary",
				"accent",
			])
			.slots([
				"root",
			])
			.variant("variant", [
				"default",
				"primary",
				"secondary",
			])
			.variant("size", [
				"sm",
				"md",
				"lg",
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
				accent: {
					class: [
						"accent-token",
					],
				},
			})
			.tokens.rule(
				{
					variant: "primary",
					size: "lg",
				},
				{
					primary: {
						class: [
							"primary-lg-rule",
						],
					},
				},
			)
			.tokens.rule(
				{
					variant: "secondary",
					disabled: true,
				},
				{
					secondary: {
						class: [
							"secondary-disabled-rule",
						],
					},
				},
			)
			.tokens.rule(
				{
					size: "sm",
					disabled: false,
				},
				{
					accent: {
						class: [
							"accent-sm-enabled-rule",
						],
					},
				},
			)
			.root({
				root: {
					token: [
						"primary",
						"secondary",
						"accent",
					],
					class: [
						"base",
					],
				},
			})
			.defaults({
				variant: "default",
				size: "md",
				disabled: false,
			})
			.cls();

		const { slots } = buttonCls.create();

		// Default case - no complex rules match
		expect(slots.root()).toBe(
			"primary-token secondary-token accent-token base",
		);

		// Primary + lg - first rule matches
		expect(
			buttonCls
				.create({
					variant: {
						variant: "primary",
						size: "lg",
					},
				})
				.slots.root(),
		).toBe("primary-lg-rule secondary-token accent-token base");

		// Secondary + disabled - second rule matches
		expect(
			buttonCls
				.create({
					variant: {
						variant: "secondary",
						disabled: true,
					},
				})
				.slots.root(),
		).toBe("primary-token secondary-disabled-rule accent-token base");

		// Small + enabled - third rule matches
		expect(
			buttonCls
				.create({
					variant: {
						size: "sm",
						disabled: false,
					},
				})
				.slots.root(),
		).toBe("primary-token secondary-token accent-sm-enabled-rule base");

		// Primary + lg + disabled - first rule matches (disabled doesn't affect primary rule)
		expect(
			buttonCls
				.create({
					variant: {
						variant: "primary",
						size: "lg",
						disabled: true,
					},
				})
				.slots.root(),
		).toBe("primary-lg-rule secondary-token accent-token base");
	});
});
