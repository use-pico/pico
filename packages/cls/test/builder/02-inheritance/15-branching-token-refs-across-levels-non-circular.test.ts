import { describe, expect, it } from "vitest";
import { contract, definition } from "../../../src";

describe("builder-inheritance/branching-token-refs-across-levels-non-circular", () => {
	it("expands branching token references across base->child->grandchild", () => {
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

		const childContract = contract(baseButton.contract)
			.tokens([
				"tertiary",
			])
			.build();
		const childButton = definition(childContract)
			.token({
				tertiary: {
					class: [
						"tertiary-styles",
					],
				},
			})
			.root({
				root: {
					class: [
						"child",
					],
				},
			})
			.cls();

		const grandchildContract = contract(childButton.contract).build();
		const grandchildButton = definition(grandchildContract)
			.token({
				primary: {
					token: [
						"tertiary",
					],
					class: [
						"grandchild-primary",
					],
				},
			})
			.root({
				root: {
					token: [
						"primary",
					],
					class: [
						"grandchild",
					],
				},
			})
			.cls();

		const created = grandchildButton.create();
		expect(created.slots.root()).toBe(
			"tertiary-styles grandchild-primary base child tertiary-styles grandchild-primary grandchild",
		);
	});
});
