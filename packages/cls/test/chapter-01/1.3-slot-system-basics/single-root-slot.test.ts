import { describe, expect, it } from "vitest";
import { cls } from "../../../src";

describe("1.3 Slot System Basics - Single Root Slot", () => {
	it("should create component with single root slot", () => {
		const Button = cls(
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
							"inline-flex",
							"items-center",
						]),
					}),
				],
				defaults: {},
			}),
		);

		const instance = Button.create();
		expect(instance.root()).toBe("inline-flex items-center");
	});
});
