import { describe, expect, it } from "vitest";
import { contract } from "../../../src";

describe("builder/user-override-then-user-slot-append-no-effect", () => {
	it("user slot append after user override has no effect", () => {
		const buttonCls = contract()
			.slots([
				"root",
			])
			.def()
			.root({
				root: {
					class: [
						"base",
					],
				},
			})
			.cls();

		const created = buttonCls.create(
			{
				slot: {
					root: {
						class: [
							"user-append",
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
