import { describe, expect, it } from "vitest";
import { contract } from "../../../src";

describe("builder/tokens-rule-undefined-token-values", () => {
	it("token rules with undefined token values are ignored", () => {
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
					primary: undefined, // Undefined token value
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

		// Undefined token values are ignored
		expect(slots.root()).toBe("primary-token base");
		expect(
			buttonCls
				.create({
					variant: {
						variant: "primary",
					},
				})
				.slots.root(),
		).toBe("primary-token base");
	});
});
