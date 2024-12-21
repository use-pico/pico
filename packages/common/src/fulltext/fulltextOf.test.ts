import { describe, expect, it } from "vitest";
import { fulltextOf } from "./fulltextOf";

describe("fulltextOf", () => {
	it("Fulltext search", () => {
		const obj = {
			name: "John Doe",
			age: 30,
			address: {
				street: "123 Main St",
				city: "Anytown",
				zip: "12345",
			},
		};

		expect(
			fulltextOf({
				source: obj,
				fulltext: "foo",
			}),
		).toBe(false);
		expect(
			fulltextOf({
				source: obj,
				fulltext: "doe",
			}),
		).toBe(true);
		expect(
			fulltextOf({
				source: obj,
				fulltext: "town",
			}),
		).toBe(true);
	});
});
