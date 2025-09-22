import { describe, expect, it } from "vitest";
import { withVariants } from "../../../src/utils/withVariants";

describe("utils/withVariants/with-variants-basic", () => {
	it("returns default variants when no tweak provided", () => {
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

		const result = withVariants(undefined, {
			contract,
			definition,
		});

		expect(result).toEqual({
			size: "md",
			variant: "solid",
		});
	});
});
