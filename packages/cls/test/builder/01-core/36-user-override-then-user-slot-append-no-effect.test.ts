import { describe, expect, it } from "vitest";
import { contract } from "../../../src";

describe("builder/user-override-then-user-slot-append-no-effect", () => {
	it("user slot append after user override has no effect", () => {
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

		const created = $cls.create({
			override: {
				root: {
					class: [
						"USER-OVR",
					],
				},
			},
			slot: {
				root: {
					class: [
						"user-append",
					],
				},
			},
		});
		expect(created.slots.root()).toBe("USER-OVR");
	});
});
