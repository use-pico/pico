import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("1.1 Simple Component Creation - Empty Tokens and Variants", () => {
	it("should create component with empty tokens and variants", () => {
		const MinimalComponent = cls(
			{
				tokens: {},
				slot: [
					"root",
				],
				variant: {},
			},
			({ what, def }) => ({
				token: {},
				rules: [
					def.root({
						root: what.css([
							"minimal-class",
						]),
					}),
				],
				defaults: {},
			}),
		);

		const instance = MinimalComponent.create();
		expect(instance.root()).toBe("minimal-class");
	});
});
