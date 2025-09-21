import { describe, expect, it } from "vitest";
import { contract } from "../../../src";

describe("builder-inheritance/child-override-wins-and-ignores-user-append", () => {
	it("child override clears base and user slot append has no effect", () => {
		const base = contract()
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

		const child = contract(base.contract)
			.def()
			.root(
				{
					root: {
						class: [
							"CHILD-OVR",
						],
					},
				},
				true,
			)
			.defaults({
				size: "sm",
			})
			.cls();

		const created = child.create({
			slot: {
				root: {
					class: [
						"USER",
					],
				},
			},
		});
		expect(created.slots.root()).toBe("CHILD-OVR");
	});
});
