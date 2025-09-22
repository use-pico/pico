import { describe, expect, it } from "vitest";
import { contract, definition, tweak } from "../../../src";

describe("builder-03-complex/three-level-four-slots-mixed-overrides-and-overlays", () => {
	it("handles mixed per-slot overrides and dual overlays across four slots", () => {
		const base = definition(
			contract()
				.tokens([
					"t1",
					"t2",
					"t3",
				])
				.slots([
					"root",
					"icon",
					"label",
					"badge",
				])
				.variant("size", [
					"sm",
					"md",
				])
				.build(),
		)
			.token({
				t3: {
					class: [
						"a3",
					],
				},
				t2: {
					token: [
						"t3",
					],
					class: [
						"a2",
					],
				},
				t1: {
					token: [
						"t2",
					],
					class: [
						"a1",
					],
				},
			})
			.root({
				root: {
					token: [
						"t1",
					],
					class: [
						"r-base",
					],
				},
				icon: {
					token: [
						"t1",
					],
					class: [
						"i-base",
					],
				},
				label: {
					class: [
						"l-base",
					],
				},
				badge: {
					class: [
						"b-base",
					],
				},
			})
			.match("size", "md", {
				icon: {
					class: [
						"i-md",
					],
				},
				label: {
					class: [
						"l-md",
					],
				},
			})
			.defaults({
				size: "sm",
			})
			.cls();

		const child = definition(contract(base.contract).build())
			.root({
				root: {
					class: [
						"r-child",
					],
				},
				icon: {
					class: [
						"i-child",
					],
				},
				label: {
					class: [
						"l-child",
					],
				},
				badge: {
					class: [
						"b-child",
					],
				},
			})
			.defaults({
				size: "sm",
			})
			.cls();

		const grand = definition(contract(child.contract).build())
			.root({
				root: {
					class: [
						"r-grand",
					],
				},
				icon: {
					class: [
						"i-grand",
					],
				},
				label: {
					class: [
						"l-grand",
					],
				},
				badge: {
					class: [
						"b-grand",
					],
				},
			})
			.defaults({
				size: "sm",
			})
			.cls();

		const created = grand.create(
			tweak([
				{
					token: {
						t2: {
							class: [
								"U2",
							],
						},
					},
					slot: {
						badge: {
							class: [
								"U-B",
							],
						},
					},
				},
				{
					token: {
						t1: {
							class: [
								"C1",
							],
						},
					},
					override: {
						label: {
							class: [
								"L-OVR",
							],
						},
					},
				},
			]),
		);
		expect(created.slots.root()).toBe("C1 r-base r-child r-grand");
		expect(created.slots.icon()).toBe("C1 i-base i-child i-grand");
		expect(created.slots.label()).toBe("L-OVR");
		expect(created.slots.badge()).toBe("b-base b-child b-grand U-B");
	});
});
