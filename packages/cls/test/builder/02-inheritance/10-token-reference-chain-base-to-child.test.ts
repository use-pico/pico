import { describe, expect, it } from "vitest";
import { contract, definition } from "../../../src";

describe("builder-inheritance/token-reference-chain-base-to-child", () => {
	it("expands token references across levels in order", () => {
		const baseContract = contract()
			.tokens([
				"primary",
				"secondary",
			])
			.slots([
				"root",
			])
			.build();
		const baseButton = definition(baseContract)
			.token({
				secondary: {
					class: [
						"secondary-styles",
					],
				},
				primary: {
					token: [
						"secondary",
					],
					class: [
						"primary-styles",
					],
				},
			})
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
			.cls();

		const childContract = contract(baseButton.contract).build();
		const childButton = definition(childContract)
			.root({
				root: {
					class: [
						"child",
					],
				},
			})
			.cls();

		expect(childButton.create().slots.root()).toBe(
			"secondary-styles primary-styles base child",
		);
	});
});
