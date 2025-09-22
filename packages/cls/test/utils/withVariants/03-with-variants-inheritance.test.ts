import { describe, expect, it } from "vitest";
import { withVariants } from "../../../src/utils/withVariants";

describe("utils/withVariants/with-variants-inheritance", () => {
	it("merges variants from inheritance chain", () => {
		const baseContract = {
			"~use": undefined,
			"~definition": {
				defaults: {
					size: "sm",
					tone: "light",
				},
			},
		} as any;

		const childContract = {
			"~use": baseContract,
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

		const result = withVariants(undefined, {
			contract: childContract,
			definition,
		});

		expect(result).toEqual({
			size: "md",
			tone: "light",
			variant: "solid",
		});
	});
});
