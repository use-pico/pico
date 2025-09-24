import { describe, expect, it } from "vitest";
import { contract } from "../../../src";

describe("builder/local-override-wins-over-user-override", () => {
	it("local override replaces config override output", () => {
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

		const created = buttonCls.create(
			{
				override: true,
				slot: {
					root: {
						class: [
							"CONFIG-OVERRIDE",
						],
					},
				},
			},
			{
				override: true,
				slot: {
					root: {
						class: [
							"USER-OVERRIDE",
						],
					},
				},
			},
		);
		expect(created.slots.root()).toBe("base USER-OVERRIDE");
	});
});
