import { describe, expect, it } from "vitest";
import { contract } from "../../../src";

describe("builder/tokens-match-with-override", () => {
	it("tokens.match with override flag clears previous rules", () => {
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
			.tokens.match("variant", "primary", {
				primary: {
					class: [
						"primary-match-1",
					],
				},
			})
			.tokens.match(
				"variant",
				"primary",
				{
					primary: {
						class: [
							"primary-match-2",
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

		// Default variant - no match rules apply
		expect(slots.root()).toBe("primary-token base");

		// Primary variant - only the override match rule applies
		expect(
			buttonCls
				.create({
					variant: {
						variant: "primary",
					},
				})
				.slots.root(),
		).toBe("primary-match-2 base");
	});
});
