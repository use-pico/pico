import { describe, expect, it } from "vitest";
import { contract, definition } from "../../../src";

describe("builder-inheritance/child-user-empty-token-overlay-clears-token", () => {
	it("user empty overlay clears token output on child", () => {
		const baseC = contract()
			.tokens([
				"t1",
			])
			.slots([
				"root",
			])
			.build();
		const base = definition(baseC)
			.token({
				t1: {
					class: [
						"a1",
					],
				},
			})
			.root({
				root: {
					class: [
						"base",
					],
				},
			})
			.cls();

		const childC = contract(base.contract).build();
		const child = definition(childC)
			.root({
				root: {
					class: [
						"child",
					],
				},
			})
			.cls();

		const created = child.create({
			token: {
				t1: {
					class: [],
				},
			},
		});
		expect(created.slots.root()).toBe("base child");
	});
});
