import { describe, expect, it } from "vitest";
import { contract } from "../../../src";

describe("builder/variant-undefined-reverts-to-default", () => {
	it("treats undefined in user variant as falling back to defaults", () => {
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
				size: "sm",
			})
			.cls();

		const created = $cls.create({
			variant: {
				size: "md",
			},
		});
		expect(created.slots.root()).toBe("base md");

		const reverted = $cls.create({
			variant: {
				size: undefined,
			},
		});
		expect(reverted.slots.root()).toBe("base sm");
	});
});
