import { describe, expect, it } from "vitest";
import { cleanup } from "../../../src/utils/cleanup";

describe("utils/cleanup/cleanup-empty-arrays", () => {
	it("cleans up tweak with empty arrays", () => {
		const tweak = {
			token: {},
			slot: {},
			variant: {},
		};

		const result = cleanup(tweak);

		expect(result).toEqual({
			token: {},
			slot: {},
			variant: {},
		});
	});
});
