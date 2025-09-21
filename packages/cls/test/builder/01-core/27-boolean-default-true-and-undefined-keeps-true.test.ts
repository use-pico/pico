import { describe, expect, it } from "vitest";
import { contract } from "../../../src";

describe("builder/boolean-default-true-and-undefined-keeps-true", () => {
	it("undefined keeps boolean default true", () => {
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
			.match("on", true, {
				root: {
					class: [
						"on",
					],
				},
			})
			.defaults({
				on: true,
			})
			.cls();

		const a = $cls.create();
		expect(a.slots.root()).toBe("base on");
		const b = $cls.create({
			variant: {
				on: undefined,
			},
		});
		expect(b.slots.root()).toBe("base on");
	});
});
