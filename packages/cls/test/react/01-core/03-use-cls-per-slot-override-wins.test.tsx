import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { contract } from "../../../src";
import { useCls } from "../../../src/react";

describe("react/01-core/use-cls-per-slot-override-wins", () => {
	it("per-slot override from user wins over accumulated classes", () => {
		const $cls = contract()
			.slots([
				"root",
				"icon",
			])
			.def()
			.root({
				root: {
					class: [
						"base",
					],
				},
				icon: {
					class: [
						"i-base",
					],
				},
			})
			.cls();

		const { result } = renderHook(() =>
			useCls($cls, [
				{
					override: {
						icon: {
							class: [
								"I-OVR",
							],
						},
					},
				},
			]),
		);
		expect(result.current.slots.root()).toBe("base");
		expect(result.current.slots.icon()).toBe("I-OVR");
	});
});
