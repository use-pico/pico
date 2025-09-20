import { describe, expect, it } from "vitest";
import { merge } from "../../../src";

describe("3.3 Slot Configuration Order - Merge Appending Behavior", () => {
	it("should demonstrate the new merge behavior (appending)", () => {
		const userConfig = {
			slot: {
				root: {
					class: [
						"user-class",
					],
				},
			},
		};

		const internalConfig = {
			slot: {
				root: {
					class: [
						"internal-class",
					],
				},
			},
		};

		const config = merge(userConfig, internalConfig);

		// New behavior: both classes are combined
		expect(config.slot?.root).toEqual({
			class: [
				"internal-class",
				"user-class",
			],
		});

		// This is the correct behavior - we have both classes combined
	});
});
