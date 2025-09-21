import { describe, expect, it } from "vitest";
import { contract } from "../../../src";

describe("builder/slots-calls-cumulate-names", () => {
	it("repeated slots() calls cumulate unique slot names", () => {
		const $cls = contract()
			.slots([
				"root",
			])
			.slots([
				"icon",
			])
			.bool("on")
			.def()
			.root({
				root: {
					class: [
						"base",
					],
				},
				icon: {
					class: [
						"i",
					],
				},
			})
			.defaults({
				on: true,
			})
			.cls();

		const created = $cls.create();
		expect(created.slots.root()).toBe("base");
		expect(created.slots.icon()).toBe("i");
	});
});
