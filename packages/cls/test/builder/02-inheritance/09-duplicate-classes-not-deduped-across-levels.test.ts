import { describe, expect, it } from "vitest";
import { contract, definition } from "../../../src";

describe("builder-inheritance/duplicate-classes-not-deduped-across-levels", () => {
	it("keeps duplicate classes contributed by base and child", () => {
		const baseC = contract()
			.slots([
				"root",
			])
			.build();
		const base = definition(baseC)
			.root({
				root: {
					class: [
						"dup",
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
						"dup",
						"child",
					],
				},
			})
			.cls();

		expect(child.create().slots.root()).toBe("dup base dup child");
	});
});
