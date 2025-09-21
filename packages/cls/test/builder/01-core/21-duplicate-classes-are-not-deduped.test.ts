import { describe, expect, it } from "vitest";
import { contract } from "../../../src";

describe("builder/duplicate-classes-are-not-deduped", () => {
	it("does not dedupe repeated classes across rules and slots", () => {
		const $cls = contract()
			.slots([
				"root",
			])
			.bool("on")
			.def()
			.root({
				root: {
					class: [
						"x",
					],
				},
			})
			.match("on", true, {
				root: {
					class: [
						"x",
					],
				},
			})
			.defaults({
				on: true,
			})
			.cls();

		expect($cls.create().slots.root()).toBe("x x");
	});
});
