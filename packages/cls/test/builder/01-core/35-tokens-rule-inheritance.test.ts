import { describe, expect, it } from "vitest";
import { contract } from "../../../src";

describe("builder/tokens-rule-inheritance", () => {
	it("token rules work with contract inheritance", () => {
		// Base contract with token rules
		const BaseButtonCls = contract()
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
							"primary-base-rule",
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

		// Child contract extending base with additional token rules
		const ExtendedButtonCls = contract(BaseButtonCls.contract)
			.tokens([
				"accent",
			])
			.bool("disabled")
			.def()
			.token({
				accent: {
					class: [
						"accent-token",
					],
				},
			})
			.tokens.rule(
				{
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
					variant: "primary",
					disabled: true,
				},
				{
					accent: {
						class: [
							"accent-primary-disabled-rule",
						],
					},
				},
			)
			.root({
				root: {
					token: [
						"accent",
					],
				},
			})
			.defaults({
				variant: "default",
				disabled: false,
			})
			.cls();

		const { slots } = ExtendedButtonCls.create();

		// Default case - base rules apply
		expect(slots.root()).toBe(
			"primary-token secondary-token base accent-token",
		);

		// Primary variant - base rule applies
		expect(
			ExtendedButtonCls.create({
				variant: {
					variant: "primary",
				},
			}).slots.root(),
		).toBe("primary-base-rule secondary-token base accent-token");

		// Disabled - child rule applies
		expect(
			ExtendedButtonCls.create({
				variant: {
					disabled: true,
				},
			}).slots.root(),
		).toBe("primary-token secondary-disabled-rule base accent-token");

		// Primary + disabled - both base and child rules apply
		expect(
			ExtendedButtonCls.create({
				variant: {
					variant: "primary",
					disabled: true,
				},
			}).slots.root(),
		).toBe(
			"primary-base-rule secondary-disabled-rule base accent-primary-disabled-rule",
		);
	});
});
