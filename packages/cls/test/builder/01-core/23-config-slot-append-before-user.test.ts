import { describe, expect, it } from "vitest";
import { contract, tweak } from "../../../src";

describe("builder/config-slot-append-before-user", () => {
	it("config slot append applies before user slot append", () => {
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
					slot: {
						root: {
							class: [
								"USER",
							],
						},
					},
				},
				{
					slot: {
						root: {
							class: [
								"config",
							],
						},
					},
				},
			]),
		);
		expect(created.slots.root()).toBe("base USER");
	});
});
