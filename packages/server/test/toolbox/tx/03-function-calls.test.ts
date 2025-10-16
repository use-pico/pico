import fs from "node:fs";
import path from "node:path";
import { beforeAll, describe, expect, it } from "vitest";
import { tx } from "../../../src";

describe("toolbox/tx/function-calls", () => {
	const outputDir = path.join(__dirname, "output/function-calls");
	const matchDir = path.join(__dirname, "match/function-calls");

	beforeAll(() => {
		if (fs.existsSync(outputDir)) {
			fs.rmSync(outputDir, {
				recursive: true,
			});
		}
	});

	it("extracts translations from function calls", () => {
		tx({
			packages: [
				__dirname,
			],
			output: outputDir,
			locales: [
				"en",
			],
			functions: [
				{
					name: "t",
				},
			],
		});

		const output = fs.readFileSync(
			path.join(outputDir, "en.yaml"),
			"utf-8",
		);
		const expected = fs.readFileSync(
			path.join(matchDir, "en.yaml"),
			"utf-8",
		);

		expect(output).toBe(expected);
	});
});
