import { describe, expect, it } from "vitest";
import { contract } from "../../../src";

describe("14.4 Definition Builder - Empty Contract Valid", () => {
	it("should allow creating definition without tokens/defaults when contract is empty", () => {
		// Empty contract should not require token() or defaults() calls
		expect(() => {
			const Component = contract().def().cls(); // Truly empty contract

			expect(Component).toBeDefined();
		}).not.toThrow();
	});
});
