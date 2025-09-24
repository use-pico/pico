import { describe, expect, it } from "vitest";
import { contract } from "../../../src";

describe("builder/tokens-match-helper", () => {
	it("tokens.match helper creates rule for specific variant key/value", () => {
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
			.tokens.match("variant", "primary", {
				primary: {
					class: [
						"primary-match-rule",
					],
				},
			})
			.tokens.match("variant", "secondary", {
				secondary: {
					class: [
						"secondary-match-rule",
					],
				},
			})
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

		// Default variant - no match rules apply
		expect(slots.root()).toBe("primary-token secondary-token base");

		// Primary variant - primary match rule applies
		expect(
			buttonCls
				.create({
					variant: {
						variant: "primary",
					},
				})
				.slots.root(),
		).toBe("primary-match-rule secondary-token base");

		// Secondary variant - secondary match rule applies
		expect(
			buttonCls
				.create({
					variant: {
						variant: "secondary",
					},
				})
				.slots.root(),
		).toBe("primary-token secondary-match-rule base");
	});
});
