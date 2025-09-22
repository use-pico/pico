import { describe, expect, it } from "vitest";
import { contract, definition, tweak } from "../../../src";

describe("builder-03-complex/three-level-many-rules-per-slot-overrides", () => {
	it("applies multi-rules across slots with per-slot overrides through inheritance", () => {
		const baseC = contract()
			.tokens([
				"t1",
				"t2",
			])
			.slots([
				"root",
				"icon",
				"label",
			])
			.variant("size", [
				"sm",
				"md",
			])
			.variant("tone", [
				"light",
				"dark",
			])
			.build();
		const base = definition(baseC)
			.token({
				t2: {
					class: [
						"b2",
					],
				},
				t1: {
					token: [
						"t2",
					],
					class: [
						"b1",
					],
				},
			})
			.root({
				root: {
					token: [
						"t1",
					],
					class: [
						"base",
					],
				},
				icon: {
					class: [
						"i-base",
					],
				},
				label: {
					class: [
						"l-base",
					],
				},
			})
			.match("size", "sm", {
				root: {
					class: [
						"r-sm",
					],
				},
				icon: {
					class: [
						"i-sm",
					],
				},
			})
			.match("tone", "dark", {
				root: {
					class: [
						"r-dark",
					],
				},
				label: {
					class: [
						"l-dark",
					],
				},
			})
			.defaults({
				size: "sm",
				tone: "light",
			})
			.cls();

		const child = definition(
			contract(base.contract)
				.variant("tone", [
					"sepia",
				])
				.build(),
		)
			.root({
				root: {
					class: [
						"child",
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
			})
			.match("tone", "sepia", {
				label: {
					class: [
						"l-sepia",
					],
				},
			})
			.defaults({
				size: "sm",
				tone: "light",
			})
			.cls();

		const grand = definition(contract(child.contract).build())
			.root({
				root: {
					class: [
						"grand",
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
				tone: "light",
			})
			.cls();

		const created = grand.create({
			variant: {
				size: "md",
				tone: "dark",
			},
		});
		expect(created.slots.root()).toBe("b2 b1 base r-dark child grand");
		expect(created.slots.icon()).toBe("i-base i-child i-grand i-md");
		expect(created.slots.label()).toBe(
			"l-base l-dark l-child l-grand l-md",
		);

		const withOverrides = grand.create(
			tweak([
				{
					override: {
						label: {
							class: [
								"L-OVR",
							],
						},
					},
					slot: {
						icon: {
							class: [
								"I-USER",
							],
						},
					},
				},
				{
					override: {
						icon: {
							class: [
								"I-OVR",
							],
						},
					},
				},
			]),
		);
		expect(withOverrides.slots.root()).toBe("b2 b1 base r-sm child grand");
		expect(withOverrides.slots.icon()).toBe("I-OVR");
		expect(withOverrides.slots.label()).toBe("L-OVR");
	});
});
