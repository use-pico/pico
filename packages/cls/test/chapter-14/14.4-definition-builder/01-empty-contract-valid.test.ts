import { describe, expect, it } from "vitest";
import { contract } from "../../../src";

describe("14.4 Definition Builder - Empty Contract Valid", () => {
	it("should allow creating definition without tokens/defaults when contract is empty", () => {
		// Empty contract should not require token() or defaults() calls
		expect(() => {
			const Component = contract().variant('df',['s']).def().cls();

			expect(Component).toBeDefined();
		}).not.toThrow();
	});
});
