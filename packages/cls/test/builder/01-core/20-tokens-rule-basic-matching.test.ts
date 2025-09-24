import { describe, expect, it } from "vitest";
import { contract } from "../../../src";

describe("builder/tokens-rule-basic-matching", () => {
	it("applies token rule when variant matches", () => {
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
							"primary-rule-override",
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

		// Default variant - no rule match, uses base token
		expect(slots.root()).toBe("primary-token base");

		// Primary variant - rule matches, overrides token
		expect(
			buttonCls
				.create({
					variant: {
						variant: "primary",
					},
				})
				.slots.root(),
		).toBe("primary-rule-override base");

		// Secondary variant - no rule match, uses base token
		expect(
			buttonCls
				.create({
					variant: {
						variant: "secondary",
					},
				})
				.slots.root(),
		).toBe("primary-token base");
	});
});
