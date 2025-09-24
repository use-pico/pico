import { describe, expect, it } from "vitest";
import { contract, definition } from "../../../src";

describe("builder-inheritance/config-root-token-overlay-replaces-chain", () => {
	it("config overlay on root token replaces the whole chain", () => {
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

		const created = childButton.create(undefined, {
			token: {
				primary: {
					class: [
						"CONFIG-OVERRIDE",
					],
				},
			},
		});
		expect(created.slots.root()).toBe("CONFIG-OVERRIDE base child");
	});
});
