import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { tx } from "../../../../src";

describe("toolbox/tx/object-methods", () => {
	it("extracts translations from object method calls", () => {
		tx({
			packages: [
				__dirname,
			],
			output: __dirname,
			locales: [
				"en",
			],
			format: "json",
		});

		const output = fs.readFileSync(
			path.join(__dirname, "en.json"),
			"utf-8",
		);
		const expected = fs.readFileSync(
			path.join(__dirname, "match.json"),
			"utf-8",
		);

		expect(JSON.stringify(JSON.parse(output), null, 2)).toBe(
			JSON.stringify(JSON.parse(expected), null, 2),
		);
	});
});
