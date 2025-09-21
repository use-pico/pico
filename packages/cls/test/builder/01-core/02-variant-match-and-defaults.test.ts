import { describe, expect, it } from "vitest";
import { contract } from "../../../src";

describe("builder/variant-match-and-defaults", () => {
	it("applies md rule when defaults set to md; sm otherwise", () => {
		const def = contract()
			.slots([
				"root",
			])
			.variant("size", [
				"sm",
				"md",
			])
			.def()
			.match("size", "sm", {
				root: {
					class: [
						"sm",
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
			.defaults({
				size: "md",
			});

		const $cls = def.cls();
		expect($cls.create().slots.root()).toBe("md");
		expect(
			$cls
				.create({
					variant: {
						size: "sm",
					},
				})
				.slots.root(),
		).toBe("sm");
	});
});
