import { describe, expect, it } from "vitest";
import { contract, OVERRIDE } from "../../../src";

describe("builder/rule-override-clears-multiple-slots", () => {
	it("override rule clears both root and icon outputs", () => {
		const buttonCls = contract()
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
			.match("on", true, {
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
			})
			.match(
				"on",
				false,
				{
					root: {
						class: [
							"off-root",
						],
					},
					icon: {
						class: [
							"off-icon",
						],
					},
				},
				OVERRIDE,
			)
			.defaults({
				on: true,
			})
			.cls();

		const onCreated = buttonCls.create();
		expect(onCreated.slots.root()).toBe("base-root on-root");
		expect(onCreated.slots.icon()).toBe("base-icon on-icon");

		const offCreated = buttonCls.create({
			variant: {
				on: false,
			},
		});
		expect(offCreated.slots.root()).toBe("off-root");
		expect(offCreated.slots.icon()).toBe("off-icon");
	});
});
