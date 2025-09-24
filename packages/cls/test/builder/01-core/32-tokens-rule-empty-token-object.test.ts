import { describe, expect, it } from "vitest";
import { contract } from "../../../src";

describe("builder/tokens-rule-empty-token-object", () => {
	it("token rules with empty token object have no effect", () => {
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
				{}, // Empty token object
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

		// Empty token rule has no effect
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
