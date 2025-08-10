import { describe, expect, it } from "vitest";
import { cls } from "../src/cls";

describe("01 - Basic cls functionality", () => {
	it("should create a basic cls instance without tokens", () => {
		const Basic = cls(
			{
				tokens: {},
				slot: [
					"root",
				],
				variant: {},
			},
			({ def, what }) => ({
				token: def.token({}),
				rules: [
					def.root({
						root: what.css([
							"bg-white",
							"rounded",
						]),
					}),
				],
				defaults: def.defaults({}),
			}),
		);

		const classes = Basic.create();
		expect(classes.root()).toBe("bg-white rounded");
	});
});
