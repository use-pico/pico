import { describe, expect, it } from "vitest";
import { contract, tweak } from "../../../src";

describe("builder/config-override-ignores-user-slot-append", () => {
	it("config override replaces classes; user slot append has no effect", () => {
		const $cls = contract()
			.slots([
				"root",
				"icon",
			])
			.bool("on")
			.def()
			.root({
				root: {
					class: [
						"base-root",
					],
				},
				icon: {
					class: [
						"base-icon",
					],
				},
			})
			.match(
				"on",
				true,
				{
					root: {
						class: [
							"on-root",
						],
					},
					icon: {
						class: [
							"on-icon",
						],
					},
				},
				true,
			)
			.defaults({
				on: true,
			})
			.cls();

		const created = $cls.create(
			tweak([
				{
					slot: {
						root: {
							class: [
								"USER",
							],
						},
					},
				},
				{
					override: {
						root: {
							class: [
								"CONF-OVR-R",
							],
						},
						icon: {
							class: [
								"CONF-OVR-I",
							],
						},
					},
				},
			]),
		);
		expect(created.slots.root()).toBe("CONF-OVR-R");
		expect(created.slots.icon()).toBe("CONF-OVR-I");
	});
});
