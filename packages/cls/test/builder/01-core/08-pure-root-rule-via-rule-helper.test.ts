import { describe, expect, it } from "vitest";
import { contract } from "../../../src";

describe("builder/pure-root-rule-via-rule-helper", () => {
	it("uses rule(undefined, ...) to add unconditional classes", () => {
		const $cls = contract()
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

		expect($cls.create().slots.root()).toBe("base");
	});
});
