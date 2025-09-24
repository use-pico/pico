import { describe, expect, it } from "vitest";
import { contract } from "../../../src";

describe("builder/variant-match-and-defaults", () => {
	it("applies md rule when defaults set to md; sm otherwise", () => {
		const buttonDefinition = contract()
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

		const buttonCls = buttonDefinition.cls();
		expect(buttonCls.create().slots.root()).toBe("md");
		expect(
			buttonCls
				.create({
					variant: {
						size: "sm",
					},
				})
				.slots.root(),
		).toBe("sm");
	});
});
