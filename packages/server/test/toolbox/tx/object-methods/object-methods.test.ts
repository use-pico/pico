import fs from "node:fs";
import path from "node:path";
import { beforeAll, describe, expect, it } from "vitest";
import { tx } from "../../../../src";

describe("toolbox/tx/object-methods", () => {
	const outputDir = path.join(__dirname, "output/object-methods");
	const matchDir = path.join(__dirname, "match/object-methods");

	beforeAll(() => {
		if (fs.existsSync(outputDir)) {
			fs.rmSync(outputDir, {
				recursive: true,
			});
		}
	});

	it("extracts translations from object method calls", () => {
		tx({
			packages: [
				__dirname,
			],
			output: outputDir,
			locales: [
				"en",
			],
			format: "json",
		});

		const output = fs.readFileSync(
			path.join(outputDir, "en.json"),
			"utf-8",
		);
		const expected = fs.readFileSync(
			path.join(matchDir, "en.json"),
			"utf-8",
		);

		expect(output).toBe(expected);
	});
});
