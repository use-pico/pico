import { describe, expect, it } from "vitest";
import { contract } from "../../../src";

describe("builder/pure-root-rule-via-root-method", () => {
	it("uses .root() method to add unconditional classes", () => {
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

		expect(buttonCls.create().slots.root()).toBe("base");
	});
});
