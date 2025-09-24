import { describe, expect, it } from "vitest";
import { contract, definition } from "../../../src";

describe("builder-03-complex/deep-branching-refs-per-slot-with-dual-overlays", () => {
	it("resolves per-slot branching refs and applies config root + user leaf overlays", () => {
		const baseButton = definition(
			contract()
				.tokens([
					"primary",
					"secondary",
					"tertiary",
					"quaternary",
				])
				.slots([
					"root",
					"icon",
					"label",
				])
				.build(),
		)
			.token({
				quaternary: {
					class: [
						"quaternary-styles",
					],
				},
				tertiary: {
					token: [
						"quaternary",
					],
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
						"secondary",
					],
					class: [
						"icon-base",
					],
				},
				label: {
					token: [
						"tertiary",
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
					tertiary: {
						class: [
							"USER-TERTIARY",
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
		expect(created.slots.icon()).toBe(
			"USER-TERTIARY secondary-styles icon-base",
		);
		expect(created.slots.label()).toBe("USER-TERTIARY label-base");
	});
});
