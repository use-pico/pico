import { describe, expect, it } from "vitest";
import { contract, definition } from "../../../src";

describe("builder-inheritance/branching-token-refs-across-levels-non-circular", () => {
	it("expands branching token references across base->child->grandchild", () => {
		const baseC = contract()
			.tokens([
				"t1",
				"t2",
			])
			.slots([
				"root",
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
			})
			.cls();

		const childC = contract(base.contract)
			.tokens([
				"t3",
			])
			.build();
		const child = definition(childC)
			.token({
				t3: {
					class: [
						"c3",
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
			.cls();

		const grandC = contract(child.contract).build();
		const grand = definition(grandC)
			.token({
				t1: {
					token: [
						"t3",
					],
					class: [
						"g1",
					],
				},
			})
			.root({
				root: {
					token: [
						"t1",
					],
					class: [
						"grand",
					],
				},
			})
			.cls();

		const created = grand.create();
		expect(created.slots.root()).toBe("c3 g1 base child c3 g1 grand");
	});
});
