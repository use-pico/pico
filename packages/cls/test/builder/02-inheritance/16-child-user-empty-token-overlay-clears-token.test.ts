import { describe, expect, it } from "vitest";
import { contract, definition } from "../../../src";

describe("builder-inheritance/child-user-empty-token-overlay-clears-token", () => {
	it("user empty overlay clears token output on child", () => {
		const baseContract = contract()
			.tokens([
				"primary",
			])
			.slots([
				"root",
			])
			.build();
		const baseButton = definition(baseContract)
			.token({
				primary: {
					class: [
						"primary-styles",
					],
				},
			})
			.root({
				root: {
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

		const created = childButton.create({
			token: {
				primary: {
					class: [],
				},
			},
		});
		expect(created.slots.root()).toBe("base child");
	});
});
