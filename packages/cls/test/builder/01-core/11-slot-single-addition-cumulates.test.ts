import { describe, expect, it } from "vitest";
import { contract } from "../../../src";

describe("builder/slot-single-addition-cumulates", () => {
	it("slot() adds a single slot on top of existing ones", () => {
		const buttonCls = contract()
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
						"icon",
					],
				},
			})
			.cls();

		const created = buttonCls.create();
		expect(created.slots.root()).toBe("base");
		expect(created.slots.icon()).toBe("icon");
	});
});
