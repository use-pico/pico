import { describe, expect, it } from "vitest";
import { withVariants } from "../../../src/utils/withVariants";

describe("utils/withVariants/with-variants-tweak-override", () => {
	it("overrides defaults with tweak variants", () => {
		const contract = {
			"~use": undefined,
			"~definition": {
				defaults: {
					size: "md",
					variant: "solid",
				},
			},
		} as any;

		const definition = {
			defaults: {
				size: "md",
				variant: "solid",
			},
		} as any;

		const tweak = {
			variant: {
				size: "lg",
				disabled: true,
			},
		} as any;

		const result = withVariants(tweak, {
			contract,
			definition,
		});

		expect(result).toEqual({
			size: "lg",
			variant: "solid",
			disabled: true,
		});
	});
});
