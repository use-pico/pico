import { describe, expect, it } from "vitest";
import { contract, definition } from "../../../src";

describe("builder-inheritance/duplicate-classes-not-deduped-across-levels", () => {
	it("keeps duplicate classes contributed by base and child", () => {
		const baseContract = contract()
			.slots([
				"root",
			])
			.build();
		const baseButton = definition(baseContract)
			.root({
				root: {
					class: [
						"duplicate",
						"base",
					],
				},
			})
			.cls();

		const childContract = contract(baseButton.contract).build();
		const childButton = definition(childContract)
			.root({
				root: {
					class: [
						"duplicate",
						"child",
					],
				},
			})
			.cls();

		expect(childButton.create().slots.root()).toBe("base duplicate child");
	});
});
