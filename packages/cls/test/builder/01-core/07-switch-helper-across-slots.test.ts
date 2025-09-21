import { describe, expect, it } from "vitest";
import { contract } from "../../../src";

describe("builder/switch-helper-across-slots", () => {
	it("applies whenTrue and whenFalse classes across root and icon", () => {
		const $cls = contract()
			.slots([
				"root",
				"icon",
			])
			.bool("on")
			.def()
			.switch(
				"on",
				{
					root: {
						class: [
							"r-on",
						],
					},
					icon: {
						class: [
							"i-on",
						],
					},
				},
				{
					root: {
						class: [
							"r-off",
						],
					},
					icon: {
						class: [
							"i-off",
						],
					},
				},
			)
			.defaults({
				on: true,
			})
			.cls();

		const created = $cls.create();
		expect(created.slots.root()).toBe("r-on");
		expect(created.slots.icon()).toBe("i-on");

		const off = $cls.create({
			variant: {
				on: false,
			},
		});
		expect(off.slots.root()).toBe("r-off");
		expect(off.slots.icon()).toBe("i-off");
	});
});
