import { describe, expect, it } from "vitest";
import { contract } from "../../../src";

describe("builder/multiple-matching-rules-order", () => {
	it("applies rules in declaration order without overrides", () => {
		const $cls = contract()
			.slots([
				"root",
			])
			.variant("size", [
				"sm",
				"md",
			])
			.def()
			.root({
				root: {
					class: [
						"base",
					],
				},
			})
			.match("size", "md", {
				root: {
					class: [
						"md",
					],
				},
			})
			.match("size", "md", {
				root: {
					class: [
						"md-2",
					],
				},
			})
			.defaults({
				size: "md",
			})
			.cls();

		expect($cls.create().slots.root()).toBe("base md md-2");
	});
});
