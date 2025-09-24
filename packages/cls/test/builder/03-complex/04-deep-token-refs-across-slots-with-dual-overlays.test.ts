import { describe, expect, it } from "vitest";
import { contract, definition } from "../../../src";

describe("builder-03-complex/deep-token-refs-across-slots-with-dual-overlays", () => {
	it("expands deep refs and applies config root overlay + user leaf overlay across slots", () => {
		const baseButton = definition(
			contract()
				.tokens([
					"primary",
					"secondary",
					"tertiary",
				])
				.slots([
					"root",
					"icon",
					"label",
				])
				.build(),
		)
			.token({
				tertiary: {
					class: [
						"tertiary-styles",
					],
				},
				secondary: {
					token: [
						"tertiary",
					],
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
						"root-base",
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
				label: {
					token: [
						"primary",
					],
					class: [
						"label-base",
					],
				},
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
		expect(created.slots.root()).toBe("CONFIG-PRIMARY root-base");
		expect(created.slots.icon()).toBe("CONFIG-PRIMARY icon-base");
		expect(created.slots.label()).toBe("CONFIG-PRIMARY label-base");
	});
});
