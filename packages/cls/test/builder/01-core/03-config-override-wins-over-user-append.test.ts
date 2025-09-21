import { describe, expect, it } from "vitest";
import { contract } from "../../../src";

describe("builder/config-override-wins-over-user-append", () => {
	it("config override replaces classes; user append on root has no effect", () => {
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

		const { slots } = $cls.create(
			{},
			{
				override: {
					root: {
						class: [
							"OVR",
						],
					},
				},
			},
		);

		expect(
			slots.root({
				slot: {
					root: {
						class: [
							"USER",
						],
					},
				},
			}),
		).toBe("OVR");
	});
});
