import { describe, expect, it } from "vitest";
import { contract } from "../../../src";

describe("14.4 Definition Builder - Empty Contract Valid", () => {
	it("should allow creating definition when inheriting from parent contract", () => {
		// Create a parent contract with some content
		const ParentCls = contract()
			.tokens([
				"color.primary",
			])
			.variant("foo", [
				"bar",
				"baz",
			])
			.slot("root")
			.def()
			.token({
				"color.primary": {
					class: [
						"text-blue-500",
					],
				},
			})
			.defaults({
				foo: "bar",
			})
			.cls();

		// Child contract inheriting from parent should require defaults (parent has variants)
		expect(() => {
			const Component = contract(ParentCls.contract)
				.def()
				.defaults({
					foo: "bar",
				})
				.cls();

			expect(Component).toBeDefined();
		}).not.toThrow();
	});
});
