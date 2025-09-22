import { describe, expect, it } from "vitest";
import { contract, definition, tweak } from "../../../src";

describe("builder-inheritance/fluent-three-level-chain-builds-and-matches", () => {
	it("fluent three-level chain composes and matches variants across levels", () => {
		const base = definition(
			contract()
				.tokens([
					"t1",
				])
				.slots([
					"root",
					"label",
				])
				.variant("size", [
					"sm",
					"md",
				])
				.build(),
		)
			.token({
				t1: {
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
						"base",
					],
				},
				label: {
					class: [
						"lbl",
					],
				},
			})
			.match("size", "md", {
				root: {
					class: [
						"b-md",
					],
				},
			})
			.defaults({
				size: "sm",
			})
			.cls();

		const child = definition(
			contract(base.contract)
				.tokens([
					"t2",
				])
				.build(),
		)
			.token({
				t2: {
					token: [
						"t1",
					],
					class: [
						"a2",
					],
				},
			})
			.root({
				root: {
					class: [
						"child",
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
						"grand",
					],
				},
			})
			.defaults({
				size: "sm",
			})
			.cls();

		const created = grand.create({
			variant: {
				size: "md",
			},
		});
		expect(created.slots.root()).toBe("a1 base b-md child grand");
		expect(created.slots.label()).toBe("lbl");
	});
});
