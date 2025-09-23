import { describe, expect, it } from "vitest";
import { contract } from "../../../src";

describe("builder/local-override-wins-over-user-override", () => {
	it("local override replaces config override output", () => {
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

		const created = $cls.create(
			{
				override: true,
				slot: {
					root: {
						class: [
							"CONF-OVR",
						],
					},
				},
			},
			{
				override: true,
				slot: {
					root: {
						class: [
							"USER-OVR",
						],
					},
				},
			},
		);
		expect(created.slots.root()).toBe("base USER-OVR");
	});
});
