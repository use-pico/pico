import { describe, expect, it } from "vitest";
import { contract, definition } from "../../../src";

describe("builder-03-complex/two-matching-rules-with-per-slot-override-behavior", () => {
	it("applies both rules for root while icon is overridden by second", () => {
		const base = definition(
			contract()
				.slots([
					"root",
					"icon",
				])
				.variant("v", [
					"a",
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
			})
			.match("v", "a", {
				root: {
					class: [
						"r1",
					],
				},
				icon: {
					class: [
						"i1",
					],
				},
			})
			.match(
				"v",
				"a",
				{
					root: {
						class: [
							"r2",
						],
					},
					icon: {
						class: [
							"I-OVR",
						],
					},
				},
				true,
			)
			.defaults({
				v: "a",
			})
			.cls();

		const created = base.create();
		expect(created.slots.root()).toBe("r2");
		expect(created.slots.icon()).toBe("I-OVR");
	});
});
