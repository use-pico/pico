import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { tx } from "../../../../src";

describe("toolbox/tx/function-calls", () => {
	it("extracts translations from function calls", () => {
		tx({
			packages: [
				__dirname,
			],
			output: __dirname,
			locales: [
				"en",
			],
			format: "json",
			functions: [
				{
					name: "t",
				},
			],
		});

		const output = fs.readFileSync(
			path.join(__dirname, "en.json"),
			"utf-8",
		);
		const expected = fs.readFileSync(
			path.join(__dirname, "match.json"),
			"utf-8",
		);

		expect(output).toBe(expected);
	});
});
