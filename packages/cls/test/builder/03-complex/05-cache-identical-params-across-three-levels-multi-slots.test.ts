import { describe, expect, it } from "vitest";
import { contract, definition } from "../../../src";

describe("builder-03-complex/cache-identical-params-across-three-levels-multi-slots", () => {
	it("returns identical strings for same tweaks across three-level chain and slots", () => {
		const baseButton = definition(
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
			.match("size", "md", {
				root: {
					class: [
						"root-md",
					],
				},
				icon: {
					class: [
						"icon-md",
					],
				},
				label: {
					class: [
						"label-md",
					],
				},
			})
			.defaults({
				size: "sm",
			})
			.cls();

		const childButton = definition(contract(baseButton.contract).build())
			.root({
				root: {
					class: [
						"child",
					],
				},
				icon: {
					class: [
						"icon-child",
					],
				},
				label: {
					class: [
						"label-child",
					],
				},
			})
			.defaults({
				size: "sm",
			})
			.cls();
		const grandchildButton = definition(
			contract(childButton.contract).build(),
		)
			.root({
				root: {
					class: [
						"grandchild",
					],
				},
				icon: {
					class: [
						"icon-grandchild",
					],
				},
				label: {
					class: [
						"label-grandchild",
					],
				},
			})
			.defaults({
				size: "sm",
			})
			.cls();

		const firstResult = grandchildButton.create({
			variant: {
				size: "md",
			},
		});
		const secondResult = grandchildButton.create({
			variant: {
				size: "md",
			},
		});
		expect(firstResult.slots.root()).toBe(secondResult.slots.root());
		expect(firstResult.slots.icon()).toBe(secondResult.slots.icon());
		expect(firstResult.slots.label()).toBe(secondResult.slots.label());
	});
});
