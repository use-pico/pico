import { describe, expect, it } from "vitest";
import { contract, definition } from "../../../src";

describe("builder-03-complex/mixed-per-slot-user-override-vs-config-append-across-slots", () => {
	it("user override on root ignores config append; other slots append in order", () => {
		const baseButton = definition(
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
						"root-base",
					],
				},
				icon: {
					class: [
						"icon-base",
					],
				},
				label: {
					class: [
						"label-base",
					],
				},
			})
			.cls();

		const created = baseButton.create(
			{
				slot: {
					root: {
						class: [
							"CONFIG-ROOT",
						],
					},
					icon: {
						class: [
							"CONFIG-ICON",
						],
					},
					label: {
						class: [
							"CONFIG-LABEL",
						],
					},
				},
			},
			{
				override: true,
				slot: {
					root: {
						class: [
							"USER-ROOT-OVERRIDE",
						],
					},
					label: {
						class: [
							"USER-LABEL",
						],
					},
				},
			},
		);
		expect(created.slots.root()).toBe("root-base USER-ROOT-OVERRIDE");
		expect(created.slots.icon()).toBe("icon-base CONFIG-ICON");
		expect(created.slots.label()).toBe("label-base USER-LABEL");
	});
});
