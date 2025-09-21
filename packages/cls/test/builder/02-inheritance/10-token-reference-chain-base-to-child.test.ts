import { describe, expect, it } from "vitest";
import { contract, definition } from "../../../src";

describe("builder-inheritance/token-reference-chain-base-to-child", () => {
	it("expands token references across levels in order", () => {
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

		expect(child.create().slots.root()).toBe("b2 b1 base child");
	});
});
