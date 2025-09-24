import { describe, expect, it } from "vitest";
import { contract } from "../../../src";

describe("builder/empty-slot-local-append-no-effect", () => {
	it("empty local slot append does not change output", () => {
		const buttonCls = contract()
			.slots([
				"root",
			])
			.bool("on")
			.def()
			.root({
				root: {
					class: [
						"base",
					],
				},
			})
			.defaults({
				on: true,
			})
			.cls();

		const created = buttonCls.create({
			slot: {
				root: {
					class: [],
				},
			},
		});
		expect(created.slots.root()).toBe("base");
	});
});
