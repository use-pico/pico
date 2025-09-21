import { describe, expect, it } from "vitest";
import { contract } from "../../../src";

describe("builder/basic-root-rule", () => {
	it("produces base class on root via root() rule", () => {
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

		const { slots } = $cls.create();
		expect(slots.root()).toBe("base");
	});
});
