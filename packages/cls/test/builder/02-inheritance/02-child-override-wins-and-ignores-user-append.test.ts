import { describe, expect, it } from "vitest";
import { contract } from "../../../src";

describe("builder-inheritance/child-override-wins-and-ignores-user-append", () => {
	it("child override clears base but user slot append still applies", () => {
		const baseButton = contract()
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

		const childButton = contract(baseButton.contract)
			.def()
			.root(
				{
					root: {
						class: [
							"CHILD-OVERRIDE",
						],
					},
				},
				true,
			)
			.defaults({
				size: "sm",
			})
			.cls();

		const created = childButton.create({
			slot: {
				root: {
					class: [
						"USER-APPEND",
					],
				},
			},
		});
		expect(created.slots.root()).toBe("CHILD-OVERRIDE USER-APPEND");
	});
});
