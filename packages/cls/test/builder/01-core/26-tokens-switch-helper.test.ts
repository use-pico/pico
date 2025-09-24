import { describe, expect, it } from "vitest";
import { contract } from "../../../src";

describe("builder/tokens-switch-helper", () => {
	it("tokens.switch creates two rules for boolean variants", () => {
		const buttonCls = contract()
			.tokens([
				"primary",
				"secondary",
			])
			.slots([
				"root",
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
			.tokens.switch(
				"disabled",
				{
					primary: {
						class: [
							"primary-disabled",
						],
					},
				},
				{
					secondary: {
						class: [
							"secondary-enabled",
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
				disabled: false,
			})
			.cls();

		const { slots } = buttonCls.create();

		// Default case - disabled=false, secondary rule applies
		expect(slots.root()).toBe("primary-token secondary-enabled base");

		// Disabled=true - primary rule applies
		expect(
			buttonCls
				.create({
					variant: {
						disabled: true,
					},
				})
				.slots.root(),
		).toBe("primary-disabled secondary-token base");

		// Disabled=false - secondary rule applies
		expect(
			buttonCls
				.create({
					variant: {
						disabled: false,
					},
				})
				.slots.root(),
		).toBe("primary-token secondary-enabled base");
	});
});
