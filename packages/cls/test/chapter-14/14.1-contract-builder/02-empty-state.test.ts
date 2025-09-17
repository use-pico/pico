import { describe, expect, it } from "vitest";
import { contract } from "../../../src";

describe("14.1 Contract Builder - Empty State", () => {
	it("should start with empty state and build minimal contract", () => {
		const result = contract().build();

		expect(result.tokens).toEqual([]);
		expect(result.slot).toEqual([]);
		expect(result.variant).toEqual({});
	});
});
