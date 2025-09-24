import { describe, expect, it } from "vitest";
import { contract, definition } from "../../../src";

describe("builder-03-complex/config-root-overlay-user-icon-leaf-overlay-icon-rule-override", () => {
	it("config root overlay replaces chain; user leaf overlay applies on icon; icon rule override wins", () => {
		const baseButton = definition(
			contract()
				.tokens([
					"primary",
					"secondary",
				])
				.slots([
					"root",
					"icon",
				])
				.variant("on", [
					"bool",
				])
				.build(),
		)
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
				icon: {
					token: [
						"primary",
					],
					class: [
						"icon-base",
					],
				},
			})
			.match("on", true, {
				icon: {
					class: [
						"icon-enabled",
					],
				},
			})
			.defaults({
				on: false,
			})
			.cls();

		const created = baseButton.create(
			{
				token: {
					secondary: {
						class: [
							"USER-SECONDARY",
						],
					},
				},
			},
			{
				token: {
					primary: {
						class: [
							"CONFIG-PRIMARY",
						],
					},
				},
			},
		);
		expect(created.slots.root()).toBe("CONFIG-PRIMARY base");
		expect(created.slots.icon()).toBe("CONFIG-PRIMARY icon-base");

		expect(
			contract(baseButton.contract)
				.def()
				.root({
					icon: {
						class: [
							"ICON-OVERRIDE",
						],
					},
					root: {
						class: [
							"noop",
						],
					},
				})
				.defaults({
					on: false,
				})
				.cls()
				.create()
				.slots.icon(),
		).toBe("secondary-styles primary-styles icon-base ICON-OVERRIDE");
	});
});
