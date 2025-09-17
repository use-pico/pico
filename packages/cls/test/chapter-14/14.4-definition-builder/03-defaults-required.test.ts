import { describe, expect, it } from "vitest";
import { contract } from "../../../src";

describe("14.4 Definition Builder - Defaults Required", () => {
	it("should require defaults() when contract has variants", () => {
		expect(() => {
			contract()
				.variant("size", [
					"sm",
					"md",
					"lg",
				])
				.def()
				.cls(); // Missing .defaults() call
		}).toThrow("Defaults are required. Call .defaults() before .cls()");
	});
});
