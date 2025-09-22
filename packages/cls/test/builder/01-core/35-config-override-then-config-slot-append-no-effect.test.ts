import { describe, expect, it } from "vitest";
import { contract, tweak } from "../../../src";

describe("builder/config-override-then-config-slot-append-no-effect", () => {
	it("config slot append after config override has no effect", () => {
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
				undefined,
				{
					override: {
						root: {
							class: [
								"CONF-OVR",
							],
						},
					},
					slot: {
						root: {
							class: [
								"conf-append",
							],
						},
					},
				},
			]),
		);
		expect(created.slots.root()).toBe("CONF-OVR");
	});
});
