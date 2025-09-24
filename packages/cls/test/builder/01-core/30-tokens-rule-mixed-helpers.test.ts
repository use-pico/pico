import { describe, expect, it } from "vitest";
import { contract } from "../../../src";

describe("builder/tokens-rule-mixed-helpers", () => {
	it("mixing tokens.rule, tokens.match, and tokens.switch works correctly", () => {
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
					disabled: true,
				},
				{
					primary: {
						class: [
							"primary-complex-rule",
						],
					},
				},
			)
			.tokens.match("variant", "secondary", {
				secondary: {
					class: [
						"secondary-match-rule",
					],
				},
			})
			.tokens.switch(
				"disabled",
				{
					accent: {
						class: [
							"accent-disabled",
						],
					},
				},
				{
					accent: {
						class: [
							"accent-enabled",
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
				disabled: false,
			})
			.cls();

		const { slots } = buttonCls.create();

		// Default case - only switch rule applies (disabled=false)
		expect(slots.root()).toBe(
			"primary-token secondary-token accent-enabled base",
		);

		// Primary + disabled - complex rule and switch rule apply
		expect(
			buttonCls
				.create({
					variant: {
						variant: "primary",
						disabled: true,
					},
				})
				.slots.root(),
		).toBe("primary-complex-rule secondary-token accent-disabled base");

		// Secondary + enabled - match rule and switch rule apply
		expect(
			buttonCls
				.create({
					variant: {
						variant: "secondary",
						disabled: false,
					},
				})
				.slots.root(),
		).toBe("primary-token secondary-match-rule accent-enabled base");

		// Secondary + disabled - match rule and switch rule apply
		expect(
			buttonCls
				.create({
					variant: {
						variant: "secondary",
						disabled: true,
					},
				})
				.slots.root(),
		).toBe("primary-token secondary-match-rule accent-disabled base");
	});
});
