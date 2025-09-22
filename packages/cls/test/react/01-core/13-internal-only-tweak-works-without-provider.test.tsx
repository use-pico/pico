import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { contract, useCls } from "../../../src";

describe("react/01-core/internal-only-tweak-works-without-provider", () => {
	it("applies only internal tweak when provider and user are absent", () => {
		const $cls = contract()
			.slots([
				"root",
			])
			.def()
			.root({
				root: {
					class: [
						"base",
					],
				},
			})
			.cls();

		const { result } = renderHook(() =>
			useCls($cls, [
				undefined,
				{
					slot: {
						root: {
							class: [
								"I",
							],
						},
					},
				},
			]),
		);
		expect(result.current.slots.root()).toBe("base I");
	});
});
