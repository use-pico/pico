import { describe, expect, it } from "vitest";
import { contract, tweak } from "../../../src";

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
			tweak([
				{
					override: {
						root: {
							class: [
								"USER-OVR",
							],
						},
					},
				},
				{
					override: {
						root: {
							class: [
								"CONF-OVR",
							],
						},
					},
				},
			]),
		);
		expect(created.slots.root()).toBe("USER-OVR");
	});
});
