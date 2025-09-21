import { describe, expect, it } from "vitest";
import { contract, definition } from "../../../src";

describe("builder-03-complex/mixed-per-slot-user-override-vs-config-append-across-slots", () => {
	it("user override on root ignores config append; other slots append in order", () => {
		const base = definition(
			contract()
				.slots([
					"root",
					"icon",
					"label",
				])
				.build(),
		)
			.root({
				root: {
					class: [
						"r",
					],
				},
				icon: {
					class: [
						"i",
					],
				},
				label: {
					class: [
						"l",
					],
				},
			})
			.cls();

		const created = base.create(
			{
				override: {
					root: {
						class: [
							"U-ROOT",
						],
					},
				},
				slot: {
					label: {
						class: [
							"U-L",
						],
					},
				},
			},
			{
				slot: {
					root: {
						class: [
							"C-ROOT",
						],
					},
					icon: {
						class: [
							"C-ICON",
						],
					},
					label: {
						class: [
							"C-LABEL",
						],
					},
				},
			},
		);
		expect(created.slots.root()).toBe("U-ROOT");
		expect(created.slots.icon()).toBe("i C-ICON");
		expect(created.slots.label()).toBe("l C-LABEL U-L");
	});
});
