import { describe, expect, it } from "vitest";
import { contract } from "../../../src";

describe("builder/slot-single-addition-cumulates", () => {
	it("slot() adds a single slot on top of existing ones", () => {
		const $cls = contract()
			.slots([
				"root",
			])
			.slot("icon")
			.def()
			.root({
				root: {
					class: [
						"base",
					],
				},
				icon: {
					class: [
						"i",
					],
				},
			})
			.cls();

		const created = $cls.create();
		expect(created.slots.root()).toBe("base");
		expect(created.slots.icon()).toBe("i");
	});
});
