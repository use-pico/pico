import { describe, expect, it } from "vitest";
import { contract, definition } from "../../../src";

describe("builder-03-complex/cache-identical-params-across-three-levels-multi-slots", () => {
	it("returns identical strings for same tweaks across three-level chain and slots", () => {
		const base = definition(
			contract()
				.slots([
					"root",
					"icon",
					"label",
				])
				.variant("size", [
					"sm",
					"md",
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
			.match("size", "md", {
				root: {
					class: [
						"r-md",
					],
				},
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
						"c",
					],
				},
				icon: {
					class: [
						"ci",
					],
				},
				label: {
					class: [
						"cl",
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
						"g",
					],
				},
				icon: {
					class: [
						"gi",
					],
				},
				label: {
					class: [
						"gl",
					],
				},
			})
			.defaults({
				size: "sm",
			})
			.cls();

		const a = grand.create({
			variant: {
				size: "md",
			},
		});
		const b = grand.create({
			variant: {
				size: "md",
			},
		});
		expect(a.slots.root()).toBe(b.slots.root());
		expect(a.slots.icon()).toBe(b.slots.icon());
		expect(a.slots.label()).toBe(b.slots.label());
	});
});
