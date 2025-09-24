import { describe, expect, it } from "vitest";
import { contract, definition } from "../../../src";

describe("builder-03-complex/two-matching-rules-with-per-slot-override-behavior", () => {
	it("applies both rules for root while icon is overridden by second", () => {
		const baseButton = definition(
			contract()
				.slots([
					"root",
					"icon",
				])
				.variant("variant", [
					"active",
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
			})
			.match("variant", "active", {
				root: {
					class: [
						"root-active-1",
					],
				},
				icon: {
					class: [
						"icon-active-1",
					],
				},
			})
			.match(
				"variant",
				"active",
				{
					root: {
						class: [
							"root-active-2",
						],
					},
					icon: {
						class: [
							"ICON-OVERRIDE",
						],
					},
				},
				true,
			)
			.defaults({
				variant: "active",
			})
			.cls();

		const created = baseButton.create();
		expect(created.slots.root()).toBe("root-active-2");
		expect(created.slots.icon()).toBe("ICON-OVERRIDE");
	});
});
